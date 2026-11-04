import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import redisClient from '@/lib/redis';
import { getCurrentUser } from '@/lib/auth';

const CACHE_KEY = 'dashboard_issues';

export async function GET() {
  let cachedData: string | null = null;

  try {
    if (redisClient.isReady) {
      cachedData = await redisClient.get(CACHE_KEY);
    }
  } catch (error) {
    console.error('Redis cache read failed; using PostgreSQL:', error);
  }

  if (cachedData) {
    try {
      const cachedIssues: unknown = JSON.parse(cachedData);

      if (Array.isArray(cachedIssues)) {
        return NextResponse.json(cachedIssues);
      }

      console.error('Redis cache contained a non-array value; using PostgreSQL');
    } catch (error) {
      console.error('Redis cache contained invalid JSON; using PostgreSQL:', error);
    }
  }

  try {
    const result = await pool.query(`
      SELECT 
        issue_id, title, status, severity, priority_score,
        room_number, building_name, reported_by_name 
      FROM vw_unresolved_issues 
      ORDER BY priority_score DESC
    `);

    try {
      if (redisClient.isReady) {
        await redisClient.setEx(CACHE_KEY, 60, JSON.stringify(result.rows));
      }
    } catch (error) {
      console.error('Redis cache write failed:', error);
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }
    if (user.role === 'WORKER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, severity, room_number, floor_number, category_id, reported_by, affected_users, location_criticality, recurrence_factor } = body;
    const normalizedRoomNumber = typeof room_number === 'string' ? room_number.trim() : '';
    const normalizedFloor = Number(floor_number);
    if (!normalizedRoomNumber || !Number.isInteger(normalizedFloor) || normalizedFloor < 0) {
      return NextResponse.json({ error: 'A valid room number and floor number are required.' }, { status: 400 });
    }
    const roomResult = await pool.query(
      'SELECT room_id FROM rooms WHERE room_number = $1 AND floor_number = $2 LIMIT 1',
      [normalizedRoomNumber, normalizedFloor],
    );
    if (roomResult.rows.length === 0) {
      return NextResponse.json({ error: `Room ${normalizedRoomNumber} on floor ${normalizedFloor} is not registered. Add it to the rooms table first.` }, { status: 400 });
    }
    const roomId = roomResult.rows[0].room_id;

    const priorityResult = await pool.query(
      'SELECT calculate_priority_score($1, $2, $3, $4) as score',
      [severity, affected_users || 1, location_criticality || 1, recurrence_factor || 1]
    );
    const priorityScore = priorityResult.rows[0].score;

    const result = await pool.query(
      `INSERT INTO issues 
        (title, description, severity, priority_score, room_id, category_id, reported_by, affected_users, location_criticality, recurrence_factor) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [title, description, severity, priorityScore, roomId, category_id, reported_by, affected_users || 1, location_criticality || 1, recurrence_factor || 1]
    );
    
    try {
      if (redisClient.isReady) {
        await redisClient.del(CACHE_KEY);
      }
    } catch (error) {
      console.error('Redis cache invalidation failed:', error);
    }

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Insert error:', error);
    const message = error instanceof Error ? error.message : 'Unable to create issue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}