import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import redisClient from '@/lib/redis';
import { getCurrentUser } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    if (user.role === 'STUDENT') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const result = await pool.query(
      'UPDATE issues SET status = $1 WHERE issue_id = $2 RETURNING *',
      [status, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    try {
      if (redisClient.isReady) {
        await redisClient.del('dashboard_issues');
        console.log('Redis cache cleared after status update');
      }
    } catch (error) {
      console.error('Redis cache clear failed:', error);
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Update error:', error);
    const message = error instanceof Error ? error.message : 'Unable to update issue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
