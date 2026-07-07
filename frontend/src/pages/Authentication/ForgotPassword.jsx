import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/authService';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await forgotPassword({ email });
      toast.success('If an account exists, a reset email has been sent.');
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to send reset link.');
      setError(err.response?.data?.message || 'Unable to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 px-4">
      <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-pink-600">Forgot Password?</h1>
        <p className="mb-6 text-center text-sm text-gray-500">Enter your email and we will send a reset link.</p>
        {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        <div className="mb-5">
          <label className="mb-2 block font-medium">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border p-3" placeholder="you@example.com" required />
        </div>

        <button type="submit" disabled={loading} className="w-full rounded-xl bg-pink-600 py-3 text-white transition hover:bg-pink-700 disabled:opacity-70">
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          <Link to="/login" className="font-medium text-pink-600">Back to Login</Link>
        </div>
      </motion.form>
    </div>
  );
}

export default ForgotPassword;
