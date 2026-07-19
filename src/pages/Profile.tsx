import { useState } from "react";
import { Download, Edit2, Share2, Trophy, Zap, Star, CheckCircle, Award } from "lucide-react";
import { Layout } from "../components/Layout";
import { useAuth } from "../Context/AuthContext";

const badges = [
  { emoji: "🚀", name: "First Launch", desc: "First simulation", earned: true, rarity: "Common" },
  { emoji: "🔥", name: "7-Day Streak", desc: "7 days straight", earned: true, rarity: "Uncommon" },
  { emoji: "💬", name: "Chatterbox", desc: "50+ chats", earned: true, rarity: "Common" },
  { emoji: "🎨", name: "Design Expert", desc: "Top design score", earned: true, rarity: "Rare" },
  { emoji: "⭐", name: "Star Explorer", desc: "10 simulations", earned: true, rarity: "Rare" },
  { emoji: "🏆", name: "Career Expert", desc: "20 careers explored", earned: false, rarity: "Epic" },
  { emoji: "🎓", name: "Scholar", desc: "5 scholarships", earned: false, rarity: "Epic" },
  { emoji: "💎", name: "Diamond", desc: "Level 20", earned: false, rarity: "Legendary" },
];

const certs = [
  { name: "UX Design Fundamentals", issuer: "FutureWalk + Google", date: "June 2026", color: "#4F46E5" },
  { name: "Career Exploration: Design", issuer: "FutureWalk Academy", date: "May 2026", color: "#7C3AED" },
  { name: "Communication Skills Pro", issuer: "FutureWalk Academy", date: "April 2026", color: "#06B6D4" },
];

const rarityColors: Record<string, string> = {
  Common: "#64748B",
  Uncommon: "#22C55E",
  Rare: "#4F46E5",
  Epic: "#7C3AED",
  Legendary: "#F59E0B",
};

export default function Profile() {
  const [tab, setTab] = useState<"achievements" | "badges" | "certs" | "resume">("achievements");
  const { userData } = useAuth();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile header */}
        <div className="glass rounded-3xl overflow-hidden">
          {/* Cover */}
          <div className="h-32 relative" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED, #06B6D4)" }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          </div>

          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-4">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white border-4 border-[#0F172A] flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}
              >
                AR
              </div>
              <div className="flex-1 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-white">{userData?.name}</h1>
                    <p className="text-slate-400 text-sm">Class 12 · St. Xavier's College, Mumbai</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm text-slate-300 hover:text-white transition-all">
                      <Share2 size={14} />
                      Share
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 btn-primary text-sm py-2">
                      <Edit2 size={14} />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Level", value: "12", icon: <Star size={16} className="text-amber-400" />, color: "#F59E0B" },
                { label: "Total XP", value: "2,840", icon: <Zap size={16} className="text-indigo-400" />, color: "#4F46E5" },
                { label: "Badges", value: `${badges.filter((b) => b.earned).length}/${badges.length}`, icon: <Trophy size={16} className="text-violet-400" />, color: "#7C3AED" },
                { label: "Streak", value: "7 days", icon: <span className="text-base">🔥</span>, color: "#EF4444" },
              ].map((s) => (
                <div key={s.label} className="p-3 glass rounded-xl flex items-center gap-2">
                  {s.icon}
                  <div>
                    <div className="font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs text-slate-500">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* XP bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Level 12 Progress</span>
                <span>2,840 / 4,000 XP</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full progress-bar-fill" style={{ width: "71%", background: "linear-gradient(90deg, #4F46E5, #7C3AED, #06B6D4)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 glass rounded-xl w-fit overflow-x-auto">
          {(["achievements", "badges", "certs", "resume"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap capitalize ${tab === t ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              {t === "certs" ? "Certificates" : t === "resume" ? "Resume" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Achievements tab */}
        {tab === "achievements" && (
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Simulations Completed", value: 12, target: 20, icon: "🎮", color: "#7C3AED" },
              { title: "Mentor Conversations", value: 34, target: 50, icon: "💬", color: "#4F46E5" },
              { title: "Skills Assessed", value: 8, target: 15, icon: "⚡", color: "#06B6D4" },
              { title: "Scholarships Saved", value: 4, target: 10, icon: "🎓", color: "#22C55E" },
            ].map((a) => (
              <div key={a.title} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{a.icon}</div>
                  <div>
                    <div className="font-medium text-white">{a.title}</div>
                    <div className="text-xs text-slate-500">{a.value} / {a.target} target</div>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full progress-bar-fill" style={{ width: `${(a.value / a.target) * 100}%`, background: a.color }} />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1.5">
                  <span>{Math.round((a.value / a.target) * 100)}% complete</span>
                  <span>{a.target - a.value} to go</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Badges tab */}
        {tab === "badges" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((b, i) => (
              <div
                key={i}
                className={`glass rounded-2xl p-5 text-center relative overflow-hidden transition-all ${b.earned ? "career-card" : "opacity-50"}`}
                style={b.earned ? { border: `1px solid ${rarityColors[b.rarity]}30` } : {}}
              >
                <div className={`text-4xl mb-2 ${!b.earned ? "grayscale" : "animate-float"}`} style={{ animationDelay: `${i * 200}ms` }}>
                  {b.emoji}
                </div>
                <div className="font-semibold text-white text-sm mb-0.5">{b.name}</div>
                <div className="text-xs text-slate-500 mb-2">{b.desc}</div>
                <div
                  className="text-xs px-2 py-0.5 rounded-full font-semibold inline-block"
                  style={{ color: rarityColors[b.rarity], background: `${rarityColors[b.rarity]}20` }}
                >
                  {b.rarity}
                </div>
                {!b.earned && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                    <div className="text-slate-500 text-xs font-medium">🔒 Locked</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certificates tab */}
        {tab === "certs" && (
          <div className="space-y-4">
            {certs.map((c, i) => (
              <div key={i} className="glass rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${c.color}20` }}>
                    📜
                  </div>
                  <div>
                    <div className="font-semibold text-white">{c.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{c.issuer} · {c.date}</div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-green-400">
                      <CheckCircle size={11} />
                      Verified Certificate
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-xs text-slate-300 hover:text-white transition-all flex-shrink-0">
                  <Download size={13} />
                  Download
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Resume tab */}
        {tab === "resume" && (
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="font-semibold text-white mb-2">AI-Generated Resume</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
              FutureWalk can auto-generate a professional resume based on your skills, simulations, and achievements.
            </p>
            <div className="flex gap-3 justify-center">
              <button className="btn-primary flex items-center gap-2 px-6 py-3">
                <Zap size={16} />
                Generate Resume
              </button>
              <button className="glass rounded-xl px-6 py-3 text-slate-300 hover:text-white text-sm transition-all">
                Upload Existing
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
