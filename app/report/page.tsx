'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReportIssue() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    severity: 'MEDIUM',
    room_id: 1,
    category_id: 1,
    affected_users: 1,
    location_criticality: 3,
    recurrence_factor: 1,
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Submitting...');

    const res = await fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, reported_by: 1 }),
    });

    if (res.ok) {
      setMessage('Issue reported successfully! Redirecting...');
      setTimeout(() => router.push('/'), 1500);
    } else {
      const err = await res.json();
      setMessage('Error: ' + err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Report a New Issue</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded p-2"
              placeholder="e.g., Broken chair in Lab 2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded p-2"
              rows={3}
              placeholder="Describe the issue..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Severity</label>
              <select
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: e.target.value })}
                className="w-full border rounded p-2"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Affected Users</label>
              <input
                type="number"
                min={1}
                value={form.affected_users}
                onChange={(e) => setForm({ ...form, affected_users: parseInt(e.target.value) })}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Location Criticality (1-5)</label>
              <input
                type="number"
                min={1}
                max={5}
                value={form.location_criticality}
                onChange={(e) => setForm({ ...form, location_criticality: parseInt(e.target.value) })}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Recurrence (1-3)</label>
              <input
                type="number"
                min={1}
                max={3}
                value={form.recurrence_factor}
                onChange={(e) => setForm({ ...form, recurrence_factor: parseInt(e.target.value) })}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Issue
          </button>
        </form>

        {message && <p className="mt-4 text-center font-semibold">{message}</p>}
      </div>
    </div>
  );
}