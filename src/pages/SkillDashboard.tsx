import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Zap, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Layout } from "../components/Layout";

const radarData = [
  { skill: "Design Thinking", you: 85, avg: 60 },
  { skill: "Coding", you: 72, avg: 65 },
  { skill: "Communication", you: 90, avg: 70 },
  { skill: "Analytics", you: 68, avg: 55 },
  { skill: "Leadership", you: 75, avg: 58 },
  { skill: "Creativity", you: 92, avg: 65 },
  { skill: "Research", you: 80, avg: 62 },
  { skill: "Problem Solving", you: 78, avg: 70 },
];

const progressData = [
  { name: "Figma", level: 78, color: "#7C3AED" },
  { name: "UX Research", level: 65, color: "#4F46E5" },
  { name: "HTML/CSS", level: 55, color: "#06B6D4" },
  { name: "Python", level: 40, color: "#22C55E" },
  { name: "Data Analysis", level: 35, color: "#F59E0B" },
  { name: "JavaScript", level: 48, color: "#EF4444" },
];

const achievements = [
  { emoji: "🎨", title: "Design Master", desc: "Top 10% in Design Thinking", earned: true },
  { emoji: "💬", title: "Communicator", desc: "90+ in Communication", earned: true },
  { emoji: "⭐", title: "Creative Force", desc: "92+ in Creativity", earned: true },
  { emoji: "🔬", title: "Researcher", desc: "Complete 5 user interviews", earned: false },
  { emoji: "💻", title: "Coder", desc: "Reach 75+ in Coding", earned: false },
];

const weakAreas = [
  { skill: "Python / Data Analysis", suggestion: "Take 'Python for Data Analysis' on Coursera", priority: "High" },
  { skill: "JavaScript Fundamentals", suggestion: "Complete 'JavaScript 30' by Wes Bos (Free)", priority: "Medium" },
  { skill: "Prototyping Tools", suggestion: "Practice Framer Motion and Principle", priority: "Medium" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="custom-tooltip">
        <div className="font-semibold text-white mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="text-xs" style={{ color: p.color }}>{p.name}: {p.value}%</div>
        ))}
      </div>
    );
  }
  return null;
};

export default function SkillDashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Skill Dashboard</h1>
          <p className="text-slate-400 text-sm">Track your strengths, weaknesses, and growth over time</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Overall Score", value: "76/100", icon: "⭐", color: "#F59E0B" },
            { label: "Top Skill", value: "Creativity", icon: "🎨", color: "#7C3AED" },
            { label: "Weak Area", value: "Python", icon: "⚠️", color: "#EF4444" },
            { label: "Rank", value: "Top 15%", icon: "🏆", color: "#22C55E" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className="text-2xl">{s.icon}</div>
              <div>
                <div className="font-display text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Radar chart */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-1">Skill Radar</h2>
            <p className="text-xs text-slate-500 mb-4">You vs. Industry Average</p>
            <div className="radar-container" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "#64748B", fontSize: 11 }} />
                  <Radar name="You" dataKey="you" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="Avg" dataKey="avg" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.15} strokeWidth={1.5} strokeDasharray="4 2" />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 justify-center mt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-3 h-0.5 rounded-full bg-indigo-400" />
                You
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-3 h-0.5 rounded-full bg-cyan-400" style={{ backgroundImage: "repeating-linear-gradient(90deg, #06B6D4 0, #06B6D4 4px, transparent 4px, transparent 6px)" }} />
                Industry Average
              </div>
            </div>
          </div>

          {/* Skill progress bars */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-1">Tool & Tech Proficiency</h2>
            <p className="text-xs text-slate-500 mb-5">Self-assessed + AI-evaluated skill levels</p>
            <div className="space-y-4">
              {progressData.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-300 font-medium">{s.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{s.level}%</span>
                      {s.level >= 70 ? <TrendingUp size={12} className="text-green-400" /> : s.level < 50 ? <AlertCircle size={12} className="text-red-400" /> : <Zap size={12} className="text-yellow-400" />}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full progress-bar-fill" style={{ width: `${s.level}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}aa)` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weak areas */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-red-400" />
              Areas to Improve
            </h2>
            <div className="space-y-4">
              {weakAreas.map((w, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{w.skill}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${w.priority === "High" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {w.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">💡 {w.suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-400" />
              Skill Achievements
            </h2>
            <div className="space-y-3">
              {achievements.map((a, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${a.earned ? "" : "opacity-50"}`} style={a.earned ? { background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" } : { background: "rgba(255,255,255,0.03)" }}>
                  <div className={`text-2xl ${!a.earned ? "grayscale" : ""}`}>{a.emoji}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{a.title}</div>
                    <div className="text-xs text-slate-500">{a.desc}</div>
                  </div>
                  {a.earned ? <CheckCircle size={16} className="text-green-400 flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-600 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
