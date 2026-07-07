import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

const COLORS = ['#B85CA8', '#E89BB5', '#D4709D', '#A33D8F', '#F6C6E0'];

const ChartsSection = ({ favoritesByModule = [], remindersByCategory = [], activity7Days = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Saved Tips by Module</h3>
        {favoritesByModule.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={favoritesByModule} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {favoritesByModule.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-64 items-center justify-center text-gray-500">No saved tips</div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Reminders by Category</h3>
        {remindersByCategory.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={remindersByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#B85CA8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-64 items-center justify-center text-gray-500">No reminders yet</div>
        )}
      </div>

      <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Activity (Last 7 Days)</h3>
        {activity7Days.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={activity7Days}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#B85CA8" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-48 items-center justify-center text-gray-500">No recent activity</div>
        )}
      </div>
    </div>
  );
};

export default ChartsSection;
