'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/me')
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  useEffect(() => {
    fetch('/api/issues')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setIssues(data);
        } else {
          setError(data.error || 'Failed to load issues');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">CampusFix Dashboard</h1>
        <p className="text-gray-600 mb-6">Intelligent Campus Maintenance & Resource Prioritization</p>
        <Link href="/report" className="inline-block bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700">
          + Report New Issue 
        </Link>
        {user && (
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-gray-700">
              Logged in as <strong>{user.full_name}</strong> ({user.role})
            </span>
            <button
              onClick={async () => {
                await fetch('/api/logout', { method: 'POST' });
                window.location.href = '/login';
              }}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
        {loading && <p className="text-gray-500">Loading issues from database...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && issues.length === 0 && (
          <p className="text-gray-500">No unresolved issues found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {issues.map((issue) => (
            <div key={issue.issue_id} className="bg-white border rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-bold text-gray-800 text-lg">{issue.title}</h2>
                <span className={`text-xs px-2 py-1 rounded ${
                  issue.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                  issue.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                  issue.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {issue.severity}
                </span>
              </div>
              <p className="text-sm text-gray-600">Status: <strong>{issue.status}</strong></p>
              <p className="text-sm text-gray-600">Location: {issue.building_name} - Room {issue.room_number}</p>
              <p className="text-sm text-gray-600">Reported by: {issue.reported_by_name}</p>
              <p className="text-sm text-gray-800 font-semibold mt-2">Priority Score: {issue.priority_score}</p>
              <select
                value={issue.status}
                onChange={async (e) => {
                  const newStatus = e.target.value;
                  await fetch(`/api/issues/${issue.issue_id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus, changed_by: 1 }),
                  });
                  // Refresh the page data
                  window.location.reload();
                }}
                className="mt-3 w-full border rounded p-1 text-sm"
              >
                <option value="REPORTED">REPORTED</option>
                <option value="ASSESSED">ASSESSED</option>
                <option value="ASSIGNED">ASSIGNED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="ON_HOLD">ON_HOLD</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}