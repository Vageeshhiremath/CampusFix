'use client';

import { useState, type FormEvent } from 'react';
import { Mail, Building2, CheckCircle2, Wrench } from 'lucide-react';

const demoAccounts = [
  { role: 'Student', email: 'alice@campus.edu', accent: '#516067' },
  { role: 'Technician', email: 'bob@campus.edu', accent: '#C38D4F' },
  { role: 'Admin', email: 'admin@campus.edu', accent: '#A74443' },
];

const features = [
  'Faster issue reporting',
  'Clear maintenance ownership',
  'Real-time campus visibility',
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage('Logging in...');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data: { user?: { role?: string }; error?: string } = await response.json();
      if (!response.ok || !data.user?.role) {
        setMessage(`Error: ${data.error ?? 'Login failed'}`);
        return;
      }

      const destination = data.user.role === 'ADMIN'
        ? '/admin/dashboard'
        : data.user.role === 'WORKER'
          ? '/worker/dashboard'
          : '/student/dashboard';
      window.location.replace(destination);
    } catch (error) {
      console.error('Login request failed:', error);
      setMessage('Error: Unable to connect to the login service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--cf-beige)] text-[var(--cf-dark)]">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[var(--cf-slate)]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-[var(--cf-gold)]/25 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 rounded-full bg-[var(--cf-red)]/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 py-8 sm:px-8 lg:px-12">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <section className="flex flex-col justify-center py-4 sm:py-8 lg:py-12">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--cf-dark)] text-[var(--cf-beige)] shadow-lg shadow-[var(--cf-dark)]/20">
                <Wrench className="size-6" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight">CampusFix</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--cf-slate)]">Operations OS</p>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[var(--cf-red)]">Campus operations, simplified</p>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.05em] sm:text-6xl">
                Keep your campus moving.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-[var(--cf-slate)] sm:text-lg">
                Report issues, coordinate maintenance, and keep every space ready for learning.
              </p>
            </div>

            <div className="mt-9 space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm font-semibold text-[var(--cf-dark)]">
                  <CheckCircle2 className="size-5 text-[var(--cf-slate)]" strokeWidth={2} />
                  {feature}
                </div>
              ))}
            </div>

            <div className="relative mt-12 hidden h-36 max-w-md overflow-hidden rounded-3xl border border-[var(--cf-beige)] bg-[var(--cf-slate)]/15 sm:block">
              <div className="absolute bottom-0 left-0 h-20 w-40 rounded-tr-[4rem] bg-[var(--cf-slate)]/30" />
              <div className="absolute bottom-0 left-32 h-28 w-28 rounded-t-full bg-[var(--cf-gold)]/50" />
              <div className="absolute bottom-0 left-56 h-24 w-36 rounded-t-[3rem] bg-[var(--cf-red)]/35" />
              <div className="absolute bottom-7 right-12 h-20 w-20 rounded-full border-[10px] border-[var(--cf-dark)]/25" />
              <Building2 className="absolute bottom-5 right-16 size-10 text-[var(--cf-dark)]/50" />
            </div>
          </section>

          <section className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-[2rem] border border-[var(--cf-beige)] bg-[#f8f9fc]/95 p-6 shadow-2xl shadow-[var(--cf-dark)]/15 sm:p-9">
              <div className="mb-8">
                <div className="mb-6 flex size-11 items-center justify-center rounded-xl bg-[var(--cf-dark)] text-[var(--cf-beige)]">
                  <Wrench className="size-5" />
                </div>
                <h2 className="text-3xl font-bold tracking-[-0.04em]">Welcome back</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--cf-slate)]">Sign in to access your campus workspace.</p>
              </div>

              {message && (
                <div className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${
                  message.startsWith('Error')
                    ? 'border-[var(--cf-red)]/25 bg-[var(--cf-red)]/10 text-[var(--cf-red)]'
                    : 'border-[var(--cf-slate)]/25 bg-[var(--cf-slate)]/10 text-[var(--cf-slate)]'
                }`} role="status">
                  {message}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold text-[var(--cf-dark)]">Email address</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-[var(--cf-slate)]" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-12 w-full rounded-xl border border-[var(--cf-beige)] bg-white pl-11 pr-4 text-sm text-[var(--cf-dark)] outline-none transition placeholder:text-[var(--cf-slate)]/60 focus:border-[var(--cf-slate)] focus:ring-4 focus:ring-[var(--cf-slate)]/15"
                      placeholder="alice@campus.edu"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-[var(--cf-dark)] text-sm font-bold text-[var(--cf-beige)] shadow-lg shadow-[var(--cf-dark)]/20 transition hover:bg-[var(--cf-slate)] focus:outline-none focus:ring-4 focus:ring-[var(--cf-slate)]/25 disabled:cursor-wait disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Sign in to workspace'}
                </button>
              </form>

              <button
                type="button"
                onClick={() => setShowDemoAccounts((open) => !open)}
                className="mt-7 flex w-full items-center justify-between border-t border-[var(--cf-beige)] pt-5 text-left text-xs font-bold uppercase tracking-[0.14em] text-[var(--cf-slate)] hover:text-[var(--cf-dark)]"
                aria-expanded={showDemoAccounts}
              >
                Demo accounts
                <span>{showDemoAccounts ? '−' : '+'}</span>
              </button>
              {showDemoAccounts && (
                <div className="mt-3 space-y-2">
                  {demoAccounts.map((account) => (
                    <button
                      key={account.email}
                      type="button"
                      onClick={() => setEmail(account.email)}
                      className="flex w-full items-center justify-between rounded-xl border border-[var(--cf-beige)] bg-white px-3 py-2.5 text-left transition hover:border-[var(--cf-slate)] hover:bg-[var(--cf-beige)]/30"
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-[var(--cf-dark)]">
                        <span className="size-2 rounded-full" style={{ backgroundColor: account.accent }} />
                        {account.role}
                      </span>
                      <span className="text-xs text-[var(--cf-slate)]">{account.email}</span>
                    </button>
                  ))}
                </div>
              )}

              <p className="mt-7 text-center text-xs text-[var(--cf-slate)]">
                Secure access for students, technicians, and administrators.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
