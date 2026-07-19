import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { TrendingUp, Users, Shield, Download, Brain, CheckCircle } from "lucide-react";
import { Layout } from "../components/Layout";

const salaryGrowth = [
  { year: "2029", salary: 8 },
  { year: "2030", salary: 12 },
  { year: "2031", salary: 18 },
  { year: "2032", salary: 24 },
  { year: "2033", salary: 32 },
  { year: "2034", salary: 45 },
];

const demandData = [
  { role: "UX Designer", demand: 94, color: "#7C3AED" },
  { role: "Data Scientist", demand: 89, color: "#4F46E5" },
  { role: "Product Manager", demand: 81, color: "#06B6D4" },
  { role: "Software Eng.", demand: 96, color: "#22C55E" },
  { role: "Content Creator", demand: 72, color: "#F59E0B" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="custom-tooltip">
        <div className="text-white font-semibold">{label}</div>
        <div className="text-indigo-400 text-xs">₹{payload[0]?.value} LPA</div>
      </div>
    );
  }
  return null;
};

export default function ParentDashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="relative overflow-hidden rounded-3xl p-6"
          style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.25), rgba(6,182,212,0.15))", border: "1px solid rgba(79,70,229,0.3)" }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-white mb-1">Parent Dashboard</h1>
              <p className="text-slate-300 text-sm">AI-powered insights on Aryan's career journey and future outlook</p>
            </div>
            <button className="flex items-center gap-2 btn-primary py-2.5 px-5 text-sm">
              <Download size={15} />
              Download Report
            </button>
          </div>
        </div>

        {/* Student snapshot */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Career Match", value: "94%", icon: "🎯", desc: "UX Designer", color: "#22C55E" },
            { label: "Platform Score", value: "78/100", icon: "⭐", desc: "Above average", color: "#F59E0B" },
            { label: "Skills Mapped", value: "12", icon: "⚡", desc: "3 needs attention", color: "#4F46E5" },
            { label: "XP Earned", value: "2,840", icon: "🏆", desc: "Level 12 Explorer", color: "#7C3AED" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="text-2xl">{s.icon}</div>
                <div className="text-xs text-slate-500">{s.desc}</div>
              </div>
              <div className="font-display text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Salary growth chart */}
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-white">Salary Growth Projection</h2>
                <p className="text-xs text-slate-500">For UX Designer career path — 2029 to 2034</p>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl font-bold gradient-text">₹45 LPA</div>
                <div className="text-xs text-green-400">By 2034 (+462%)</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={salaryGrowth}>
                <defs>
                  <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="salary" stroke="#4F46E5" strokeWidth={2.5} fill="url(#salaryGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* AI Explanation */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-violet-400" />
              <h2 className="font-semibold text-white text-sm">AI Explanation</h2>
            </div>
            <div className="space-y-3">
              {[
                { point: "UX Design is in top 5 fastest growing careers in India with 40% YoY job growth.", color: "#22C55E" },
                { point: "Aryan's creativity score (92/100) and communication skills (90/100) are perfect for this field.", color: "#4F46E5" },
                { point: "Average salary starts at ₹8 LPA and grows to ₹30-45 LPA within 5-6 years.", color: "#F59E0B" },
                { point: "Top companies hiring: Google, Swiggy, Meesho, Zomato, global product companies.", color: "#06B6D4" },
              ].map((p, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: `${p.color}10`, border: `1px solid ${p.color}20` }}>
                  <CheckCircle size={14} style={{ color: p.color }} className="flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">{p.point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future demand + Parent convince */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Future demand */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-1">Future Job Demand</h2>
            <p className="text-xs text-slate-500 mb-4">Job market demand score (0-100) by 2030</p>
            <div className="space-y-3">
              {demandData.map((d) => (
                <div key={d.role} className="flex items-center gap-3">
                  <div className="w-28 flex-shrink-0 text-xs text-slate-400">{d.role}</div>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full progress-bar-fill" style={{ width: `${d.demand}%`, background: d.color }} />
                  </div>
                  <div className="text-xs font-bold w-10 text-right flex-shrink-0" style={{ color: d.color }}>{d.demand}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Parent convince report */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-indigo-400" />
              <h2 className="font-semibold text-white">Parent Convince Report</h2>
            </div>
            <div
              className="p-4 rounded-2xl mb-4"
              style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(6,182,212,0.1))", border: "1px solid rgba(79,70,229,0.25)" }}
            >
              <div className="text-sm text-slate-300 leading-relaxed">
                <span className="text-white font-semibold">Why UX Design is a great choice for Aryan:</span>
                <br /><br />
                Based on our AI analysis of Aryan's profile — creativity (92%), communication (90%), and design thinking (85%) — UX Design ranks as his #1 career match. The field offers job security, creative fulfillment, and exceptional salary growth.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Job Security", value: "High", color: "#22C55E" },
                { label: "Salary Growth", value: "462% in 8yrs", color: "#4F46E5" },
                { label: "Work-Life Balance", value: "Excellent", color: "#06B6D4" },
                { label: "Global Demand", value: "Rising", color: "#F59E0B" },
              ].map((s) => (
                <div key={s.label} className="p-3 glass rounded-xl text-center">
                  <div className="text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
            <button className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm">
              <Download size={15} />
              Generate Full Convince Report
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
