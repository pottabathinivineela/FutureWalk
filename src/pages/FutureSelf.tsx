import { useState, useRef, useEffect } from "react";
import { Send, Mic, Sparkles, Clock } from "lucide-react";
import { Layout } from "../components/Layout";
import { useAuth } from "../Context/AuthContext";

const quotes = [
  "The path you take today defines who I became tomorrow.",
  "Every small skill you learn now compounds into mastery.",
  "The uncertainty you feel now is exactly what made me stronger.",
  "Trust the process. I've seen where it leads.",
];

const initialConversation = [
  {
    role: "future",
    content: "Aryan from the future here. 👋 I'm 28, working as a Senior UX Design Lead at a global tech company. The journey here was incredible — and it started exactly where you are now. What do you want to know?",
    year: "2034",
  },
  {
    role: "user",
    content: "Did I make the right choice choosing UX Design over Data Science?",
    year: "2026",
  },
  {
    role: "future",
    content: "Honestly? Yes. UX was the perfect fit for you. But here's what I want you to know — it wasn't always obvious. There were moments of doubt at 22, when your Data Science friends were getting higher packages. But by 25, you were leading design at a startup that got acquired, and by 28, everything made sense. The key was learning both — UX for the heart of the product, data for the decisions.",
    year: "2034",
  },
];

const timeline = [
  { year: 2026, event: "Now — Class 12, exploring UX Design", status: "current" },
  { year: 2027, event: "Internship at Design Studio, Mumbai", status: "future" },
  { year: 2028, event: "B.Des from NID Ahmedabad", status: "future" },
  { year: 2029, event: "Junior UX Designer at startup", status: "future" },
  { year: 2031, event: "UX Lead — product acquired by company", status: "future" },
  { year: 2034, event: "Senior Design Lead, Global Tech Company", status: "milestone" },
];

export default function FutureSelf() {
  const [messages, setMessages] = useState(initialConversation);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setQuoteIdx((i) => (i + 1) % quotes.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", content: input, year: "2026" }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, {
        role: "future",
        content: "Looking back from 2034, I can tell you — every doubt, every late night, every moment of confusion was building toward something meaningful. Keep going. The version of you in 8 years is grateful for every step you take today.",
        year: "2034",
      }]);
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-sm text-violet-400 font-medium">AI-Powered Temporal Simulation</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Talk to Your Future Self</h1>
          <p className="text-slate-400">AI simulates the future version of you — based on your career path, decisions, and goals</p>
        </div>

        {/* Rotating quote */}
        <div
          className="text-center py-5 px-8 rounded-2xl relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.1))", border: "1px solid rgba(124,58,237,0.25)" }}
        >
          <div className="text-slate-300 italic text-lg font-light transition-all duration-500">
            "{quotes[quoteIdx]}"
          </div>
          <div className="text-xs text-violet-400 mt-2 font-medium">— {userData?.name}, 2034</div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat */}
          <div className="lg:col-span-2 glass rounded-2xl overflow-hidden flex flex-col" style={{ height: 500 }}>
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-white/5 flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.1))" }}>
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.2))" }}>
                  🔮
                </div>
                <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}>
                  +8yr
                </div>
              </div>
              <div>
                <div className="font-semibold text-white">{userData?.name}</div>
                <div className="text-xs text-violet-400">Senior Design Lead · 2034 · Mumbai → San Francisco</div>
              </div>
              <div className="ml-auto text-xs text-slate-500 flex items-center gap-1">
                <Clock size={12} />
                8 years ahead
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.role === "future" && (
                    <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-lg flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.2))" }}>
                      🔮
                    </div>
                  )}
                  <div className={`max-w-[78%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "chat-user text-white" : ""}`} style={msg.role === "future" ? { background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.1))", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "1.25rem 1.25rem 1.25rem 0.25rem", color: "#CBD5E1" } : {}}>
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Clock size={10} />
                      {msg.year}
                    </div>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.2))" }}>🔮</div>
                  <div className="px-4 py-3 rounded-2xl flex items-center gap-1.5" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.1))", border: "1px solid rgba(124,58,237,0.2)" }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-violet-400" style={{ animation: "typing 1.2s ease infinite", animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 flex-shrink-0">
              <div className="flex items-center gap-2 p-2 glass rounded-xl">
                <input
                  type="text"
                  placeholder="Ask your future self anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none"
                />
                <button className="text-slate-500 hover:text-slate-300 transition-colors">
                  <Mic size={18} />
                </button>
                <button
                  onClick={send}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: input.trim() ? "linear-gradient(135deg, #7C3AED, #4F46E5)" : "rgba(255,255,255,0.05)" }}
                >
                  <Send size={15} className={input.trim() ? "text-white" : "text-slate-600"} />
                </button>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass rounded-2xl p-5 overflow-y-auto" style={{ maxHeight: 500 }}>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Clock size={16} className="text-violet-400" />
              Your Predicted Timeline
            </h3>
            <div className="relative pl-8">
              <div className="timeline-line" />
              <div className="space-y-6">
                {timeline.map((t, i) => (
                  <div key={i} className="relative flex gap-4">
                    <div
                      className="absolute -left-8 timeline-dot"
                      style={t.status === "current" ? { background: "linear-gradient(135deg, #4F46E5, #7C3AED)", boxShadow: "0 0 20px rgba(79,70,229,0.6)" } : t.status === "milestone" ? { background: "linear-gradient(135deg, #F59E0B, #EF4444)" } : { background: "rgba(255,255,255,0.1)", boxShadow: "none" }}
                    >
                      <span className="text-white text-xs font-bold">{t.year - 2026 === 0 ? "★" : t.year - 2026 < 10 ? `+${t.year - 2026}` : "🏆"}</span>
                    </div>
                    <div className="pt-1">
                      <div className={`text-xs font-bold mb-0.5 ${t.status === "current" ? "text-indigo-400" : t.status === "milestone" ? "text-amber-400" : "text-slate-500"}`}>{t.year}</div>
                      <div className={`text-sm leading-snug ${t.status === "current" ? "text-white" : t.status === "milestone" ? "text-amber-300" : "text-slate-400"}`}>{t.event}</div>
                    </div>
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
