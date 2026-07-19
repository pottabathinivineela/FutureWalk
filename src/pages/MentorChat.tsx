import { useState, useRef, useEffect } from "react";
import { Send, Mic, Smile, Paperclip, MoreVertical, History, Lightbulb, Sparkles, Phone, Video } from "lucide-react";
import { Layout } from "../components/Layout";

const suggestions = [
  "What careers match my profile?",
  "How do I become a UX Designer?",
  "What salary can I expect?",
  "Show me my roadmap",
  "I'm feeling confused about my future",
  "What skills should I learn next?",
];

const initialMessages = [
  {
    role: "ai",
    content: "Hey Aryan! 👋 I'm Nova, your AI career mentor. Based on your profile, I can see you have strong interests in technology and design. I've analyzed your skills and I think there are some exciting paths we should explore today. What's on your mind?",
    time: "10:30 AM",
  },
  {
    role: "user",
    content: "I'm confused between UX Design and Data Science. Both seem interesting but I don't know which to choose.",
    time: "10:32 AM",
  },
  {
    role: "ai",
    content: "Great question! Both are excellent choices, and the good news is — your profile actually scores high on both! Here's a quick breakdown:\n\n**UX Design** (94% match):\n• Leverages your creativity and empathy\n• High demand in product companies\n• Average salary: ₹8-25 LPA\n\n**Data Science** (89% match):\n• Leverages your mathematical aptitude\n• Fastest growing field globally\n• Average salary: ₹10-40 LPA\n\nI'd recommend trying both simulations before deciding. Want me to schedule a UX Design simulation for you right now?",
    time: "10:33 AM",
  },
];

const historyChats = [
  { title: "Career path clarity", time: "Yesterday", preview: "We discussed UX vs Data Science..." },
  { title: "Scholarship advice", time: "2 days ago", preview: "Found 3 matching scholarships for you" },
  { title: "Resume review", time: "Last week", preview: "Analyzed your current skills gap" },
];

export default function MentorChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, {
        role: "ai",
        content: "That's a great question, Aryan! Based on your profile and the data I have on current job market trends, I'd recommend focusing on building a strong foundation in the fundamentals first. Would you like me to create a personalized learning roadmap for this?",
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }]);
    }, 1800);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-88px)] gap-4">
        {/* History sidebar */}
        <div className={`${showHistory ? "flex" : "hidden"} lg:flex flex-col w-64 flex-shrink-0`}>
          <div className="glass rounded-2xl flex-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5">
              <h3 className="text-sm font-semibold text-white">Chat History</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {historyChats.map((h, i) => (
                <div key={i} className="p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
                  <div className="text-sm text-slate-200 font-medium mb-0.5 group-hover:text-white">{h.title}</div>
                  <div className="text-xs text-slate-500">{h.time}</div>
                  <div className="text-xs text-slate-600 mt-1 truncate">{h.preview}</div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/5">
              <button className="w-full py-2 text-xs text-indigo-400 glass rounded-xl hover:bg-white/10 transition-all">
                + New Chat
              </button>
            </div>
          </div>
        </div>

        {/* Main chat */}
        <div className="flex-1 flex flex-col glass rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-white/5 flex-shrink-0">
            <button onClick={() => setShowHistory(!showHistory)} className="lg:hidden text-slate-400 hover:text-white">
              <History size={18} />
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.3), rgba(6,182,212,0.2))" }}>
                🤖
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0F172A]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">Nova</div>
              <div className="text-xs text-green-400">Online · Professional AI Mentor</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Phone size={15} />
              </button>
              <button className="w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Video size={15} />
              </button>
              <button className="w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <MoreVertical size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""} animate-slide-up`} style={{ animationDelay: `${i * 50}ms` }}>
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.3), rgba(6,182,212,0.2))" }}>
                    🤖
                  </div>
                )}
                <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className={`px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "chat-user text-white" : "chat-ai text-slate-200"}`}>
                    {msg.content.split("\n").map((line, li) => (
                      <div key={li}>
                        {line.startsWith("**") && line.endsWith("**") ? (
                          <strong className="text-white">{line.replace(/\*\*/g, "")}</strong>
                        ) : line.startsWith("•") ? (
                          <div className="flex items-start gap-2 mt-1">
                            <span className="text-indigo-400 mt-0.5">•</span>
                            <span>{line.slice(1).trim()}</span>
                          </div>
                        ) : (
                          <span>{line}</span>
                        )}
                        {li < msg.content.split("\n").length - 1 && line && <br />}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-slate-600">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.3), rgba(6,182,212,0.2))" }}>
                  🤖
                </div>
                <div className="chat-ai px-4 py-3 flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-indigo-400"
                      style={{ animation: "typing 1.2s ease infinite", animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto flex-shrink-0">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="flex-shrink-0 text-xs px-3 py-1.5 glass rounded-full text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-all whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-white/5 flex-shrink-0">
            <div className="flex items-center gap-2 p-2 glass rounded-2xl">
              <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-white/10">
                <Paperclip size={18} />
              </button>
              <input
                type="text"
                placeholder="Ask Nova anything about your career..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none"
              />
              <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-white/10">
                <Smile size={18} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-white/10">
                <Mic size={18} />
              </button>
              <button
                onClick={sendMessage}
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-all"
                style={{ background: input.trim() ? "linear-gradient(135deg, #4F46E5, #7C3AED)" : "rgba(255,255,255,0.05)" }}
              >
                <Send size={16} className={input.trim() ? "text-white" : "text-slate-600"} />
              </button>
            </div>
          </div>
        </div>

        {/* Tips sidebar */}
        <div className="hidden xl:flex flex-col w-56 flex-shrink-0 gap-4">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={16} className="text-yellow-400" />
              <span className="text-sm font-semibold text-white">Mentor Tips</span>
            </div>
            <div className="space-y-3">
              {[
                "Ask about salary trends for specific roles",
                "Request a skill gap analysis",
                "Ask for a simulation recommendation",
              ].map((tip, i) => (
                <div key={i} className="text-xs text-slate-400 p-2 rounded-lg bg-white/5">
                  💡 {tip}
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-indigo-400" />
              <span className="text-sm font-semibold text-white">AI Insights</span>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-slate-400">Based on your recent chats:</div>
              {[
                { label: "Best fit career", value: "UX Design" },
                { label: "Top skill gap", value: "Figma" },
                { label: "Next milestone", value: "Internship" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{item.label}</span>
                  <span className="text-xs font-medium text-indigo-400">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
