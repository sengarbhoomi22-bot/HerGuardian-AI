const StatCard = ({ title, value, icon, color = 'from-pink-400 to-pink-600' }) => {
  const Icon = icon;
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${color} p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        {Icon && <Icon className="h-12 w-12 opacity-60" />}
      </div>
    </div>
  );
};

export default StatCard;
