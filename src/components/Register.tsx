import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiPostJson } from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const res = await apiPostJson<{ token?: string; email?: string; message?: string }>("/auth/register", { name, email, password });
      if (res?.token) {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('auth_email', res?.email || email);
        navigate('/dashboard');
      } else {
        setError(res?.message || 'Registration failed');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-8 shadow">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Register now!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" placeholder="Email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" placeholder="Password" />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between">
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700 disabled:opacity-60">
              {loading ? 'Registering...' : 'Register'}
            </button>
            <Link to="/login" className="text-sm text-slate-600 hover:underline">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
