import { useEffect, useState } from "react";
import { auth } from "../firebase/auth";
import { getUserData } from "../services/userService";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle, Layers, Map, Trophy, Zap, ArrowRight, Bell, Star,
  TrendingUp, BookOpen, Code2, Clock, ChevronRight, Flame, Award,
} from "lucide-react";
import { Layout } from "../components/Layout";
import { useAuth } from "../Context/AuthContext";

const quickActions = [
  { icon: MessageCircle, label: "Ask Mentor", path: "/mentor-chat", color: "#4F46E5", bg: "rgba(79,70,229,0.15)" },
  { icon: Layers, label: "Simulate", path: "/simulation-hub", color: "#7C3AED", bg: "rgba(124,58,237,0.15)" },
  { icon: Map, label: "Roadmap", path: "/career-roadmap", color: "#06B6D4", bg: "rgba(6,182,212,0.15)" },
  { icon: BookOpen, label: "Scholarships", path: "/scholarships", color: "#22C55E", bg: "rgba(34,197,94,0.15)" },
  { icon: Code2, label: "Hackathons", path: "/hackathons", color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  { icon: Trophy, label: "Profile", path: "/profile", color: "#EF4444", bg: "rgba(239,68,68,0.15)" },
];

const missions = [
  { title: "Chat with AI Mentor for 10 mins", xp: 50, progress: 60, type: "mentor" },
  { title: "Complete UX Designer simulation", xp: 200, progress: 0, type: "sim" },
  { title: "Add 3 skills to your profile", xp: 30, progress: 67, type: "skill" },
];

const recentActivity = [
  { action: "Completed", item: "Data Scientist simulation", time: "2h ago", xp: 200, icon: Layers, color: "#7C3AED" },
  { action: "Earned", item: "Explorer Badge", time: "Yesterday", xp: 100, icon: Trophy, color: "#F59E0B" },
  { action: "Started", item: "Machine Learning roadmap", time: "2 days ago", xp: 50, icon: Map, color: "#4F46E5" },
  { action: "Found", item: "Google Scholarship 2026", time: "3 days ago", xp: 20, icon: BookOpen, color: "#22C55E" },
];

const achievements = [
  { emoji: "🚀", name: "First Launch", desc: "Completed first simulation", earned: true },
  { emoji: "🔥", name: "7-Day Streak", desc: "Logged in 7 days straight", earned: true },
  { emoji: "💬", name: "Chatterbox", desc: "50+ mentor conversations", earned: true },
  { emoji: "🏆", name: "Career Expert", desc: "Explore 20 careers", earned: false },
  { emoji: "🎓", name: "Scholar", desc: "Apply to 5 scholarships", earned: false },
  { emoji: "⚡", name: "Speed Learner", desc: "Complete 3 tasks in one day", earned: false },
];

const careers = [
  { name: "UX Designer", match: 94, trend: "+12%", color: "#7C3AED" },
  { name: "Data Scientist", match: 89, trend: "+8%", color: "#4F46E5" },
  { name: "Product Manager", match: 81, trend: "+15%", color: "#06B6D4" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useAuth();


const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome banner */}
        <div
          className="relative overflow-hidden rounded-3xl p-6 lg:p-8"
          style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.3) 0%, rgba(124,58,237,0.25) 50%, rgba(6,182,212,0.15) 100%)", border: "1px solid rgba(79,70,229,0.3)" }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)", filter: "blur(30px)" }} />
          <div className="absolute bottom-0 left-1/2 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)", filter: "blur(20px)" }} />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">{today}</p>
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                Good morning, {userData?.name || "Student"}! 👋
              </h1>
              <p className="text-slate-300 text-sm">
                You're <span className="text-indigo-400 font-semibold">Level {userData?.level || 1} · Explorer</span>. 1,160 XP to Level 13!
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm">
                  <Flame size={14} className="text-orange-400" />
                  <span className="text-orange-400 font-semibold">7-day streak</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm">
                  <Zap size={14} className="text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">{userData?.xp || 0} XP</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[180px]">
              <div className="text-xs text-slate-400 font-medium mb-1">Level Progress</div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Lv {userData?.level || 1}</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full progress-bar-fill" style={{ width: "68%", background: "linear-gradient(90deg, #4F46E5, #7C3AED, #06B6D4)" }} />
                </div>
                <span className="text-xs text-slate-500">Lv {(userData?.level || 1)+1}</span>
              </div>
              <div className="text-xs text-slate-500">{userData?.xp || 0} / 4000 XP</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(a.path)}
                className="glass rounded-2xl p-4 flex flex-col items-center gap-2 career-card"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: a.bg }}>
                  <a.icon size={20} style={{ color: a.color }} />
                </div>
                <span className="text-xs font-medium text-slate-300">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left col */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Missions */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
                    <Star size={14} className="text-white" />
                  </div>
                  Today's Missions
                </h2>
                <span className="text-xs text-slate-500">1/3 completed</span>
              </div>
              <div className="space-y-4">
                {missions.map((m, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${m.progress === 100 ? "bg-green-500/20 text-green-400" : "bg-indigo-500/20 text-indigo-400"}`}>
                      {m.progress === 100 ? "✓" : `${Math.round(m.progress)}%`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-200 mb-1.5">{m.title}</div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000 progress-bar-fill" style={{ width: `${m.progress}%`, background: m.progress === 100 ? "#22C55E" : "linear-gradient(90deg, #4F46E5, #7C3AED)" }} />
                      </div>
                    </div>
                    <div className="xp-badge flex-shrink-0">+{m.xp} XP</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Simulation */}
            <div
              className="relative overflow-hidden rounded-2xl p-6 cursor-pointer career-card"
              onClick={() => navigate("/simulation-hub")}
              style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(79,70,229,0.15))", border: "1px solid rgba(124,58,237,0.3)" }}
            >
              <div className="absolute right-0 top-0 text-8xl opacity-20">🎮</div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-1">Continue Where You Left Off</div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">Data Scientist Simulation</h3>
                  <p className="text-slate-400 text-sm">Day 3 of 5 · 68% completed</p>
                  <div className="w-48 h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                    <div className="h-full rounded-full progress-bar-fill" style={{ width: "68%", background: "linear-gradient(90deg, #7C3AED, #4F46E5)" }} />
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center glow-secondary" style={{ background: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}>
                  <ArrowRight size={22} className="text-white" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${a.color}20` }}>
                      <a.icon size={16} style={{ color: a.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-200">
                        <span className="text-slate-400">{a.action} </span>
                        {a.item}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock size={11} className="text-slate-600" />
                        <span className="text-xs text-slate-600">{a.time}</span>
                      </div>
                    </div>
                    <div className="xp-badge flex-shrink-0">+{a.xp} XP</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className="space-y-6">
            {/* AI Mentor Card */}
            <div
              className="rounded-2xl p-5 cursor-pointer career-card"
              onClick={() => navigate("/mentor-chat")}
              style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.25), rgba(6,182,212,0.15))", border: "1px solid rgba(79,70,229,0.35)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">🤖</div>
                <div>
                  <div className="font-semibold text-white">Nova</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    Online · Ready to help
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-3 mb-3 text-sm text-slate-300 leading-relaxed">
                <p className="text-sm text-slate-300 leading-relaxed">
  {userData?.name || "Student"}, based on your simulation scores,
  UX Design matches 94% with your profile.
  Want to explore it deeper today?
</p>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-indigo-400 glass hover:bg-white/10 transition-all">
                <MessageCircle size={15} />
                Continue Chat
              </button>
            </div>

            {/* Career Match */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white text-sm">Top Career Matches</h2>
                <button onClick={() => navigate("/simulation-hub")} className="text-xs text-indigo-400 hover:text-indigo-300">
                  View all
                </button>
              </div>
              <div className="space-y-3">
                {careers.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}aa)` }}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-200 font-medium">{c.name}</div>
                      <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${c.match}%`, background: c.color }} />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold" style={{ color: c.color }}>{c.match}%</div>
                      <div className="text-xs text-green-400">{c.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white text-sm">Achievements</h2>
                <button onClick={() => navigate("/profile")} className="text-xs text-indigo-400 hover:text-indigo-300">
                  All badges
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {achievements.map((a, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-2 text-center relative overflow-hidden ${a.earned ? "glass-md" : "glass opacity-40"}`}
                    style={a.earned ? { border: "1px solid rgba(245,158,11,0.3)" } : {}}
                  >
                    <div className={`text-2xl mb-1 ${!a.earned ? "grayscale" : ""}`}>{a.emoji}</div>
                    <div className="text-xs font-medium text-slate-300 leading-tight">{a.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications preview */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-white text-sm">Notifications</h2>
                <div className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-medium">3 new</div>
              </div>
              <div className="space-y-3">
                {[
                  { text: "Google Summer Scholarship deadline in 3 days!", time: "1h ago", icon: "🎓" },
                  { text: "Your mentor Nova sent you a personalized tip", time: "3h ago", icon: "🤖" },
                  { text: "New hackathon: Smart India Hackathon 2026", time: "Today", icon: "💻" },
                ].map((n, i) => (
                  <div key={i} className="flex gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="text-xl flex-shrink-0">{n.icon}</div>
                    <div>
                      <div className="text-xs text-slate-300 leading-relaxed">{n.text}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("/notifications")} className="w-full mt-3 flex items-center justify-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                View all notifications <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
