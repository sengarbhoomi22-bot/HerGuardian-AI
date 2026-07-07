import { Trash2, MailCheck } from 'lucide-react';

function NotificationCard({ n, onMarkRead, onDelete }) {
  return (
    <div className={`p-4 rounded-lg border ${n.read ? 'bg-white' : 'bg-pink-50 border-pink-100'}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-800">{n.title}</div>
          <div className="text-xs text-gray-500 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
        </div>
        <div className="flex items-center gap-2">
          {!n.read && <button onClick={() => onMarkRead(n._id)} title="Mark as read" className="text-pink-600"><MailCheck /></button>}
          <button onClick={() => onDelete(n._id)} title="Delete" className="text-gray-400"><Trash2 /></button>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-700">{n.message}</div>
    </div>
  );
}

export default NotificationCard;
