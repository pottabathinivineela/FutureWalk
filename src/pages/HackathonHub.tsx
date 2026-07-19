import { useState } from "react";
import { Search, Bookmark, BookmarkCheck, Clock, Users, Trophy, ExternalLink } from "lucide-react";
import { Layout } from "../components/Layout";

const hackathons = [
  { id: 1, title: "Smart India Hackathon 2026", org: "Govt. of India / AICTE", prize: "₹1 Crore+", deadline: "2026-08-20", participants: "5L+", category: "Government", tags: ["National", "All Streams", "Teams"], color: "#FF9800", match: 90, mode: "Offline", saved: false, desc: "India's largest hackathon solving real national problems. Open to all undergraduate students." },
  { id: 2, title: "Google Solution Challenge", org: "Google Developers", prize: "$3,000 + Cloud Credits", deadline: "2026-09-01", participants: "100K+", category: "Tech", tags: ["Google", "SDGs", "App Dev"], color: "#4285F4", match: 88, mode: "Online", saved: true, desc: "Build solutions for UN Sustainable Development Goals using Google technologies." },
  { id: 3, title: "Microsoft Imagine Cup", org: "Microsoft", prize: "$85,000", deadline: "2026-10-15", participants: "300K+", category: "Tech", tags: ["AI", "Cloud", "Startup"], color: "#00BCF2", match: 82, mode: "Hybrid", saved: false, desc: "Global student competition empowering the next generation of computer science innovators." },
  { id: 4, title: "HackMIT 2026", org: "MIT", prize: "$25,000", deadline: "2026-09-10", participants: "2,000", category: "Elite", tags: ["MIT", "Innovation", "Exclusive"], color: "#7C3AED", match: 76, mode: "Offline", saved: false, desc: "One of the most prestigious hackathons in the world, held at MIT campus." },
  { id: 5, title: "Flipkart Grid 7.0", org: "Flipkart", prize: "₹25 Lakh", deadline: "2026-07-25", participants: "50K+", category: "Business", tags: ["E-commerce", "Supply Chain", "AI"], color: "#F7941D", match: 71, mode: "Online", saved: true, desc: "Build innovative solutions for e-commerce challenges set by India's leading marketplace." },
  { id: 6, title: "NASA Space Apps Challenge", org: "NASA", prize: "Trip to NASA + $$", deadline: "2026-10-05", participants: "60K+", category: "Science", tags: ["Space", "Earth", "Data Science"], color: "#0B3D91", match: 65, mode: "Online", saved: false, desc: "Annual hackathon using NASA data to solve challenges related to space and Earth science." },
];

const categories = ["All", "Tech", "Government", "Business", "Science", "Design", "Elite"];

export default function HackathonHub() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState<number[]>([2, 5]);
  const [tab, setTab] = useState<"all" | "saved" | "upcoming">("all");

  const filtered = hackathons.filter((h) => {
    const matchSearch = h.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || h.category === category;
    const matchTab = tab === "saved" ? saved.includes(h.id) : true;
    return matchSearch && matchCat && matchTab;
  });

  const getDaysLeft = (deadline: string) => Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Hackathon Hub</h1>
          <p className="text-slate-400 text-sm">Compete, build, and earn recognition in top hackathons</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Upcoming", value: "180+", icon: "🚀" },
            { label: "AI Matched", value: "12", icon: "✨" },
            { label: "Saved", value: saved.length.toString(), icon: "❤️" },
            { label: "Total Prize Pool", value: "$2M+", icon: "🏆" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className="text-2xl">{s.icon}</div>
              <div>
                <div className="font-display text-xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search hackathons..." value={search} onChange={(e) => setSearch(e.target.value)} className="fw-input pl-10" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all ${category === cat ? "text-white" : "glass text-slate-400"}`} style={category === cat ? { background: "linear-gradient(135deg, #4F46E5, #7C3AED)" } : {}}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-1 p-1 glass rounded-xl w-fit">
          {(["all", "upcoming", "saved"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>
              {t === "all" ? "All" : t === "saved" ? `Saved (${saved.length})` : "Upcoming"}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((h) => {
            const daysLeft = getDaysLeft(h.deadline);
            const isSaved = saved.includes(h.id);
            const urgent = daysLeft <= 14;
            return (
              <div key={h.id} className="glass rounded-2xl p-5 career-card flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${h.color}20` }}>
                    💻
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm leading-snug">{h.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{h.org}</p>
                  </div>
                  <button onClick={() => setSaved(isSaved ? saved.filter((id) => id !== h.id) : [...saved, h.id])} className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0">
                    {isSaved ? <BookmarkCheck size={16} className="text-red-400" /> : <Bookmark size={16} />}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400">{h.match}% Match</div>
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                    <Trophy size={10} className="inline mr-1" />
                    {h.prize}
                  </div>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${h.mode === "Online" ? "bg-green-500/15 text-green-400" : h.mode === "Offline" ? "bg-blue-500/15 text-blue-400" : "bg-purple-500/15 text-purple-400"}`}>
                    {h.mode}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">{h.desc}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {h.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full glass text-slate-500">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users size={12} />
                    {h.participants} participants
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold ${urgent ? "text-red-400" : "text-slate-500"}`}>
                    <Clock size={12} />
                    {daysLeft}d left
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white transition-all" style={{ background: `linear-gradient(135deg, ${h.color}, ${h.color}aa)` }}>
                  <ExternalLink size={13} />
                  Register Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
