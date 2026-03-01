import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader, Heart, Copy, Check } from 'lucide-react';

const DEMO_ACCOUNTS = [
  {
    email: 'admin@clinic.com',
    password: 'demo1234',
    name: 'Admin User',
    role: 'admin',
    specialty: null,
    phone: '+92 300 0000001',
    color: 'blue',
    emoji: '🛡️',
  },
  {
    email: 'doctor@clinic.com',
    password: 'demo1234',
    name: 'Dr. Ahmed Khan',
    role: 'doctor',
    specialty: 'General Physician',
    phone: '+92 300 0000002',
    color: 'green',
    emoji: '🩺',
  },
  {
    email: 'receptionist@clinic.com',
    password: 'demo1234',
    name: 'Sara Ali',
    role: 'receptionist',
    specialty: null,
    phone: '+92 300 0000003',
    color: 'purple',
    emoji: '📋',
  },
  {
    email: 'patient@clinic.com',
    password: 'demo1234',
    name: 'Ali Hassan',
    role: 'patient',
    specialty: null,
    phone: '+92 300 0000004',
    color: 'orange',
    emoji: '🏥',
  },
];

const colorMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700',dot: 'bg-purple-500' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700',dot: 'bg-orange-500' },
};

export function DemoSetup() {
  const [status, setStatus] = useState({}); // { email: 'done' | 'exists' | 'error' | 'loading' }
  const [creating, setCreating] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState('');
  const navigate = useNavigate();

  async function createAccount(account) {
    setStatus(s => ({ ...s, [account.email]: 'loading' }));
    try {
      // Check if already exists in Firestore
      const existing = await getDoc(doc(db, 'demoAccounts', account.role));
      if (existing.exists()) {
        setStatus(s => ({ ...s, [account.email]: 'exists' }));
        return;
      }

      const { user } = await createUserWithEmailAndPassword(auth, account.email, account.password);
      await updateProfile(user, { displayName: account.name });
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: account.name,
        email: account.email,
        role: account.role,
        specialty: account.specialty,
        phone: account.phone,
        status: 'active',
        createdAt: new Date().toISOString(),
      });
      // Mark as created so we don't duplicate
      await setDoc(doc(db, 'demoAccounts', account.role), { email: account.email, uid: user.uid });

      // Save to localStorage cache
      localStorage.setItem(`cp_role_${user.uid}`, account.role);

      await signOut(auth); // logout after creating each account
      setStatus(s => ({ ...s, [account.email]: 'done' }));
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setStatus(s => ({ ...s, [account.email]: 'exists' }));
      } else {
        console.error(err);
        setStatus(s => ({ ...s, [account.email]: 'error' }));
      }
    }
  }

  async function handleCreateAll() {
    setCreating(true);
    for (const account of DEMO_ACCOUNTS) {
      await createAccount(account);
    }
    setCreating(false);
    setDone(true);
  }

  function copyText(text, key) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 1500);
  }

  const StatusIcon = ({ email }) => {
    const s = status[email];
    if (s === 'loading') return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
    if (s === 'done')    return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (s === 'exists')  return <CheckCircle className="w-5 h-5 text-yellow-500" />;
    if (s === 'error')   return <span className="text-red-500 text-xs font-medium">Error</span>;
    return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ClinicPro</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Demo Accounts Setup</h1>
          <p className="text-gray-500">Ek click mein sab 4 role ke demo accounts ban jayenge</p>
        </div>

        {/* Password Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-center">
          <p className="text-amber-800 font-medium text-sm">
            Sabka password hai: <span className="font-bold text-amber-900 text-base font-mono">demo1234</span>
          </p>
        </div>

        {/* Accounts List */}
        <div className="space-y-3 mb-8">
          {DEMO_ACCOUNTS.map((account) => {
            const c = colorMap[account.color];
            return (
              <div key={account.email} className={`${c.bg} border ${c.border} rounded-xl p-4`}>
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{account.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{account.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>
                        {account.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 font-mono">{account.email}</span>
                      <button
                        onClick={() => copyText(account.email, account.email)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy email"
                      >
                        {copied === account.email
                          ? <Check className="w-3.5 h-3.5 text-green-500" />
                          : <Copy className="w-3.5 h-3.5" />
                        }
                      </button>
                    </div>
                    {account.specialty && (
                      <p className="text-xs text-gray-500 mt-0.5">Specialty: {account.specialty}</p>
                    )}
                  </div>
                  <StatusIcon email={account.email} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Button */}
        {!done ? (
          <button
            onClick={handleCreateAll}
            disabled={creating}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {creating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Accounts ban rahe hain...</span>
              </>
            ) : (
              <>
                <span>Sab Accounts Banao</span>
              </>
            )}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-semibold">Sab accounts ready hain!</p>
              <p className="text-green-600 text-sm mt-1">Ab neeche se koi bhi account choose karke login karo</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all"
            >
              Login Page Par Jao →
            </button>
          </div>
        )}

        {/* Quick Login Table */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 text-sm">Quick Login Credentials</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Role</th>
                <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Email</th>
                <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Password</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DEMO_ACCOUNTS.map((a) => (
                <tr key={a.role} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900 capitalize">{a.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-mono text-xs">{a.email}</span>
                      <button onClick={() => copyText(a.email, `table-${a.role}`)} className="text-gray-400 hover:text-blue-500">
                        {copied === `table-${a.role}` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-mono text-xs">demo1234</span>
                      <button onClick={() => copyText('demo1234', `pass-${a.role}`)} className="text-gray-400 hover:text-blue-500">
                        {copied === `pass-${a.role}` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default DemoSetup;
