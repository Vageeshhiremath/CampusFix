import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, changed_by } = body;

    // This UPDATE will automatically fire the TRIGGER we created in the database!
    const result = await pool.query(
      'UPDATE issues SET status = $1 WHERE issue_id = $2 RETURNING *',
      [status, id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}