import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { LogoWithText } from "../components/Logo";

const mentorPersonalities = [
  {
    id: "friendly",
    emoji: "😊",
    name: "Aria",
    type: "Friendly",
    desc: "Warm, encouraging, and always supportive. Great for students who need motivation and confidence.",
    traits: ["Empathetic", "Patient", "Encouraging"],
    color: "#06B6D4",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "rgba(6, 182, 212, 0.4)",
  },
  {
    id: "professional",
    emoji: "💼",
    name: "Nova",
    type: "Professional",
    desc: "Sharp, data-driven, and focused on results. Perfect for students who want direct, actionable advice.",
    traits: ["Strategic", "Precise", "Goal-oriented"],
    color: "#4F46E5",
    gradient: "from-indigo-500/20 to-violet-500/20",
    border: "rgba(79, 70, 229, 0.4)",
  },
  {
    id: "funny",
    emoji: "😄",
    name: "Blaze",
    type: "Funny",
    desc: "Energetic, witty, and keeps things light. Makes learning about careers fun and engaging.",
    traits: ["Playful", "Creative", "Energetic"],
    color: "#F59E0B",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: "motivational",
    emoji: "🔥",
    name: "Apex",
    type: "Motivational",
    desc: "Intense, inspiring, and pushes you to your limits. For students who want to be challenged.",
    traits: ["Inspiring", "Challenging", "Bold"],
    color: "#EF4444",
    gradient: "from-red-500/20 to-pink-500/20",
    border: "rgba(239, 68, 68, 0.4)",
  },
];

const avatarStyles = [
  { id: "bot", emoji: "🤖", label: "AI Bot", desc: "Classic futuristic AI look" },
  { id: "human", emoji: "👩‍💼", label: "Human", desc: "Realistic human avatar" },
  { id: "anime", emoji: "✨", label: "Anime", desc: "Stylized anime character" },
  { id: "abstract", emoji: "🌟", label: "Abstract", desc: "Geometric energy form" },
  { id: "animal", emoji: "🦊", label: "Mascot", desc: "Friendly animal guide" },
  { id: "space", emoji: "👾", label: "Space", desc: "Cosmic entity from the future" },
];

export default function MentorSelection() {
  const navigate = useNavigate();
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [avatarName, setAvatarName] = useState("");
  const [step, setStep] = useState<"personality" | "avatar" | "customize">("personality");

  const selected = mentorPersonalities.find((m) => m.id === selectedPersonality);

  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <LogoWithText size={36} />
          <h1 className="font-display text-3xl font-bold text-white mt-6 mb-2">Choose Your AI Mentor</h1>
          <p className="text-slate-400">Your AI mentor will guide your entire journey. Choose one that fits your style.</p>
        </div>

        {/* Tab progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {["Personality", "Avatar", "Customize"].map((tab, i) => {
            const tabId = ["personality", "avatar", "customize"][i] as typeof step;
            const active = step === tabId;
            const done = (step === "avatar" && i === 0) || (step === "customize" && i <= 1);
            return (
              <div key={tab} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={active ? { background: "linear-gradient(135deg, #4F46E5, #7C3AED)", color: "white" } : done ? { background: "rgba(34,197,94,0.2)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)" } : { background: "rgba(255,255,255,0.05)", color: "#64748B" }}
                >
                  {done && <Check size={14} />}
                  {tab}
                </div>
                {i < 2 && <div className="w-6 h-px bg-white/10" />}
              </div>
            );
          })}
        </div>

        {/* Personality selection */}
        {step === "personality" && (
          <div className="animate-slide-up">
            <div className="grid md:grid-cols-2 gap-5">
              {mentorPersonalities.map((m) => {
                const isSelected = selectedPersonality === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedPersonality(m.id)}
                    className="text-left glass rounded-3xl p-6 career-card relative overflow-hidden transition-all"
                    style={isSelected ? { border: `1px solid ${m.border}`, background: `linear-gradient(135deg, ${m.color}18, ${m.color}08)` } : {}}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: m.color }}>
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl">{m.emoji}</div>
                      <div>
                        <div className="font-display text-xl font-bold text-white">{m.name}</div>
                        <div
                          className="text-sm font-semibold px-2 py-0.5 rounded-full inline-block"
                          style={{ color: m.color, background: `${m.color}22` }}
                        >
                          {m.type}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{m.desc}</p>
                    <div className="flex gap-2 flex-wrap">
                      {m.traits.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${m.color}15`, color: m.color, border: `1px solid ${m.color}30` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => selectedPersonality && setStep("avatar")}
              className={`mt-8 w-full btn-primary py-4 flex items-center justify-center gap-2 ${!selectedPersonality ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!selectedPersonality}
            >
              Continue with {selected?.name ?? "mentor"}
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Avatar selection */}
        {step === "avatar" && (
          <div className="animate-slide-up">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {avatarStyles.map((a) => {
                const isSelected = selectedAvatar === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAvatar(a.id)}
                    className="glass rounded-2xl p-6 career-card text-center transition-all"
                    style={isSelected ? { border: "1px solid rgba(79,70,229,0.5)", background: "linear-gradient(135deg, rgba(79,70,229,0.2), rgba(124,58,237,0.15))" } : {}}
                  >
                    <div className="text-5xl mb-3">{a.emoji}</div>
                    <div className="font-semibold text-white mb-1">{a.label}</div>
                    <div className="text-xs text-slate-500">{a.desc}</div>
                    {isSelected && (
                      <div className="mt-3 flex items-center justify-center gap-1 text-indigo-400 text-xs font-medium">
                        <Check size={12} />
                        Selected
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep("personality")} className="px-6 py-4 glass rounded-xl text-slate-300 hover:text-white text-sm transition-all">
                Back
              </button>
              <button
                onClick={() => selectedAvatar && setStep("customize")}
                className={`flex-1 btn-primary py-4 flex items-center justify-center gap-2 ${!selectedAvatar ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!selectedAvatar}
              >
                Choose Avatar
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Customize */}
        {step === "customize" && (
          <div className="animate-slide-up max-w-lg mx-auto">
            <div className="glass rounded-3xl p-8 text-center">
              <div className="text-8xl mb-6">
                {avatarStyles.find((a) => a.id === selectedAvatar)?.emoji}
              </div>
              <div className="mb-6">
                <label className="text-xs text-slate-400 font-medium mb-1.5 block">Name your mentor</label>
                <input
                  type="text"
                  placeholder={`e.g., ${selected?.name ?? "Nova"}`}
                  value={avatarName}
                  onChange={(e) => setAvatarName(e.target.value)}
                  className="fw-input text-center text-lg font-semibold"
                />
              </div>

              <div className="p-4 rounded-2xl mb-6" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(124,58,237,0.1))", border: "1px solid rgba(79,70,229,0.2)" }}>
                <div className="flex items-start gap-3">
                  <Sparkles size={18} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-300 text-left">
                    <span className="font-medium text-white">{avatarName || selected?.name}</span> is ready to guide you! I'll be your{" "}
                    <span className="text-indigo-400">{selected?.type.toLowerCase()}</span> AI mentor, helping you explore careers, build skills, and achieve your goals.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep("avatar")} className="px-5 py-3.5 glass rounded-xl text-slate-300 text-sm transition-all hover:text-white">
                  Back
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 btn-primary py-3.5 flex items-center justify-center gap-2"
                >
                  Meet My Mentor!
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
