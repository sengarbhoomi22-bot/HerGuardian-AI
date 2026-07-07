import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../services/authService';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const strength = useMemo(() => {
    const value = form.password;
    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    if (score <= 1) return { label: 'Weak', color: 'bg-red-500' };
    if (score === 2 || score === 3) return { label: 'Fair', color: 'bg-yellow-500' };
    return { label: 'Strong', color: 'bg-green-500' };
  }, [form.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.password || !form.confirmPassword) {
      setError('Please fill in both password fields.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, { password: form.password, confirmPassword: form.confirmPassword });
      toast.success('Password reset successful. Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to reset password.');
      setError(err.response?.data?.message || 'Unable to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 px-4">
      <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-pink-600">Reset Password</h1>
        <p className="mb-6 text-center text-sm text-gray-500">Choose a strong new password for your account.</p>
        {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        <div className="mb-4">
          <label className="mb-2 block font-medium">New Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border p-3" required />
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div className={`h-2 rounded-full ${strength.color}`} style={{ width: `${(form.password.length / 12) * 100}%` }} />
          </div>
          <p className="mt-1 text-xs text-gray-500">Strength: {strength.label}</p>
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-medium">Confirm Password</label>
          <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full rounded-xl border p-3" required />
        </div>

        <button type="submit" disabled={loading} className="w-full rounded-xl bg-pink-600 py-3 text-white transition hover:bg-pink-700 disabled:opacity-70">
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          <Link to="/login" className="font-medium text-pink-600">Back to Login</Link>
        </div>
      </motion.form>
    </div>
  );
}

export default ResetPassword;
