import { useState } from 'react';
import { apiPostJson } from '../api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await apiPostJson<{ message?: string; reset_token?: string }>("/auth/forgot-password", { email });
      setMessage(res?.message || 'If the email exists, a reset link was sent (dev shows token)');
      if (res?.reset_token) {
        setMessage((prev) => (prev ? prev + `\nReset token: ${res.reset_token}` : `Reset token: ${res.reset_token}`));
      }
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-8 shadow">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Reset password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" placeholder="you@example.com" />
          </div>

          {message && <div className="whitespace-pre-line text-sm text-slate-700">{message}</div>}

          <div className="flex items-center justify-between">
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700 disabled:opacity-60">
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
