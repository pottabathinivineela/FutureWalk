import { useState } from "react";
import { Search, Bookmark, BookmarkCheck, Clock, ExternalLink, Filter } from "lucide-react";
import { Layout } from "../components/Layout";

const scholarships = [
  { id: 1, title: "Google Summer of Code 2026", org: "Google", amount: "₹3.5 - 5.5 Lakh", deadline: "2026-08-15", match: 92, category: "Tech", tags: ["Open Source", "Coding", "Summer"], color: "#4285F4", saved: false, desc: "Contribute to open source projects and get paid by Google. Open to students worldwide." },
  { id: 2, title: "Tata Scholarship Programme", org: "Tata Trusts", amount: "Full Tuition", deadline: "2026-07-30", match: 87, category: "Merit", tags: ["Need-based", "Engineering", "Merit"], color: "#EF4444", saved: true, desc: "Full scholarship for meritorious students pursuing engineering from Tata-supported institutions." },
  { id: 3, title: "Adobe Design Achievement Awards", org: "Adobe", amount: "₹8 Lakh + Mentorship", deadline: "2026-09-01", match: 95, category: "Design", tags: ["Design", "Creative", "Portfolio"], color: "#FF0000", saved: false, desc: "Celebrate student creativity and innovation in design, photography, and digital media." },
  { id: 4, title: "Infosys Foundation Scholarship", org: "Infosys", amount: "₹1.2 Lakh/year", deadline: "2026-10-15", match: 79, category: "Tech", tags: ["Engineering", "Technology", "Women in Tech"], color: "#007CC3", saved: false, desc: "Scholarship for meritorious students pursuing engineering, especially women in STEM." },
  { id: 5, title: "National Talent Search Exam", org: "NCERT / Govt. of India", amount: "₹1,250/month", deadline: "2026-08-30", match: 71, category: "Government", tags: ["Government", "All Streams", "National"], color: "#FF9800", saved: false, desc: "National scholarship for class 10 students with high academic excellence across all streams." },
  { id: 6, title: "Reliance Foundation Scholarship", org: "Reliance Foundation", amount: "₹6 Lakh total", deadline: "2026-09-20", match: 84, category: "Merit", tags: ["Need-based", "Undergraduate", "All India"], color: "#1976D2", saved: true, desc: "Supporting meritorious undergraduate students from economically disadvantaged backgrounds." },
];

const categories = ["All", "Tech", "Design", "Merit", "Government", "Sports", "Research"];

export default function ScholarshipHub() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState<number[]>([2, 6]);

  const filtered = scholarships.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.org.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || s.category === category;
    return matchSearch && matchCat;
  });

  const getDaysLeft = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Scholarship Hub</h1>
          <p className="text-slate-400 text-sm">Discover scholarships tailored to your profile and goals</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Available", value: "240+", icon: "🎓" },
            { label: "AI Matched", value: "18", icon: "✨" },
            { label: "Saved", value: saved.length.toString(), icon: "❤️" },
            { label: "Deadline Soon", value: "3", icon: "⚡" },
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

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search scholarships, organizations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="fw-input pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all ${category === cat ? "text-white" : "glass text-slate-400"}`}
                style={category === cat ? { background: "linear-gradient(135deg, #4F46E5, #7C3AED)" } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scholarship cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((s) => {
            const daysLeft = getDaysLeft(s.deadline);
            const isSaved = saved.includes(s.id);
            const urgent = daysLeft <= 30;
            return (
              <div key={s.id} className="glass rounded-2xl p-5 career-card flex flex-col">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${s.color}15` }}>
                    🎓
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm leading-snug">{s.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{s.org}</p>
                  </div>
                  <button
                    onClick={() => setSaved(isSaved ? saved.filter((id) => id !== s.id) : [...saved, s.id])}
                    className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    {isSaved ? <BookmarkCheck size={16} className="text-red-400" /> : <Bookmark size={16} />}
                  </button>
                </div>

                {/* Match + amount */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                    {s.match}% Match
                  </div>
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                    {s.amount}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">{s.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full glass text-slate-500">{tag}</span>
                  ))}
                </div>

                {/* Deadline */}
                <div
                  className="flex items-center justify-between p-2.5 rounded-xl mb-3"
                  style={{ background: urgent ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${urgent ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)"}` }}
                >
                  <div className="flex items-center gap-2">
                    <Clock size={13} className={urgent ? "text-red-400" : "text-slate-500"} />
                    <span className="text-xs text-slate-400">
                      Deadline: {new Date(s.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <span className={`text-xs font-bold ${urgent ? "text-red-400" : "text-slate-500"}`}>
                    {daysLeft}d left
                  </span>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white transition-all" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)` }}>
                  <ExternalLink size={13} />
                  Apply Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
