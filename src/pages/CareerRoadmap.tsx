import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, ExternalLink, Award, Briefcase, BookOpen, Code2, TrendingUp } from "lucide-react";
import { Layout } from "../components/Layout";

const roadmap = [
  {
    semester: "Now (2026)",
    label: "Foundation",
    color: "#4F46E5",
    completed: true,
    items: {
      skills: ["Design Thinking", "Basic HTML/CSS", "Psychology Basics"],
      projects: ["Personal portfolio website", "UI mockup for app idea"],
      courses: ["Google UX Design Certificate (Coursera)", "Figma for Beginners"],
      certs: ["Google UX Design Certificate"],
      internships: [],
    },
  },
  {
    semester: "2027 — 1st Year",
    label: "Exploration",
    color: "#7C3AED",
    completed: false,
    items: {
      skills: ["Figma Mastery", "User Research", "Information Architecture"],
      projects: ["Redesign an existing app (case study)", "User interview project"],
      courses: ["Interaction Design (Coursera)", "UX Research Methods"],
      certs: ["Nielsen Norman UX Certification"],
      internships: ["Summer internship at design studio or startup"],
    },
  },
  {
    semester: "2028 — 2nd Year",
    label: "Specialization",
    color: "#06B6D4",
    completed: false,
    items: {
      skills: ["Motion Design", "Prototyping", "A/B Testing", "Data-informed Design"],
      projects: ["Full product redesign (end-to-end)", "Design system creation"],
      courses: ["Advanced Prototyping in Framer", "UX Analytics"],
      certs: ["AWS Cloud Practitioner (for SaaS context)"],
      internships: ["6-month internship at mid-size tech company"],
    },
  },
  {
    semester: "2029 — Entry Level",
    label: "First Role",
    color: "#22C55E",
    completed: false,
    items: {
      skills: ["Cross-functional Collaboration", "Stakeholder Management", "Design Systems at Scale"],
      projects: ["Enterprise product design", "Design documentation"],
      courses: ["Management for Designers", "Product Sense (Lenny's Newsletter)"],
      certs: [],
      internships: [],
    },
  },
];

const TabIcon = ({ type }: { type: string }) => {
  const icons: Record<string, any> = { skills: Code2, projects: Briefcase, courses: BookOpen, certs: Award, internships: TrendingUp };
  const Icon = icons[type] || BookOpen;
  return <Icon size={14} />;
};

export default function CareerRoadmap() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">Career Roadmap</h1>
            <p className="text-slate-400 text-sm">Your AI-generated path to becoming a UX Designer</p>
          </div>
          <div className="glass rounded-xl px-4 py-2 text-sm">
            <div className="text-xs text-slate-500 mb-0.5">Target Career</div>
            <div className="font-semibold gradient-text">UX Designer</div>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Timeline", value: "3 Years", icon: "⏱️" },
            { label: "Milestones", value: "24", icon: "🎯" },
            { label: "Courses", value: "8", icon: "📚" },
            { label: "Completed", value: "25%", icon: "✅" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-display text-xl font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Roadmap timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-8 bottom-8 w-0.5 hidden md:block" style={{ background: "linear-gradient(to bottom, #4F46E5, rgba(79,70,229,0.1))" }} />

          <div className="space-y-6">
            {roadmap.map((stage, stageIdx) => (
              <div key={stageIdx} className="md:pl-16 relative">
                {/* Dot */}
                <div
                  className="hidden md:flex absolute left-0 w-10 h-10 rounded-full items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${stage.color}, ${stage.color}aa)`, boxShadow: `0 0 20px ${stage.color}60`, top: "1rem" }}
                >
                  {stage.completed ? <CheckCircle size={18} className="text-white" /> : <Clock size={18} className="text-white" />}
                </div>

                <div
                  className="glass rounded-2xl overflow-hidden"
                  style={stage.completed ? { border: `1px solid ${stage.color}40` } : {}}
                >
                  {/* Stage header */}
                  <div className="flex items-center gap-4 p-5 border-b border-white/5" style={{ background: `linear-gradient(135deg, ${stage.color}12, transparent)` }}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg font-bold text-white">{stage.semester}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{ color: stage.color, background: `${stage.color}20` }}
                        >
                          {stage.label}
                        </span>
                        {stage.completed && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-semibold flex items-center gap-1">
                            <CheckCircle size={10} />
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stage content */}
                  <div className="p-5 grid md:grid-cols-2 gap-4">
                    {Object.entries(stage.items).map(([type, items]) => {
                      if (items.length === 0) return null;
                      return (
                        <div key={type}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ color: stage.color }}>
                              <TabIcon type={type} />
                            </div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{type}</span>
                          </div>
                          <ul className="space-y-1.5">
                            {(items as string[]).map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: stage.color }} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="btn-primary flex items-center gap-2 flex-1 justify-center py-3">
            <ExternalLink size={16} />
            Export as PDF
          </button>
          <button className="glass rounded-xl px-6 py-3 text-slate-300 hover:text-white text-sm transition-all">
            Share Roadmap
          </button>
        </div>
      </div>
    </Layout>
  );
}
