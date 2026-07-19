import { useState } from "react";
import { Bell, Shield, Palette, User, Globe, LogOut, ChevronRight, Moon, Sun } from "lucide-react";
import { Layout } from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [notifs, setNotifs] = useState({ email: true, push: true, deadline: true, mentor: false });
  const [privacy, setPrivacy] = useState({ profile: "public", data: true });

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className="w-11 h-6 rounded-full transition-all relative flex-shrink-0"
      style={{ background: value ? "linear-gradient(135deg, #4F46E5, #7C3AED)" : "rgba(255,255,255,0.1)" }}
    >
      <div className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all" style={{ left: value ? "calc(100% - 18px)" : "4px" }} />
    </button>
  );

  const sections = [
    {
      id: "account",
      title: "Account",
      icon: User,
      color: "#4F46E5",
      content: (
        <div className="space-y-4">
          {[
            { label: "Full Name", value: "{userData?.name}" },
            { label: "Email", value: "{userData?.email}" },
            { label: "Grade / Year", value: "Class 12" },
            { label: "School", value: "St. Xavier's College, Mumbai" },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between py-2 border-b border-white/5">
              <div>
                <div className="text-sm text-slate-400">{f.label}</div>
                <div className="text-sm font-medium text-white mt-0.5">{f.value}</div>
              </div>
              <button className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors">Edit</button>
            </div>
          ))}
          <button className="w-full py-2.5 mt-2 glass rounded-xl text-sm text-slate-300 hover:text-white transition-all">
            Change Password
          </button>
        </div>
      ),
    },
    {
      id: "appearance",
      title: "Appearance",
      icon: Palette,
      color: "#7C3AED",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white flex items-center gap-2">
                {darkMode ? <Moon size={16} className="text-indigo-400" /> : <Sun size={16} className="text-amber-400" />}
                {darkMode ? "Dark Mode" : "Light Mode"}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Current appearance setting</div>
            </div>
            <Toggle value={darkMode} onChange={setDarkMode} />
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-3">Accent Color</div>
            <div className="flex gap-3">
              {["#4F46E5", "#7C3AED", "#06B6D4", "#22C55E", "#F59E0B", "#EF4444"].map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border-2 transition-all"
                  style={{ background: color, borderColor: color === "#4F46E5" ? "white" : "transparent" }}
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      color: "#06B6D4",
      content: (
        <div className="space-y-4">
          {[
            { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
            { key: "push", label: "Push Notifications", desc: "Browser push alerts" },
            { key: "deadline", label: "Deadline Reminders", desc: "Scholarship and hackathon deadlines" },
            { key: "mentor", label: "Mentor Tips", desc: "Daily tips from your AI mentor" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white">{item.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
              </div>
              <Toggle value={(notifs as any)[item.key]} onChange={(v) => setNotifs({ ...notifs, [item.key]: v })} />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: Shield,
      color: "#22C55E",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Profile Visibility</div>
              <div className="text-xs text-slate-500">Who can see your profile</div>
            </div>
            <select
              className="fw-input fw-select text-xs py-1.5 px-3 w-28"
              value={privacy.profile}
              onChange={(e) => setPrivacy({ ...privacy, profile: e.target.value })}
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Data Analytics</div>
              <div className="text-xs text-slate-500">Allow AI to analyze your behavior for better recommendations</div>
            </div>
            <Toggle value={privacy.data} onChange={(v) => setPrivacy({ ...privacy, data: v })} />
          </div>
          <button className="w-full py-2.5 mt-2 rounded-xl text-sm font-medium transition-all" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }}>
            Delete Account
          </button>
        </div>
      ),
    },
  ];

  const [openSection, setOpenSection] = useState<string>("account");

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Settings</h1>
          <p className="text-slate-400 text-sm">Manage your account, preferences, and privacy</p>
        </div>

        {sections.map((section) => {
          const Icon = section.icon;
          const isOpen = openSection === section.id;
          return (
            <div key={section.id} className="glass rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center gap-3 p-5 hover:bg-white/5 transition-colors text-left"
                onClick={() => setOpenSection(isOpen ? "" : section.id)}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${section.color}20` }}>
                  <Icon size={18} style={{ color: section.color }} />
                </div>
                <span className="font-medium text-white flex-1">{section.title}</span>
                <ChevronRight size={16} className={`text-slate-500 transition-transform ${isOpen ? "rotate-90" : ""}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-white/5 pt-4">
                  {section.content}
                </div>
              )}
            </div>
          );
        })}

        {/* Logout */}
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl transition-all text-sm font-medium"
          style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.15)" }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </Layout>
  );
}
