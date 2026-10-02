import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Simple "login": find user by email (no password check for demo)
    const result = await pool.query(
      'SELECT user_id, full_name, email, role FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const user = result.rows[0];

    // Store the user in an HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('user', JSON.stringify(user), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}