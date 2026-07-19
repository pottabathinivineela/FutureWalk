import { useState } from "react";
import { Bell, CheckCheck, Trash2, Filter } from "lucide-react";
import { Layout } from "../components/Layout";

const allNotifs = [
  { id: 1, type: "deadline", icon: "🎓", title: "Scholarship Deadline", message: "Google Summer of Code deadline is in 3 days! Don't miss it.", time: "1 hour ago", read: false, color: "#EF4444" },
  { id: 2, type: "mentor", icon: "🤖", title: "Mentor Message", message: "Nova has a personalized tip ready for your career journey.", time: "3 hours ago", read: false, color: "#4F46E5" },
  { id: 3, type: "hackathon", icon: "💻", title: "New Hackathon", message: "Smart India Hackathon 2026 is now open for registration!", time: "Today", read: false, color: "#7C3AED" },
  { id: 4, type: "achievement", icon: "🏆", title: "Achievement Unlocked", message: "You earned the '7-Day Streak' badge. Keep it going!", time: "Yesterday", read: true, color: "#F59E0B" },
  { id: 5, type: "simulation", icon: "🎮", title: "Simulation Complete", message: "Your Software Engineer simulation is 100% complete!", time: "2 days ago", read: true, color: "#22C55E" },
  { id: 6, type: "xp", icon: "⚡", title: "XP Earned", message: "You earned 200 XP for completing the Data Scientist simulation!", time: "2 days ago", read: true, color: "#F59E0B" },
  { id: 7, type: "scholarship", icon: "🎓", title: "Scholarship Match", message: "Tata Scholarship Programme matches your profile at 87%!", time: "3 days ago", read: true, color: "#4F46E5" },
  { id: 8, type: "tip", icon: "💡", title: "Career Tip", message: "Nova suggests: 'Add your Figma projects to portfolio — it boosts UX applications by 40%'", time: "4 days ago", read: true, color: "#06B6D4" },
];

type FilterType = "all" | "unread" | "deadline" | "achievement" | "mentor";

export default function Notifications() {
  const [notifs, setNotifs] = useState(allNotifs);
  const [filter, setFilter] = useState<FilterType>("all");

  const markAllRead = () => setNotifs((n) => n.map((notif) => ({ ...notif, read: true })));
  const deleteNotif = (id: number) => setNotifs((n) => n.filter((notif) => notif.id !== id));
  const markRead = (id: number) => setNotifs((n) => n.map((notif) => notif.id === id ? { ...notif, read: true } : notif));

  const filtered = notifs.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "all") return true;
    return n.type === filter;
  });

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">Notifications</h1>
            <p className="text-slate-400 text-sm">{unreadCount} unread notifications</p>
          </div>
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm text-slate-300 hover:text-white transition-all"
          >
            <CheckCheck size={15} />
            Mark all read
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 p-1 glass rounded-xl overflow-x-auto">
          {(["all", "unread", "deadline", "achievement", "mentor"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap capitalize ${filter === f ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              {f === "all" ? `All (${notifs.length})` : f === "unread" ? `Unread (${unreadCount})` : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔔</div>
              <div className="text-slate-400">No notifications here</div>
            </div>
          )}
          {filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`glass rounded-2xl p-4 flex gap-4 cursor-pointer hover:bg-white/5 transition-all group ${!n.read ? "border-l-2" : ""}`}
              style={!n.read ? { borderLeftColor: n.color } : {}}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `${n.color}15` }}
              >
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className={`text-sm font-medium ${n.read ? "text-slate-300" : "text-white"}`}>{n.title}</div>
                  {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: n.color }} />}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                <div className="text-xs text-slate-600 mt-1.5">{n.time}</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); deleteNotif(n.id); }}
                className="text-slate-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
