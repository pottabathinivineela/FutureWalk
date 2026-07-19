import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle, User, Brain, Target, BookOpen, Star, Zap } from "lucide-react";
import { LogoWithText } from "../components/Logo";

const steps = [
  { id: 1, title: "Personal Details", icon: User, desc: "Tell us about yourself" },
  { id: 2, title: "Interests", icon: Star, desc: "What do you love?" },
  { id: 3, title: "Skills", icon: Zap, desc: "What are you good at?" },
  { id: 4, title: "Academic Profile", icon: BookOpen, desc: "Your marks and grades" },
  { id: 5, title: "Career Goals", icon: Target, desc: "Where do you want to go?" },
  { id: 6, title: "Personality", icon: Brain, desc: "How you work best" },
];

const interests = ["Technology", "Medicine", "Design", "Finance", "Law", "Arts", "Science", "Sports", "Music", "Writing", "Teaching", "Business", "Architecture", "Psychology", "Engineering", "Research"];
const skills = ["Problem Solving", "Communication", "Creativity", "Leadership", "Coding", "Design", "Mathematics", "Critical Thinking", "Teamwork", "Public Speaking", "Research", "Writing", "Data Analysis", "Project Management", "Languages"];
const personalities = [
  { id: "intro", label: "Introvert", emoji: "🤔", desc: "I prefer working alone and thinking deeply" },
  { id: "extro", label: "Extrovert", emoji: "🎉", desc: "I thrive in social environments and teams" },
  { id: "ambi", label: "Ambivert", emoji: "⚖️", desc: "I balance between both, depending on context" },
];
const workStyles = [
  { id: "creative", label: "Creative", emoji: "🎨", desc: "I love building new things" },
  { id: "analytical", label: "Analytical", emoji: "📊", desc: "I love solving complex problems" },
  { id: "social", label: "Social", emoji: "🤝", desc: "I love helping and connecting people" },
  { id: "systematic", label: "Systematic", emoji: "⚙️", desc: "I love structure and processes" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "", grade: "", school: "", city: "", dob: "",
    interests: [] as string[],
    skills: [] as string[],
    math: "", science: "", english: "", overall: "",
    careerGoal: "", timeline: "", motivation: "",
    personality: "", workStyle: "",
  });

  const toggleItem = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <LogoWithText size={36} />
          <h1 className="font-display text-2xl font-bold text-white mt-4">Let's Build Your Profile</h1>
          <p className="text-slate-400 text-sm mt-1">Step {step} of {steps.length} — {steps[step - 1].desc}</p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #4F46E5, #7C3AED, #06B6D4)" }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mb-8 overflow-x-auto pb-2">
          {steps.map((s) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex flex-col items-center gap-1 min-w-[60px]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: done ? "linear-gradient(135deg, #22C55E, #16A34A)" : active ? "linear-gradient(135deg, #4F46E5, #7C3AED)" : "rgba(255,255,255,0.05)",
                    border: active ? "2px solid rgba(79,70,229,0.6)" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {done ? <CheckCircle size={18} className="text-white" /> : <Icon size={18} className={active ? "text-white" : "text-slate-500"} />}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${active ? "gradient-text" : done ? "text-green-400" : "text-slate-600"}`}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form card */}
        <div className="glass rounded-3xl p-8 animate-slide-up">
          <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
            {(() => {
              const Icon = steps[step - 1].icon;
              return <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}><Icon size={20} className="text-white" /></div>;
            })()}
            {steps[step - 1].title}
          </h2>

          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", field: "name", placeholder: "Aryan Rathi", type: "text" },
                { label: "Date of Birth", field: "dob", placeholder: "2006-08-15", type: "date" },
                { label: "Grade / Year", field: "grade", placeholder: "Class 12 / 2nd Year", type: "text" },
                { label: "School / College", field: "school", placeholder: "St. Xavier's College", type: "text" },
                { label: "City", field: "city", placeholder: "Mumbai", type: "text" },
              ].map((f) => (
                <div key={f.field} className={f.field === "school" ? "sm:col-span-2" : ""}>
                  <label className="text-xs text-slate-400 font-medium mb-1.5 block">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={(data as any)[f.field]}
                    onChange={(e) => setData({ ...data, [f.field]: e.target.value })}
                    className="fw-input"
                  />
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-slate-400 text-sm mb-4">Select all topics that genuinely excite you (pick at least 3)</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => {
                  const selected = data.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => setData({ ...data, interests: toggleItem(data.interests, interest) })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selected ? "text-white glow-sm" : "glass text-slate-400 hover:text-slate-200"}`}
                      style={selected ? { background: "linear-gradient(135deg, #4F46E5, #7C3AED)" } : {}}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
              {data.interests.length > 0 && (
                <p className="text-xs text-indigo-400 mt-3">{data.interests.length} interests selected</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-slate-400 text-sm mb-4">Select your current skills and strengths (pick at least 3)</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const selected = data.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => setData({ ...data, skills: toggleItem(data.skills, skill) })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selected ? "text-white" : "glass text-slate-400 hover:text-slate-200"}`}
                      style={selected ? { background: "linear-gradient(135deg, #7C3AED, #06B6D4)" } : {}}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-slate-400 text-sm">Enter your approximate percentage or CGPA</p>
              {[
                { label: "Mathematics / Quantitative", field: "math" },
                { label: "Science / Core Subject", field: "science" },
                { label: "English / Languages", field: "english" },
                { label: "Overall / CGPA", field: "overall" },
              ].map((f) => (
                <div key={f.field}>
                  <label className="text-xs text-slate-400 font-medium mb-1.5 block">{f.label}</label>
                  <input
                    type="text"
                    placeholder="e.g., 85% or 8.5 CGPA"
                    value={(data as any)[f.field]}
                    onChange={(e) => setData({ ...data, [f.field]: e.target.value })}
                    className="fw-input"
                  />
                </div>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1.5 block">What career excites you most? (or if unsure, describe what you want to do)</label>
                <input
                  type="text"
                  placeholder="e.g., Software Engineer, Product Designer, Doctor..."
                  value={data.careerGoal}
                  onChange={(e) => setData({ ...data, careerGoal: e.target.value })}
                  className="fw-input"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1.5 block">When do you want to start your career?</label>
                <select
                  value={data.timeline}
                  onChange={(e) => setData({ ...data, timeline: e.target.value })}
                  className="fw-input fw-select"
                >
                  <option value="">Select timeline</option>
                  <option>Within 1 year</option>
                  <option>1-2 years</option>
                  <option>2-4 years</option>
                  <option>4+ years (still studying)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1.5 block">What matters most in your career?</label>
                <div className="grid grid-cols-2 gap-2">
                  {["High Salary", "Creative Freedom", "Social Impact", "Work-Life Balance", "Job Security", "Entrepreneurship"].map((m) => {
                    const sel = data.motivation === m;
                    return (
                      <button
                        key={m}
                        onClick={() => setData({ ...data, motivation: m })}
                        className={`py-2.5 px-3 rounded-xl text-sm text-left transition-all ${sel ? "text-white" : "glass text-slate-400"}`}
                        style={sel ? { background: "linear-gradient(135deg, #4F46E5, #7C3AED)" } : {}}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-400 mb-3">How would you describe your personality?</p>
                <div className="grid grid-cols-3 gap-3">
                  {personalities.map((p) => {
                    const sel = data.personality === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setData({ ...data, personality: p.id })}
                        className={`p-4 rounded-2xl text-center transition-all career-card ${sel ? "" : "glass"}`}
                        style={sel ? { background: "linear-gradient(135deg, rgba(79,70,229,0.3), rgba(124,58,237,0.2))", border: "1px solid rgba(79,70,229,0.5)" } : {}}
                      >
                        <div className="text-3xl mb-2">{p.emoji}</div>
                        <div className="text-sm font-semibold text-white">{p.label}</div>
                        <div className="text-xs text-slate-500 mt-1">{p.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-3">What's your working style?</p>
                <div className="grid grid-cols-2 gap-3">
                  {workStyles.map((w) => {
                    const sel = data.workStyle === w.id;
                    return (
                      <button
                        key={w.id}
                        onClick={() => setData({ ...data, workStyle: w.id })}
                        className={`p-4 rounded-2xl text-left transition-all career-card ${sel ? "" : "glass"}`}
                        style={sel ? { background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))", border: "1px solid rgba(124,58,237,0.5)" } : {}}
                      >
                        <div className="text-2xl mb-2">{w.emoji}</div>
                        <div className="text-sm font-semibold text-white">{w.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{w.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-3 glass rounded-xl text-slate-300 hover:text-white text-sm font-medium transition-all"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button
              onClick={() => step < steps.length ? setStep(step + 1) : navigate("/mentor-selection")}
              className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
            >
              {step === steps.length ? "Complete Setup" : "Continue"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
