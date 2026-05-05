import React from 'react';

export default function Profile() {
  const name = localStorage.getItem('auth_name') || '';
  const email = localStorage.getItem('auth_email') || '';
  const avatar = localStorage.getItem('auth_avatar') || '';

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {avatar ? (
            <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl font-semibold">{(name || email || 'U').charAt(0).toUpperCase()}</div>
          )}

          <div>
            <div className="text-xl font-semibold text-slate-900 dark:text-white">{name || 'No name provided'}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">{email || 'No email'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
