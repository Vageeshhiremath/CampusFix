'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Logging in...');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      router.push('/');
      router.refresh();
    } else {
      const err = await res.json();
      setMessage('Error: ' + err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">CampusFix Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="alice@campus.edu"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}

        <div className="mt-6 text-sm text-gray-500 border-t pt-4">
          <p className="font-semibold mb-1">Available users (for demo):</p>
          <p>Student: <code>alice@campus.edu</code></p>
          <p>Technician: <code>bob@campus.edu</code></p>
          <p>Admin: <code>admin@campus.edu</code></p>
        </div>
      </div>
    </div>
  );
}