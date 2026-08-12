import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { Lock, Mail, KeyRound, Sparkles, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, loginWithMock } = useAdminAuth();

  useEffect(() => {
    // Robots meta tag safety for admin security
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      if (!isSupabaseConfigured()) {
        // Fallback login when Supabase credentials are not added yet
        loginWithMock(email);
        setLoading(false);
        navigate('/admin', { replace: true });
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setErrorMessage(error.message || 'Invalid administrator login credentials.');
      } else {
        navigate('/admin', { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans flex flex-col justify-between p-4 sm:p-6 relative selection:bg-sky-500/30 selection:text-sky-300">
      
      {/* Background Radial Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" />
          <span>Return to Site</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Administrator Access</span>
        </div>
      </div>

      {/* Main Login Card Container */}
      <div className="max-w-md w-full mx-auto my-auto z-10">
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 shadow-2xl bg-slate-900/60 backdrop-blur-xl space-y-6 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500" />

          {/* Form Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Chetan Web Studio Admin
            </h1>
            <p className="text-xs text-slate-400">
              Sign in with your administrator credentials to access the dashboard.
            </p>
          </div>

          {!isSupabaseConfigured() && (
            <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Development Demo Mode</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Supabase credentials not set in <code className="text-sky-300">.env</code>. You can enter any email & password to log in and preview the dashboard.
              </p>
            </div>
          )}

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@chetanwebstudio.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 border border-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 border border-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full text-center z-10 py-4">
        <p className="text-[11px] text-slate-500">
          © {new Date().getFullYear()} Chetan Web Studio • Protected Administrator Area
        </p>
      </div>

    </div>
  );
};
