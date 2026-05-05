import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiPostJson, apiGetJson } from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      setLoading(true);
      const res = await apiPostJson<{ token?: string; message?: string; email?: string; name?: string; avatar?: string }>("/auth/login", { email, password });

      if (res?.token) {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('auth_email', res?.email || email);
        if (res?.name) localStorage.setItem('auth_name', res.name);
        else localStorage.removeItem('auth_name');
        if (res?.avatar) localStorage.setItem('auth_avatar', res.avatar);
        else localStorage.removeItem('auth_avatar');
        navigate('/dashboard');
      } else {
        setError(res?.message || 'Login failed');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    // Redirect to backend Google OAuth start endpoint
    try {
      // Use API base so this works in production or different host
      const base = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
      window.location.href = `${base}/auth/google`;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-8 shadow">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Sign in to SCALA-Guard</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <div className="flex gap-2 items-center">
              <Link to="/forgot" className="text-sm text-slate-600 hover:underline">Forgot?</Link>
              <Link to="/register" className="text-sm text-slate-600 hover:underline">Register</Link>
            </div>
          </div>
        </form>

        <div className="mt-4">
          <button onClick={handleGoogle} className="w-full px-4 py-2 rounded-md border">Sign in with Google</button>
        </div>
      </div>
    </div>
  );
}
