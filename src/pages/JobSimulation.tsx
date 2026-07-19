import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, CheckCircle, Clock, Star, Briefcase, Code2, Users, Presentation, MessageCircle } from "lucide-react";
import { Layout } from "../components/Layout";

const companies = [
  { id: 1, name: "Google", role: "UX Designer Intern", logo: "🔵", difficulty: "Hard", duration: "5 tasks", reward: "300 XP", color: "#4285F4" },
  { id: 2, name: "Swiggy", role: "Product Designer", logo: "🟠", difficulty: "Medium", duration: "4 tasks", reward: "250 XP", color: "#FC8019" },
  { id: 3, name: "Meesho", role: "Junior UX", logo: "🟣", difficulty: "Easy", duration: "3 tasks", reward: "150 XP", color: "#9C27B0" },
  { id: 4, name: "Zomato", role: "UX Designer", logo: "🔴", difficulty: "Medium", duration: "4 tasks", reward: "200 XP", color: "#E23744" },
];

const tasks = [
  { id: 1, title: "Company Orientation", type: "meeting", icon: Users, done: true, score: 95, desc: "Attend the virtual orientation and learn about Google's Design philosophy" },
  { id: 2, title: "User Research Task", type: "research", icon: MessageCircle, done: true, score: 88, desc: "Analyze 3 user interview transcripts and extract key insights" },
  { id: 3, title: "Wireframe Challenge", type: "design", icon: Code2, done: false, score: null, desc: "Create wireframes for a redesigned checkout flow in 60 minutes" },
  { id: 4, title: "Design Review", type: "presentation", icon: Presentation, done: false, score: null, desc: "Present your wireframes to the design team and receive feedback" },
  { id: 5, title: "Final Coding Test", type: "coding", icon: Code2, done: false, score: null, desc: "Implement basic HTML/CSS for your designed component (optional for design roles)" },
];

const difficultyColors: Record<string, string> = { Easy: "#22C55E", Medium: "#F59E0B", Hard: "#EF4444" };

export default function JobSimulation() {
  const [selected, setSelected] = useState<number | null>(1);
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const navigate = useNavigate();

  const company = companies.find((c) => c.id === selected);
  const completedTasks = tasks.filter((t) => t.done).length;
  const avgScore = Math.round(tasks.filter((t) => t.done && t.score).reduce((acc, t) => acc + (t.score || 0), 0) / tasks.filter((t) => t.done).length);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Job Simulation</h1>
          <p className="text-slate-400 text-sm">Experience real work environments at top companies</p>
        </div>

        {/* Company selection */}
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Choose Company</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`glass rounded-2xl p-4 text-left transition-all career-card ${selected === c.id ? "" : ""}`}
                style={selected === c.id ? { border: `1px solid ${c.color}50`, background: `${c.color}15` } : {}}
              >
                <div className="text-3xl mb-2">{c.logo}</div>
                <div className="font-semibold text-white text-sm">{c.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{c.role}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-xs font-bold" style={{ color: difficultyColors[c.difficulty] }}>{c.difficulty}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-slate-500">{c.duration}</span>
                </div>
                <div className="xp-badge mt-2">{c.reward}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Simulation workspace */}
        {company && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Tasks list */}
            <div className="lg:col-span-2 space-y-4">
              {/* Progress header */}
              <div
                className="glass rounded-2xl p-5"
                style={{ border: `1px solid ${company.color}30` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{company.logo}</div>
                  <div>
                    <h2 className="font-semibold text-white">{company.name} — {company.role}</h2>
                    <p className="text-xs text-slate-500">Simulation in progress</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="font-bold text-xl gradient-text">{avgScore || "--"}</div>
                    <div className="text-xs text-slate-500">Avg Score</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-500">{completedTasks}/{tasks.length} tasks</div>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full progress-bar-fill" style={{ width: `${(completedTasks / tasks.length) * 100}%`, background: company.color }} />
                  </div>
                  <div className="text-xs text-slate-500">{Math.round((completedTasks / tasks.length) * 100)}%</div>
                </div>
              </div>

              {/* Task list */}
              <div className="space-y-3">
                {tasks.map((task, i) => {
                  const Icon = task.icon;
                  const isActive = activeTask === task.id;
                  return (
                    <div
                      key={task.id}
                      className={`glass rounded-2xl p-5 transition-all cursor-pointer ${isActive ? "" : "career-card"}`}
                      style={isActive ? { border: `1px solid ${company.color}50`, background: `${company.color}10` } : {}}
                      onClick={() => setActiveTask(isActive ? null : task.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${task.done ? "bg-green-500/20" : "bg-white/5"}`}>
                          {task.done ? <CheckCircle size={20} className="text-green-400" /> : <Icon size={20} className="text-slate-400" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-slate-500 uppercase">Task {i + 1}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full capitalize glass text-slate-400">{task.type}</span>
                          </div>
                          <h3 className="font-medium text-white">{task.title}</h3>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{task.desc}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {task.done ? (
                            <div>
                              <div className="font-bold text-green-400">{task.score}%</div>
                              <div className="text-xs text-slate-500">Score</div>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-600 flex items-center gap-1">
                              <Clock size={11} />
                              ~30 min
                            </div>
                          )}
                        </div>
                      </div>

                      {isActive && !task.done && (
                        <div className="mt-4 pt-4 border-t border-white/5">
                          <button
                            className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                            style={{ background: `linear-gradient(135deg, ${company.color}, ${company.color}aa)` }}
                          >
                            <Play size={16} />
                            Start Task
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right panel */}
            <div className="space-y-4">
              {/* Score card */}
              <div className="glass rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-4 text-sm">Performance</h3>
                <div className="space-y-3">
                  {[
                    { label: "Orientation", score: 95, color: "#22C55E" },
                    { label: "User Research", score: 88, color: "#4F46E5" },
                    { label: "Wireframing", score: null, color: "#7C3AED" },
                    { label: "Design Review", score: null, color: "#06B6D4" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">{s.label}</span>
                        <span className="font-medium" style={{ color: s.score ? s.color : "#475569" }}>
                          {s.score ? `${s.score}%` : "—"}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: s.score ? `${s.score}%` : "0%", background: s.color, transition: "width 1s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div className="glass rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
                  <Star size={14} className="text-amber-400" />
                  AI Feedback
                </h3>
                <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-400">✓ Excellent orientation — shows great attention to company values</div>
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">✓ Good user research insights — add more quantitative data next time</div>
                  <div className="p-2 rounded-lg bg-white/5 text-slate-500">⏳ Wireframing task pending</div>
                </div>
              </div>

              <button className="w-full py-3 glass rounded-2xl text-sm text-slate-400 hover:text-white transition-all">
                View Full Simulation Report
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
