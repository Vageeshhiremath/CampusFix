import { redirect } from 'next/navigation';
import CampusFixDashboard from '@/components/campus';
import { getCurrentUser } from '@/lib/auth';

export default async function WorkerDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (user.role !== 'WORKER') redirect(`/${user.role.toLowerCase()}/dashboard`);
  return <CampusFixDashboard role={user.role} userId={user.user_id} userName={user.full_name} userEmail={user.email} />;
}
