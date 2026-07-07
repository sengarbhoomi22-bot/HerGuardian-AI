import { useMemo } from "react";

function DashboardHeader({ user }) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  return (
    <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-3xl p-8 shadow-lg">
      <h1 className="text-4xl font-bold">
        {greeting}, {user?.name}! 🌸
      </h1>
      <p className="mt-2 text-pink-100">
        Your personal AI companion for women's wellness.
      </p>
    </div>
  );
}

export default DashboardHeader;