import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, House, Radar, Layers, BarChart3, History, Search } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { label: 'Home', path: '/', icon: House },
    { label: 'Scanner', path: '/scanner', icon: Radar },
    { label: 'Prediction', path: '/prediction', icon: Search },
    { label: 'Batch Audit', path: '/batch', icon: Layers },
    { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { label: 'History', path: '/history', icon: History },
  ];

  useEffect(() => {
    setUserEmail(localStorage.getItem('auth_email'));
    setUserName(localStorage.getItem('auth_name'));
    setUserAvatar(localStorage.getItem('auth_avatar'));

    const onStorage = () => {
      setUserEmail(localStorage.getItem('auth_email'));
      setUserName(localStorage.getItem('auth_name'));
      setUserAvatar(localStorage.getItem('auth_avatar'));
    };
    window.addEventListener('storage', onStorage);

    const onClickOutside = (e: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(e.target as Node)) {
        setShowDetails(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  function handleLogout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_email');
    setUserEmail(null);
    navigate('/login');
  }

  return (
    <nav className=" fixed sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/80 shadow-sm dark:bg-slate-900/80 dark:border-slate-700/60">
      <div className="max-w-350 mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-linear-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 group-hover:border-emerald-400/60 transition-colors">
              <Shield className="text-emerald-600 dark:text-emerald-300" size={20} />
            </div>
            <span className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
              SCALA-Guard
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'text-emerald-700 bg-emerald-50 ring-1 ring-emerald-300/70 dark:text-emerald-300 dark:bg-emerald-500/10 dark:ring-emerald-500/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                }`}
              >
                <item.icon size={14} />
                {item.label}
              </Link>
            ))}

            {userEmail ? (
              <div className="ml-4 flex items-center gap-3 relative" ref={detailsRef}>
                <button onClick={() => setShowDetails(!showDetails)} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  {userAvatar ? (
                    <img src={userAvatar} alt="avatar" className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-medium">{(userName || userEmail).charAt(0).toUpperCase()}</div>
                  )}
                  <span className="hidden sm:inline">{(userName || userEmail)?.split?.('@')[0]}</span>
                </button>

                {showDetails && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg p-3 z-50">
                    <div className="flex items-center gap-3">
                      {userAvatar ? (
                        <img src={userAvatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-medium">{(userName || userEmail).charAt(0).toUpperCase()}</div>
                      )}
                      <div>
                        <div className="text-sm text-slate-900 dark:text-white font-medium truncate">{userName || userEmail}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{userEmail}</div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col gap-2">
                      <Link to="/dashboard" onClick={() => setShowDetails(false)} className="text-sm px-2 py-1 rounded-md border">Dashboard</Link>
                      <Link to="/history" onClick={() => setShowDetails(false)} className="text-sm px-2 py-1 rounded-md border">History</Link>
                      <Link to="/profile" onClick={() => setShowDetails(false)} className="text-sm px-2 py-1 rounded-md border">Profile</Link>
                      <button onClick={() => { setShowDetails(false); handleLogout(); }} className="px-2 py-1 rounded-md bg-red-500 text-white text-sm">Logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/register" className="ml-3 px-3 py-2 rounded-md text-sm font-medium border">Register</Link>
                <Link to="/login" className="ml-3 px-3 py-2 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700">Sign in</Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 mt-3' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-2 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'text-emerald-700 bg-emerald-50 ring-1 ring-emerald-300/70 dark:text-emerald-300 dark:bg-emerald-500/10 dark:ring-emerald-500/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </Link>
            ))}

            {userEmail ? (
              <div className="px-4 py-3 rounded-lg text-sm font-medium bg-red-500 text-white flex items-center justify-between">
                <span className="truncate">{userEmail.split('@')[0]}</span>
                <button onClick={() => { setIsOpen(false); handleLogout(); }} className="ml-3 px-3 py-1 rounded-md bg-red-700 text-white">Logout</button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium bg-emerald-600 text-white">Sign in</Link>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}
