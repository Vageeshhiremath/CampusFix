import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // We use the VIEW we created in the database!
    const result = await pool.query(`
      SELECT 
        issue_id, 
        title, 
        status, 
        severity, 
        priority_score, 
        room_number, 
        building_name, 
        reported_by_name 
      FROM vw_unresolved_issues 
      ORDER BY priority_score DESC
    `);
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, severity, room_id, category_id, reported_by, affected_users, location_criticality, recurrence_factor } = body;

    // Call our STORED FUNCTION to calculate the priority!
    const priorityResult = await pool.query(
      'SELECT calculate_priority_score($1, $2, $3, $4) as score',
      [severity, affected_users || 1, location_criticality || 1, recurrence_factor || 1]
    );
    const priorityScore = priorityResult.rows[0].score;

    // Insert the new issue
    const result = await pool.query(
      `INSERT INTO issues 
        (title, description, severity, priority_score, room_id, category_id, reported_by, affected_users, location_criticality, recurrence_factor) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [title, description, severity, priorityScore, room_id, category_id, reported_by, affected_users || 1, location_criticality || 1, recurrence_factor || 1]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error('Insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}