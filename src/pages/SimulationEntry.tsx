import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Clock, Users, Star, Briefcase, Brain, TrendingUp, CheckCircle, Zap } from "lucide-react";
import { Layout } from "../components/Layout";

const daySchedule = [
  { day: 1, title: "Onboarding & Team Meeting", desc: "Meet your team, understand the product, and attend your first standup.", icon: "🤝" },
  { day: 2, title: "User Research & Interviews", desc: "Conduct 3 user interviews and document insights in your research journal.", icon: "🔍" },
  { day: 3, title: "Wireframing & Prototyping", desc: "Create low-fidelity wireframes and present to the product team.", icon: "✏️" },
  { day: 4, title: "Design Review & Iteration", desc: "Receive feedback and iterate on your designs based on stakeholder input.", icon: "🔄" },
  { day: 5, title: "Final Presentation & Demo", desc: "Present your finalized designs to the CEO and engineering team.", icon: "🎯" },
];

export default function SimulationEntry() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const startSim = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 2500);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate("/simulation-hub")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back to Simulation Hub
        </button>

        {/* Cinematic hero */}
        <div
          className="relative overflow-hidden rounded-3xl p-8 lg:p-12 mb-8"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.4) 0%, rgba(79,70,229,0.3) 50%, rgba(6,182,212,0.2) 100%)",
            border: "1px solid rgba(124,58,237,0.4)",
          }}
        >
          {/* Background animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full animate-orb" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full animate-orb delay-300" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)", filter: "blur(50px)" }} />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="text-7xl animate-float">🎨</div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(124,58,237,0.3)", color: "#C4B5FD", border: "1px solid rgba(124,58,237,0.4)" }}>Design</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.2)", color: "#86EFAC", border: "1px solid rgba(34,197,94,0.3)" }}>94% Match</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.2)", color: "#FCD34D", border: "1px solid rgba(245,158,11,0.3)" }}>🔥 Hot Career</span>
                </div>
                <h1 className="font-display text-3xl lg:text-4xl font-black text-white mb-3">UX Designer</h1>
                <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                  Walk through 5 days in the life of a UX Designer at a top product company. Conduct real user research, create wireframes, and present your work to stakeholders.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Clock, label: "Duration", value: "5 Days" },
                { icon: Users, label: "Enrolled", value: "12.4K" },
                { icon: Star, label: "Rating", value: "4.9 / 5" },
                { icon: TrendingUp, label: "Avg Salary", value: "₹12-30 LPA" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <Icon size={18} className="text-violet-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-500">{label}</div>
                    <div className="text-sm font-semibold text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left - Simulation details */}
          <div className="lg:col-span-2 space-y-6">
            {/* What you'll experience */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Brain size={18} className="text-violet-400" />
                What You'll Experience
              </h2>
              <div className="space-y-3">
                {daySchedule.map((day) => (
                  <div key={day.day} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(79,70,229,0.2))" }}>
                      {day.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-violet-400 uppercase">Day {day.day}</span>
                        <span className="text-sm font-medium text-white">{day.title}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills you'll gain */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Zap size={18} className="text-cyan-400" />
                Skills You'll Gain
              </h2>
              <div className="flex flex-wrap gap-2">
                {["User Research", "Figma", "Prototyping", "Wireframing", "Usability Testing", "Design Thinking", "Information Architecture", "Stakeholder Communication", "A/B Testing", "Accessibility"].map((skill) => (
                  <span key={skill} className="text-xs px-3 py-1.5 rounded-full glass text-slate-300">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Start card */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🎮</div>
                <h3 className="font-semibold text-white">Ready to Walk Your Future?</h3>
                <p className="text-sm text-slate-400 mt-1">This simulation takes 5 days of virtual experience</p>
              </div>

              {!loading && !loaded && (
                <button
                  onClick={startSim}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-base glow-sm"
                >
                  <Play size={20} />
                  Start Simulation
                </button>
              )}

              {loading && (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-400/30 border-t-indigo-400 mx-auto mb-3 animate-spin" />
                  <p className="text-sm text-slate-400">Loading your simulation world...</p>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                    <div className="h-full rounded-full animate-shimmer" style={{ width: "70%", background: "linear-gradient(90deg, #4F46E5, #7C3AED)" }} />
                  </div>
                </div>
              )}

              {loaded && (
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={24} className="text-green-400" />
                  </div>
                  <p className="text-sm text-green-400 font-medium mb-3">Simulation Ready!</p>
                  <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                    <Play size={18} />
                    Enter World →
                  </button>
                </div>
              )}

              <div className="mt-4 p-3 rounded-xl text-center" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
                <div className="flex items-center justify-center gap-2 text-xs text-amber-400 font-medium">
                  <Zap size={13} />
                  Complete to earn 200 XP + Explorer Badge
                </div>
              </div>
            </div>

            {/* Previous simulations */}
            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Your Simulations</h3>
              <div className="space-y-2">
                {[
                  { name: "Data Scientist", status: "In Progress", progress: 68, color: "#4F46E5" },
                  { name: "Software Engineer", status: "Completed", progress: 100, color: "#22C55E" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}20` }}>
                      <Briefcase size={14} style={{ color: s.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-200">{s.name}</div>
                      <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${s.progress}%`, background: s.color }} />
                      </div>
                    </div>
                    <span className="text-xs" style={{ color: s.progress === 100 ? "#22C55E" : s.color }}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
