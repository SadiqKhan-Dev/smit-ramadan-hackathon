import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { ErrorAlert } from '../components/ui/components';

const DEMO_ACCOUNTS = [
  { role: 'admin',        email: 'admin@clinic.com',        password: 'demo1234', name: 'Admin User',    specialty: null,               label: 'Admin',        color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
  { role: 'doctor',       email: 'doctor@clinic.com',       password: 'demo1234', name: 'Dr. Ahmed Khan',specialty: 'General Physician', label: 'Doctor',       color: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' },
  { role: 'receptionist', email: 'receptionist@clinic.com', password: 'demo1234', name: 'Sara Ali',      specialty: null,               label: 'Receptionist', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' },
  { role: 'patient',      email: 'patient@clinic.com',      password: 'demo1234', name: 'Ali Hassan',    specialty: null,               label: 'Patient',      color: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100' },
];

const ROLE_ROUTES = {
  admin: '/admin/dashboard',
  doctor: '/doctor/dashboard',
  receptionist: '/receptionist/dashboard',
  patient: '/patient/dashboard',
};

export function LoginPage() {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [loading, setLoading]           = useState(false);
  const [demoLoading, setDemoLoading]   = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError]     = useState('');

  const { login, signup, setError } = useAuth();
  const navigate = useNavigate();

  /* ── Normal Login ──────────────────────────────────── */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setLocalError('');
    setError(null);

    const result = await login(email, password);
    if (result.success) {
      navigate(ROLE_ROUTES[result.role] || '/dashboard');
    } else {
      setLocalError(result.error || 'Login failed');
    }
    setLoading(false);
  }

  /* ── Demo Login (auto-create agar account na ho) ───── */
  async function handleDemoLogin(account) {
    setDemoLoading(account.role);
    setLocalError('');
    setError(null);

    // Pehle login try karo
    const result = await login(account.email, account.password);

    if (result.success) {
      setDemoLoading('');
      navigate(ROLE_ROUTES[result.role] || '/dashboard');
      return;
    }

    // Account exist nahi karta - create karo via AuthContext signup
    // (signup() sets pendingRoleRef before createUser, preventing race condition)
    const notFound = result.error?.toLowerCase().includes('invalid') ||
                     result.error?.toLowerCase().includes('not found') ||
                     result.error?.toLowerCase().includes('credential');

    if (notFound) {
      const signupResult = await signup({
        email: account.email,
        password: account.password,
        name: account.name,
        role: account.role,
        specialty: account.specialty || null,
        phone: null,
      });

      if (signupResult.success) {
        setDemoLoading('');
        navigate(ROLE_ROUTES[account.role]);
        return;
      }

      // Already in use means account exists - retry login
      if (signupResult.error?.toLowerCase().includes('already')) {
        const retry = await login(account.email, account.password);
        if (retry.success) {
          setDemoLoading('');
          navigate(ROLE_ROUTES[retry.role] || '/dashboard');
          return;
        }
      }

      setLocalError(signupResult.error || 'Demo account create nahi ho saka');
    } else {
      setLocalError(result.error || 'Login failed');
    }

    setDemoLoading('');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">

      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">ClinicPro</span>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Welcome Back to<br />Your Health Portal
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Access your medical records, book appointments, and connect with
            your healthcare providers – all in one secure place.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-8 text-blue-100">
          <div><p className="text-3xl font-bold text-white">50+</p><p className="text-sm">Expert Doctors</p></div>
          <div className="w-px h-12 bg-white/20" />
          <div><p className="text-3xl font-bold text-white">10K+</p><p className="text-sm">Happy Patients</p></div>
          <div className="w-px h-12 bg-white/20" />
          <div><p className="text-3xl font-bold text-white">24/7</p><p className="text-sm">Support</p></div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ClinicPro</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          {localError && (
            <ErrorAlert type="error" message={localError} onDismiss={() => setLocalError('')} className="mb-6" />
          )}

          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    placeholder="Enter your password"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    rightElement={
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    }
                    required
                  />
                </div>

                <Button type="submit" size="lg" fullWidth loading={loading} className="group">
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">Sign up</Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Quick Login */}
          <div className="mt-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gradient-to-br from-blue-50 via-white to-purple-50 px-3 text-gray-500 font-medium">
                  Demo Login — Ek Click Mein
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((d) => (
                <button
                  key={d.role}
                  type="button"
                  disabled={!!demoLoading}
                  onClick={() => handleDemoLogin(d)}
                  className={`border rounded-xl px-3 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${d.color} disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {demoLoading === d.role
                    ? <Loader className="w-4 h-4 animate-spin" />
                    : null
                  }
                  {d.label}
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              Pehli baar click karne pe account automatically ban jayega
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
