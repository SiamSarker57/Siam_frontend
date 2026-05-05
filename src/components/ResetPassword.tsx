import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPostJson } from '../api';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await apiPostJson<{ message?: string }>("/auth/reset-password", { token, new_password: newPassword });
      setMessage(res?.message || 'Password reset');
      navigate('/login');
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-8 shadow">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Set new password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Reset Token</label>
            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" placeholder="token from email (dev)" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" placeholder="New password" />
          </div>
          {message && <div className="text-sm text-slate-700">{message}</div>}
          <div className="flex items-center justify-between">
            <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700">Reset password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
