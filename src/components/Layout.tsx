import { useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import {
  LayoutDashboard,
  MessageCircle,
  Layers,
  Map,
  BookOpen,
  Zap,
  Trophy,
  Users,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Code2,
  Star,
  Search,
  Menu,
  X,
  UserCircle,
} from "lucide-react";
import { LogoWithText, Logo } from "./Logo";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: MessageCircle, label: "AI Mentor", path: "/mentor-chat" },
  { icon: Layers, label: "Simulations", path: "/simulation-hub" },
  { icon: Users, label: "Future Self", path: "/future-self" },
  { icon: Briefcase, label: "Job Simulation", path: "/job-simulation" },
  { icon: Map, label: "Career Roadmap", path: "/career-roadmap" },
  { icon: BookOpen, label: "Scholarships", path: "/scholarships" },
  { icon: Code2, label: "Hackathons", path: "/hackathons" },
  { icon: Zap, label: "Skills", path: "/skills" },
  { icon: GraduationCap, label: "Parent View", path: "/parent" },
  { icon: Trophy, label: "Profile", path: "/profile" },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Briefcase, label: "Careers", path: "/admin/careers" },
  { icon: Star, label: "Analytics", path: "/admin/analytics" },
  { icon: MessageCircle, label: "Feedback", path: "/admin/feedback" },
];

interface LayoutProps {
  children: ReactNode;
  isAdmin?: boolean;
}

export function Layout({ children, isAdmin = false }: LayoutProps) {
  const { userData } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const items = isAdmin ? adminNavItems : navItems;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        {collapsed ? (
          <Logo size={32} />
        ) : (
          <LogoWithText size={32} />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-white/10 transition-colors text-slate-400"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* XP Card */}
      {!collapsed && !isAdmin && (
        <div className="mx-3 mt-4 p-3 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.2), rgba(124,58,237,0.15))", border: "1px solid rgba(79,70,229,0.3)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Level {userData?.level || 1} · Explorer</span>
            <span className="xp-badge">{userData?.xp || 0} XP</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full progress-bar-fill" style={{ width:`${(userData?.xp ||0)/40}%`, background: "linear-gradient(90deg, #4F46E5, #7C3AED)" }} />
          </div>
          <div className="text-xs text-slate-500 mt-1">{4000 - (userData?.xp || 0)} XP to Level {(userData?.level || 1) + 1}</div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 mt-2">
        {items.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path || location.pathname.startsWith(path + "/");
          return (
            <button
              key={path}
              onClick={() => { navigate(path); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                active
                  ? "sidebar-active"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Icon size={18} className={active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"} />
              {!collapsed && (
                <span className="text-sm font-medium">{label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-white/5 space-y-1">
        <button
          onClick={() => navigate("/notifications")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
        >
          <div className="relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </div>
          {!collapsed && <span className="text-sm font-medium">Notifications</span>}
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
        >
          <Settings size={18} />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </button>

        {/* User profile */}
        <div className="flex items-center gap-3 px-3 py-2.5 mt-2 border-t border-white/5 pt-3">
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}
          >
            {userData?.name
  ?.split(" ")
  .map((n) => n[0])
  .join("")
  .slice(0, 2)
  .toUpperCase() || "U"}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-200 truncate">{userData?.name}</div>
              <div className="text-xs text-slate-500 truncate">{userData?.email}</div>
            </div>
          )}
          {!collapsed && (
            <button onClick={() => navigate("/")} className="text-slate-500 hover:text-slate-300 transition-colors">
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#0F172A" }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: 260, background: "rgba(15, 23, 42, 0.98)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X size={20} />
        </button>
        {sidebarContent}
      </aside>

      {/* Sidebar - desktop */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0 transition-all duration-300"
        style={{
          width: collapsed ? 70 : 260,
          background: "rgba(15, 23, 42, 0.95)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {sidebarContent}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="flex-shrink-0 flex items-center gap-4 px-4 lg:px-6 py-3"
          style={{ background: "rgba(15, 23, 42, 0.8)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}
        >
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <Menu size={22} />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search careers, skills, opportunities..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm fw-input"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* XP pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs font-semibold text-indigo-400">
              ⚡ {userData?.xp || 0} XP
            </div>

            {/* Notifications */}
            <button
              onClick={() => navigate("/notifications")}
              className="relative w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <Bell size={18} />
              <span className="notif-dot" />
            </button>

            {/* Avatar */}
            <button
              onClick={() => navigate("/profile")}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}
            >
              {userData?.name
  ?.split(" ")
  .map((n) => n[0])
  .join("")
  .slice(0, 2)
  .toUpperCase() || "U"}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
