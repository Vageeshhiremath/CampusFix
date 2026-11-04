import { cookies } from 'next/headers';
import pool from '@/lib/db';

export type AppRole = 'STUDENT' | 'ADMIN' | 'WORKER';

export type AuthenticatedUser = {
  user_id: number;
  full_name: string;
  email: string;
  role: AppRole;
};

export function normalizeRole(role: string): AppRole | null {
  const normalizedRole = role.trim().toUpperCase();
  if (normalizedRole === 'STUDENT' || normalizedRole === 'ADMIN') return normalizedRole;
  if (normalizedRole === 'WORKER' || normalizedRole === 'TECHNICIAN') return 'WORKER';
  return null;
}

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');

  if (!userCookie) return null;

  try {
    const cookieUser = JSON.parse(userCookie.value) as { user_id?: number | string };
    const userId = Number(cookieUser.user_id);
    if (!Number.isInteger(userId) || userId < 1) return null;

    const result = await pool.query(
      'SELECT user_id, full_name, email, role FROM users WHERE user_id = $1',
      [userId],
    );
    const user = result.rows[0] as {
      user_id: number;
      full_name: string;
      email: string;
      role: string;
    } | undefined;
    const role = user ? normalizeRole(user.role) : null;

    return user && role ? { ...user, role } : null;
  } catch (error) {
    console.error('Failed to validate authenticated user:', error);
    return null;
  }
}
