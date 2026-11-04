import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';
import { normalizeRole } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body: { email?: unknown } = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Simple "login": find user by email (no password check for demo)
    const result = await pool.query(
      'SELECT user_id, full_name, email, role FROM users WHERE LOWER(TRIM(email)) = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found in the configured database. Run docs/mock_data.sql, then restart the app.' },
        { status: 401 },
      );
    }

    const user = result.rows[0] as {
      user_id: number;
      full_name: string;
      email: string;
      role: string;
    };
    const role = normalizeRole(user.role);

    if (!role) {
      return NextResponse.json({ error: 'User has an unsupported role' }, { status: 403 });
    }
    const authenticatedUser = { ...user, role };

    // Store the user in an HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('user', JSON.stringify(authenticatedUser), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ user: authenticatedUser });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}