'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReportIssue() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    severity: 'MEDIUM',
    room_number: '606',
    floor_number: 6,
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
    <div className="min-h-screen bg-[var(--cf-beige)] p-8 text-[var(--cf-dark)]">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--cf-beige)] bg-white p-6 text-[var(--cf-dark)] shadow-xl">
        <h1 className="text-2xl font-bold mb-6">Report a New Issue</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-semibold text-[var(--cf-dark)]">Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-xl border border-[var(--cf-beige)] bg-white p-2 text-[var(--cf-dark)] placeholder:text-[var(--cf-slate)] focus:border-[var(--cf-slate)] focus:outline-none focus:ring-2 focus:ring-[var(--cf-slate)]/20"
              placeholder="e.g., Broken chair in Lab 2"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-[var(--cf-dark)]">Description</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-[var(--cf-beige)] bg-white p-2 text-[var(--cf-dark)] placeholder:text-[var(--cf-slate)] focus:border-[var(--cf-slate)] focus:outline-none focus:ring-2 focus:ring-[var(--cf-slate)]/20"
              rows={3}
              placeholder="Describe the issue..."
            />
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-semibold text-[var(--cf-dark)]">Severity</label>
              <select
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: e.target.value })}
                className="w-full rounded-xl border border-[var(--cf-beige)] bg-white p-2 text-[var(--cf-dark)] focus:border-[var(--cf-slate)] focus:outline-none focus:ring-2 focus:ring-[var(--cf-slate)]/20"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-semibold text-[var(--cf-dark)]">Room number</label>
              <input required value={form.room_number} onChange={(e) => setForm({ ...form, room_number: e.target.value })} className="w-full rounded-xl border border-[var(--cf-beige)] bg-white p-2 text-[var(--cf-dark)]" />
            </div>
            <div>
              <label className="mb-1 block font-semibold text-[var(--cf-dark)]">Floor number</label>
              <input type="number" min={0} required value={form.floor_number} onChange={(e) => setForm({ ...form, floor_number: Number(e.target.value) })} className="w-full rounded-xl border border-[var(--cf-beige)] bg-white p-2 text-[var(--cf-dark)]" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--cf-dark)] py-2 font-semibold text-white transition hover:bg-[var(--cf-slate)] focus:outline-none focus:ring-4 focus:ring-[var(--cf-slate)]/20"
          >
            Submit Issue
          </button>
        </form>

        {message && <p className="mt-4 text-center font-semibold">{message}</p>}
      </div>
    </div>
  );
}