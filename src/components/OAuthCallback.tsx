import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // read token and email from fragment or query
    const hash = window.location.hash || '';
    const qs = window.location.search || '';
    const params = new URLSearchParams(hash.replace('#', '?'));
    for (const [k, v] of new URLSearchParams(qs)) params.set(k, v);

    const token = params.get('token');
    const email = params.get('email');
    if (token) {
      localStorage.setItem('auth_token', token);
      if (email) localStorage.setItem('auth_email', decodeURIComponent(email));
      // navigate to dashboard
      navigate('/dashboard');
    } else {
      // no token, go to login
      navigate('/login');
    }
  }, [navigate]);

  return <div className="min-h-[60vh] flex items-center justify-center">Processing sign-in...</div>;
}
