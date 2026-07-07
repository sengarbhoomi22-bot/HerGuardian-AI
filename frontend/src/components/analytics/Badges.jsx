const predefinedBadges = [
  { id: 'first-fav', label: 'First Favorite', desc: 'Saved your first favorite' },
  { id: 'healthy-eater', label: 'Healthy Eater', desc: 'Saved nutrition tips' },
  { id: 'fitness-lover', label: 'Fitness Lover', desc: 'Saved fitness tips' },
  { id: 'consistent-user', label: 'Consistent User', desc: 'Active 7+ days' },
  { id: 'reminder-master', label: 'Reminder Master', desc: 'Created 5+ reminders' },
];

const Badges = ({ favorites = [], reminders = [], activityDays = [] }) => {
  const unlocked = new Set();
  if (favorites.length > 0) unlocked.add('first-fav');
  if (favorites.some((f) => f.category === 'Nutrition')) unlocked.add('healthy-eater');
  if (favorites.some((f) => f.category === 'Fitness')) unlocked.add('fitness-lover');
  if (activityDays.length >= 7) unlocked.add('consistent-user');
  if (reminders.length >= 5) unlocked.add('reminder-master');

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {predefinedBadges.map((b) => (
        <div key={b.id} className={`p-4 rounded-2xl shadow-md border ${unlocked.has(b.id) ? 'bg-white' : 'bg-gray-50 opacity-60'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${unlocked.has(b.id) ? 'bg-gradient-to-br from-pink-400 to-purple-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
              {b.label.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm">{b.label}</p>
              <p className="text-xs text-gray-500">{b.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Badges;
