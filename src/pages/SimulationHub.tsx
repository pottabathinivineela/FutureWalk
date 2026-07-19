import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Bookmark, BookmarkCheck, TrendingUp, Star, Clock, Users } from "lucide-react";
import { Layout } from "../components/Layout";

const careers = [
  { id: 1, title: "UX Designer", category: "Design", match: 94, trend: "🔥 Hot", duration: "5 days", enrolled: "12.4K", rating: 4.9, salary: "₹12-30 LPA", desc: "Design products that people love. Walk through a real design studio, conduct user research, and prototype apps.", saved: false, color: "#7C3AED", emoji: "🎨" },
  { id: 2, title: "Data Scientist", category: "Technology", match: 89, trend: "📈 Rising", duration: "7 days", enrolled: "18.2K", rating: 4.8, salary: "₹15-45 LPA", desc: "Crunch data, build ML models, and present insights that drive business decisions at top tech companies.", saved: false, color: "#4F46E5", emoji: "📊" },
  { id: 3, title: "Product Manager", category: "Business", match: 81, trend: "⚡ Trending", duration: "5 days", enrolled: "9.8K", rating: 4.7, salary: "₹18-50 LPA", desc: "Own the product roadmap, work with engineers, designers, and stakeholders to ship world-class products.", saved: false, color: "#06B6D4", emoji: "🚀" },
  { id: 4, title: "Software Engineer", category: "Technology", match: 78, trend: "💚 Stable", duration: "7 days", enrolled: "24.6K", rating: 4.9, salary: "₹12-60 LPA", desc: "Build software that scales to millions. Solve complex algorithms and ship code at world-class companies.", saved: true, color: "#22C55E", emoji: "💻" },
  { id: 5, title: "Doctor (MBBS)", category: "Medical", match: 65, trend: "📊 Steady", duration: "10 days", enrolled: "8.2K", rating: 4.6, salary: "₹8-80 LPA", desc: "Experience the life of a doctor — from diagnosis to surgery. Walk through hospitals and clinics virtually.", saved: false, color: "#EF4444", emoji: "🏥" },
  { id: 6, title: "Financial Analyst", category: "Finance", match: 72, trend: "📈 Growing", duration: "5 days", enrolled: "7.1K", rating: 4.5, salary: "₹8-25 LPA", desc: "Analyze stocks, build financial models, and advise companies on investment decisions in real simulations.", saved: false, color: "#F59E0B", emoji: "📈" },
  { id: 7, title: "Architect", category: "Design", match: 69, trend: "🌟 Premium", duration: "8 days", enrolled: "4.3K", rating: 4.8, salary: "₹6-20 LPA", desc: "Design buildings that shape cities. Create blueprints, 3D models, and sustainable structures virtually.", saved: false, color: "#7C3AED", emoji: "🏛️" },
  { id: 8, title: "Content Creator", category: "Media", match: 83, trend: "🚀 Booming", duration: "3 days", enrolled: "15.7K", rating: 4.4, salary: "₹3-20 LPA", desc: "Build a brand, create viral content, and monetize your passion across YouTube, Instagram, and more.", saved: true, color: "#EC4899", emoji: "🎬" },
  { id: 9, title: "Cybersecurity Analyst", category: "Technology", match: 74, trend: "🔐 Critical", duration: "6 days", enrolled: "6.9K", rating: 4.7, salary: "₹10-35 LPA", desc: "Protect digital systems from attacks. Ethical hacking, threat analysis, and incident response simulations.", saved: false, color: "#06B6D4", emoji: "🔐" },
];

const categories = ["All", "Technology", "Design", "Business", "Medical", "Finance", "Media"];

export default function SimulationHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState<number[]>([4, 8]);
  const [tab, setTab] = useState<"all" | "saved" | "trending">("all");

  const filtered = careers.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    const matchTab = tab === "saved" ? saved.includes(c.id) : tab === "trending" ? c.match >= 80 : true;
    return matchSearch && matchCat && matchTab;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Future Simulation Hub</h1>
          <p className="text-slate-400 text-sm">Experience 200+ careers through immersive AI simulations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Available Careers", value: "200+", icon: "🎯", color: "#4F46E5" },
            { label: "Simulations Done", value: "12", icon: "🚀", color: "#7C3AED" },
            { label: "Saved Careers", value: saved.length.toString(), icon: "❤️", color: "#EF4444" },
            { label: "Top Match", value: "94%", icon: "⭐", color: "#F59E0B" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className="text-2xl">{s.icon}</div>
              <div>
                <div className="font-display text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search careers, skills, industries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="fw-input pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat ? "text-white" : "glass text-slate-400 hover:text-slate-200"}`}
                style={category === cat ? { background: "linear-gradient(135deg, #4F46E5, #7C3AED)" } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 glass rounded-xl w-fit">
          {(["all", "saved", "trending"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              {t === "all" ? "All Careers" : t === "saved" ? `Saved (${saved.length})` : "Trending"}
            </button>
          ))}
        </div>

        {/* Career cards grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((career) => {
            const isSaved = saved.includes(career.id);
            return (
              <div key={career.id} className="glass rounded-2xl overflow-hidden career-card group">
                {/* Card header */}
                <div className="p-5 pb-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                        style={{ background: `${career.color}20` }}
                      >
                        {career.emoji}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{career.title}</h3>
                        <span className="text-xs text-slate-500">{career.category}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSaved(isSaved ? saved.filter((s) => s !== career.id) : [...saved, career.id]);
                      }}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                    >
                      {isSaved ? <BookmarkCheck size={18} className="text-red-400" /> : <Bookmark size={18} />}
                    </button>
                  </div>

                  {/* Match + Trend */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ color: career.color, background: `${career.color}20` }}
                    >
                      {career.match}% Match
                    </div>
                    <span className="text-xs text-slate-500">{career.trend}</span>
                  </div>

                  {/* Match bar */}
                  <div className="w-full h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${career.match}%`, background: career.color }} />
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{career.desc}</p>
                </div>

                {/* Card footer */}
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-3 mb-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {career.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      {career.enrolled}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-amber-400" />
                      {career.rating}
                    </div>
                    <div className="flex items-center gap-1 ml-auto text-green-400 font-medium">
                      <TrendingUp size={12} />
                      {career.salary}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/simulation-entry")}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all group-hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg, ${career.color}, ${career.color}aa)` }}
                  >
                    Start Simulation →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <div className="text-slate-400">No careers found for "{search}"</div>
            <button onClick={() => { setSearch(""); setCategory("All"); }} className="mt-4 text-indigo-400 text-sm hover:text-indigo-300">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
