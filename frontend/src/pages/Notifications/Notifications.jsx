import { useEffect, useState, useCallback } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import NotificationCard from '../../components/notifications/NotificationCard';
import { motion } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) console.warn('VITE_API_BASE_URL is not set. Notifications API calls will be skipped.');

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const token = localStorage.getItem('token');

  const load = useCallback(async () => {
    setLoading(true);
    if (!token || !API_BASE_URL) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/notifications`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setNotifications(data.notifications || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [load]);

  const markRead = async (id) => {
    if (!token || !API_BASE_URL) return;
    try {
      await fetch(`${API_BASE_URL}/notifications/${id}/read`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } });
      setNotifications((s) => s.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (e) { console.error(e); }
  };

  const remove = async (id) => {
    if (!token || !API_BASE_URL) return;
    try {
      await fetch(`${API_BASE_URL}/notifications/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setNotifications((s) => s.filter(n => n._id !== id));
    } catch (e) { console.error(e); }
  };

  const markAll = async () => {
    if (!token || !API_BASE_URL) return;
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/read-all`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setNotifications(data.notifications || notifications.map(n => ({ ...n, read: true })));
    } catch (e) { console.error(e); }
  };

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  }).filter(n => n.title.toLowerCase().includes(query.toLowerCase()) || n.message.toLowerCase().includes(query.toLowerCase()));

  if (loading) return <div className="min-h-screen p-6"><LoadingSpinner label="Loading notifications..." /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-6 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-pink-600">Notifications</h2>
              <p className="text-sm text-gray-500">Recent updates and reminders</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={markAll} className="px-3 py-2 rounded-lg border">Mark all as read</button>
              <button onClick={load} className="px-3 py-2 rounded-lg border">Refresh</button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter==='all' ? 'bg-pink-100' : ''}`}>All</button>
              <button onClick={() => setFilter('unread')} className={`px-3 py-1 rounded ${filter==='unread' ? 'bg-pink-100' : ''}`}>Unread</button>
              <button onClick={() => setFilter('read')} className={`px-3 py-1 rounded ${filter==='read' ? 'bg-pink-100' : ''}`}>Read</button>
            </div>
            <div className="flex-1">
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search notifications..." className="w-full rounded-lg border p-2" />
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {filtered.length === 0 && <div className="text-sm text-gray-500">No notifications.</div>}
            {filtered.map(n => (
              <NotificationCard key={n._id} n={n} onMarkRead={markRead} onDelete={remove} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;
