import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, Briefcase, MessageSquare, TrendingUp, Star, Activity, Shield, LogOut,
  AlertCircle, CheckCircle, Clock, Search, Filter, MoreVertical, ChevronRight, Settings,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { LogoWithText } from "../components/Logo";

const growthData = [
  { month: "Jan", users: 3200, sessions: 8400 },
  { month: "Feb", users: 4100, sessions: 11200 },
  { month: "Mar", users: 5800, sessions: 15600 },
  { month: "Apr", users: 7200, sessions: 19800 },
  { month: "May", users: 9400, sessions: 24700 },
  { month: "Jun", users: 11800, sessions: 31200 },
  { month: "Jul", users: 14600, sessions: 38900 },
];

const careerData = [
  { name: "UX Design", sims: 4200, color: "#7C3AED" },
  { name: "Data Science", sims: 3800, color: "#4F46E5" },
  { name: "Software Eng", sims: 5100, color: "#22C55E" },
  { name: "Product Mgmt", sims: 2600, color: "#06B6D4" },
  { name: "Medicine", sims: 1900, color: "#EF4444" },
];

const recentUsers = [
  { name: "Priya Sharma", email: "priya@example.com", grade: "Class 12", status: "Active", joined: "2 hrs ago", avatar: "PS" },
  { name: "Rahul Mehta", email: "rahul@example.com", grade: "2nd Year", status: "Active", joined: "5 hrs ago", avatar: "RM" },
  { name: "Sneha Patel", email: "sneha@example.com", grade: "B.Com 3rd", status: "Inactive", joined: "Yesterday", avatar: "SP" },
  { name: "Karan Singh", email: "karan@example.com", grade: "Class 11", status: "Active", joined: "2 days ago", avatar: "KS" },
];

const systemAlerts = [
  { type: "error", message: "AI Mentor API response time > 3s", time: "10 min ago" },
  { type: "warning", message: "Scholarship deadline reminder emails pending", time: "1 hr ago" },
  { type: "success", message: "New batch of 120 simulations indexed", time: "3 hrs ago" },
];

const adminNavItems = [
  { icon: TrendingUp, label: "Overview", path: "overview" },
  { icon: Users, label: "Users", path: "users" },
  { icon: Briefcase, label: "Careers", path: "careers" },
  { icon: Star, label: "Analytics", path: "analytics" },
  { icon: MessageSquare, label: "Feedback", path: "feedback" },
  { icon: Settings, label: "Settings", path: "settings" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="custom-tooltip">
        <div className="font-semibold text-white mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="text-xs" style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("overview");

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#0F172A" }}>
      {/* Admin sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col" style={{ background: "rgba(15,23,42,0.98)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="p-4 border-b border-white/5">
          <LogoWithText size={28} />
          <div className="mt-2 text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Shield size={11} className="text-indigo-400" />
            Admin Portal
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {adminNavItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => setActiveNav(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeNav === path ? "sidebar-active" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}`}
            >
              <Icon size={17} className={activeNav === path ? "text-indigo-400" : "text-slate-500"} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/5">
          <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-red-400 text-sm transition-colors">
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <div className="sticky top-0 z-10 flex items-center gap-4 px-6 py-3" style={{ background: "rgba(15,23,42,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search users, careers, feedback..." className="fw-input pl-9 text-sm py-2" />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 glass rounded-xl flex items-center justify-center text-slate-400"><AlertCircle size={16} /></div>
              <span className="notif-dot" />
            </div>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>AD</div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm">Platform overview · July 2026</p>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Students", value: "52,840", icon: Users, change: "+18% this month", color: "#4F46E5" },
              { label: "Active Simulations", value: "8,204", icon: Activity, change: "+32% today", color: "#7C3AED" },
              { label: "Avg Engagement", value: "24 min", icon: Clock, change: "+5 min vs last week", color: "#06B6D4" },
              { label: "Satisfaction Rate", value: "94.8%", icon: Star, change: "+2.1% this month", color: "#22C55E" },
            ].map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.label} className="glass rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}20` }}>
                      <Icon size={18} style={{ color: kpi.color }} />
                    </div>
                    <TrendingUp size={14} className="text-green-400" />
                  </div>
                  <div className="font-display text-2xl font-bold text-white mb-0.5">{kpi.value}</div>
                  <div className="text-xs text-slate-500">{kpi.label}</div>
                  <div className="text-xs text-green-400 mt-1">{kpi.change}</div>
                </div>
              );
            })}
          </div>

          {/* Charts row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* User growth */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-1">User & Session Growth</h2>
              <p className="text-xs text-slate-500 mb-4">Monthly active users and sessions</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sessionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="users" name="Users" stroke="#4F46E5" strokeWidth={2} fill="url(#userGrad)" />
                  <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#06B6D4" strokeWidth={2} fill="url(#sessionGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Top careers */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-1">Top Career Simulations</h2>
              <p className="text-xs text-slate-500 mb-4">By total simulations started</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={careerData} barSize={28}>
                  <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sims" name="Simulations" radius={[6, 6, 0, 0]}>
                    {careerData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent users */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white text-sm">Recent Signups</h2>
                <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  View all <ChevronRight size={12} />
                </button>
              </div>
              <div className="space-y-3">
                {recentUsers.map((u, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}>
                      {u.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.grade} · {u.joined}</div>
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"}`}>
                      {u.status}
                    </div>
                    <button className="text-slate-600 hover:text-slate-400">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* System alerts */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white text-sm flex items-center gap-2">
                  <Activity size={16} className="text-indigo-400" />
                  System Alerts
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">1 error</span>
              </div>
              <div className="space-y-3">
                {systemAlerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: alert.type === "error" ? "rgba(239,68,68,0.08)" : alert.type === "warning" ? "rgba(245,158,11,0.08)" : "rgba(34,197,94,0.08)", border: `1px solid ${alert.type === "error" ? "rgba(239,68,68,0.2)" : alert.type === "warning" ? "rgba(245,158,11,0.2)" : "rgba(34,197,94,0.2)"}` }}>
                    {alert.type === "error" ? <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" /> : alert.type === "warning" ? <AlertCircle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" /> : <CheckCircle size={15} className="text-green-400 flex-shrink-0 mt-0.5" />}
                    <div>
                      <div className="text-xs text-slate-300">{alert.message}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
