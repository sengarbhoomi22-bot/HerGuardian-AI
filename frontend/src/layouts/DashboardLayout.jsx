import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  HeartPulse,
  Activity,
  Apple,
  Sparkles,
  TrendingUp,
  Brain,
  GraduationCap,
  ShieldCheck,
  Bell,
  Bookmark,
  MessageSquareHeart,
  User,
  LogOut,
  Menu,
  X,
  Languages,
  Plus,
  Minus,
  Users
} from "lucide-react";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) console.warn('VITE_API_BASE_URL is not set. Notifications API calls will be skipped.');

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Women's Health", path: "/health", icon: HeartPulse },
  { label: "Menstrual Wellness", path: "/menstrual", icon: Sparkles },
  { label: "Nutrition", path: "/nutrition", icon: Apple },
  { label: "Fitness", path: "/fitness", icon: Activity },
  { label: "Mental Wellness", path: "/mental", icon: Brain },
  { label: "Career & Scholarships", path: "/career", icon: GraduationCap },
  
  { label: "Inspiration Hub", path: "/inspiration", icon: Sparkles },
  { label: "Analytics", path: "/analytics", icon: TrendingUp },
  { label: "Notifications", path: "/notifications", icon: Bell },
  { label: "Emergency SOS", path: "/emergency", icon: ShieldCheck },
  { label: "Health Reminder", path: "/reminder", icon: Bell },
  { label: "Saved Library", path: "/saved", icon: Bookmark },
  { label: "Women Empowerment", path: "/community", icon: Users },
  { label: "Feedback & Reviews", path: "/feedback", icon: MessageSquareHeart },
  { label: "Profile & Settings", path: "/profile", icon: User },
];

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [unreadCount, setUnreadCount] = useState(0);

  // AI assistant removed

  // Adjust browser root font size for accessibility zoom
  useEffect(() => {
    document.documentElement.style.fontSize = `${zoomLevel}%`;
    return () => {
      document.documentElement.style.fontSize = "100%";
    };
  }, [zoomLevel]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!API_BASE_URL || !token) return;

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/notifications`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (data.success) setUnreadCount(data.unreadCount || 0);
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 130));
    toast.success(`Zoom level: ${zoomLevel + 10}%`);
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 80));
    toast.success(`Zoom level: ${zoomLevel - 10}%`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Successfully logged out");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-pink-50/30 text-gray-800">
      {/* Sidebar for Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-pink-100 bg-white shadow-md transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-pink-100 px-6">
          <Link to="/dashboard" className="text-xl font-bold text-pink-600 flex items-center gap-2">
            <span>🌸</span> HerGuardian AI
          </Link>
          <button className="rounded-lg p-1.5 hover:bg-pink-50 md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <nav className="h-[calc(100vh-10rem)] overflow-y-auto px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition duration-200 ${isActive ? "bg-pink-600 text-white shadow-sm" : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"}`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Profile / Logout at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-pink-100 bg-white p-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/notifications')} className="relative rounded-full p-2 hover:bg-pink-50">
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadCount > 0 && <span className="absolute -top-0 -right-0 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold leading-none text-white bg-pink-600 rounded-full">{unreadCount}</span>}
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 font-semibold text-pink-600">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold">{user.name || "User"}</p>
              <p className="truncate text-xs text-gray-500">{user.email || "user@example.com"}</p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-pink-100 bg-white/95 px-6 shadow-sm backdrop-blur">
          <div className="flex items-center gap-4">
            <button className="rounded-lg p-1.5 hover:bg-pink-50 md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <h2 className="hidden text-lg font-semibold text-gray-700 sm:block">
              {navItems.find(item => item.path === location.pathname)?.label || "Wellness Panel"}
            </h2>
          </div>

          {/* Accessibility & Settings Controls */}
          <div className="flex items-center gap-3">
            {/* Font Zoom Controls */}
            <div className="flex items-center rounded-full border border-pink-200 bg-white px-2 py-1 shadow-sm">
              <button onClick={handleZoomOut} className="rounded-full p-1 text-gray-500 hover:bg-pink-50" title="Zoom Out">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-2 text-xs font-semibold text-pink-600">{zoomLevel}%</span>
              <button onClick={handleZoomIn} className="rounded-full p-1 text-gray-500 hover:bg-pink-50" title="Zoom In">
                <Plus className="h-4 w-4" />
              </button>
            </div>

          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Global AI assistant removed */}
    </div>
  );
}

export default DashboardLayout;
