import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Users,
  Zap,
  Shield,
  ChevronDown,
  MessageCircle,
  Map,
  Trophy,
  Sparkles,
  Play,
  CheckCircle,
  Globe,
  BookOpen,
  Briefcase,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { LogoWithText } from "../components/Logo";

const features = [
  { icon: MessageCircle, title: "AI Mentor", desc: "Talk to an intelligent AI mentor trained on career data, available 24/7 for personalized guidance.", color: "#4F46E5" },
  { icon: Sparkles, title: "Future Simulations", desc: "Walk inside 3D immersive career environments before committing to your path.", color: "#7C3AED" },
  { icon: MessageCircle, title: "Future Self Chat", desc: "Have a conversation with your future self and get inspired by what you can become.", color: "#06B6D4" },
  { icon: Briefcase, title: "Job Simulations", desc: "Experience real work environments — coding, meetings, presentations, and interviews.", color: "#22C55E" },
  { icon: Map, title: "Career Roadmap", desc: "Get an AI-generated semester-wise roadmap with skills, courses, and certifications.", color: "#F59E0B" },
  { icon: Trophy, title: "Gamification", desc: "Earn XP, unlock achievements, climb leaderboards, and stay motivated.", color: "#EF4444" },
  { icon: BookOpen, title: "Scholarships Hub", desc: "Discover scholarships, internships, and hackathons tailored to your profile.", color: "#4F46E5" },
  { icon: Users, title: "Parent Convince Mode", desc: "Generate data-backed reports to help parents understand your career choice.", color: "#7C3AED" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Engineering Student, IIT Delhi",
    content: "FutureWalk completely changed how I think about my career. I simulated being a UX designer for a week and realized it was exactly what I wanted!",
    avatar: "PS",
    rating: 5,
    color: "#4F46E5",
  },
  {
    name: "Rahul Mehta",
    role: "Class 12 Student, Mumbai",
    content: "My parents weren't convinced about data science. I used the Parent Convince Report and they finally understood the salary potential and job market.",
    avatar: "RM",
    rating: 5,
    color: "#7C3AED",
  },
  {
    name: "Sneha Patel",
    role: "B.Com Student, Ahmedabad",
    content: "The AI Mentor feels like talking to a real career counselor. It knows my strengths better than I do. Got a scholarship through the hub too!",
    avatar: "SP",
    rating: 5,
    color: "#06B6D4",
  },
];

const faqs = [
  { q: "Is FutureWalk free to use?", a: "FutureWalk offers a free tier with access to basic features including AI mentor chat and career exploration. Premium plans unlock 3D simulations, unlimited roadmaps, and advanced analytics." },
  { q: "What age groups is FutureWalk designed for?", a: "FutureWalk is built for students from Class 9 through college (age 14-25), including engineering, commerce, and arts students. We also have dedicated parent and institution portals." },
  { q: "How does the AI Mentor work?", a: "Our AI Mentor is trained on career data, job market trends, and psychology of decision-making. It adapts to your profile, interests, skills, and goals to give hyper-personalized guidance." },
  { q: "Are the Future Simulations truly 3D?", a: "Yes! Our simulations use web-based 3D technology to create immersive career environments. You can walk through offices, labs, studios, and more — right in your browser." },
  { q: "Can schools and colleges use FutureWalk?", a: "Absolutely. We offer institution-tier plans that let schools and colleges give platform access to all their students with centralized analytics and counselor dashboards." },
];

const stats = [
  { value: "50K+", label: "Students" },
  { value: "200+", label: "Careers" },
  { value: "95%", label: "Satisfaction" },
  { value: "4.9★", label: "App Rating" },
];

export default function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0F172A", color: "#F8FAFC" }}>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-16 py-4"
        style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <LogoWithText size={36} />
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how" className="hover:text-white transition-colors">How it Works</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/login")} className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2">
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="btn-primary text-sm px-5 py-2.5"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24 px-6 lg:px-16">
        {/* Background orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full animate-orb" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full animate-orb delay-300" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="gradient-text font-semibold">Now in Beta — 50,000+ Students Joined</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Try Your Dream
            <br />
            <span className="gradient-text">Before You Chase It.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            FutureWalk is an AI-powered gamified EdTech platform that lets students{" "}
            <span className="text-slate-200">experience careers in immersive simulations</span>{" "}
            before making life-defining decisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => navigate("/signup")}
              className="btn-primary flex items-center gap-2 text-base px-8 py-4 glow-sm"
            >
              Start Your Journey
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors px-8 py-4 glass rounded-xl text-base"
            >
              <Play size={18} className="text-indigo-400" />
              View Demo
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4">
                <div className="font-display text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating cards preview */}
        <div className="relative z-10 max-w-5xl mx-auto mt-16 grid grid-cols-3 gap-4 hidden md:grid">
          {[
            { icon: "🤖", title: "AI Mentor", subtitle: "Available 24/7", color: "#4F46E5" },
            { icon: "🌐", title: "3D Simulation", subtitle: "Walk your future", color: "#7C3AED" },
            { icon: "🏆", title: "XP & Rewards", subtitle: "Level 12 Explorer", color: "#06B6D4" },
          ].map((card, i) => (
            <div
              key={card.title}
              className={`glass rounded-2xl p-6 animate-float ${i === 1 ? "mt-8" : ""}`}
              style={{ animationDelay: `${i * 400}ms` }}
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <div className="font-semibold text-white">{card.title}</div>
              <div className="text-sm text-slate-400">{card.subtitle}</div>
              <div className="w-16 h-1 rounded-full mt-3" style={{ background: card.color }} />
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-20 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-indigo-400 mb-4">
              ✦ HOW IT WORKS
            </div>
            <h2 className="font-display text-4xl font-bold mb-4">Your Journey in 4 Steps</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">From signup to career clarity in a beautifully designed experience.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Create Profile", desc: "Tell us about your interests, skills, marks, and goals in a guided onboarding.", icon: "👤" },
              { step: "02", title: "Meet Your Mentor", desc: "Pick an AI mentor personality and avatar that matches your vibe.", icon: "🤖" },
              { step: "03", title: "Explore & Simulate", desc: "Walk inside 3D career environments and talk to your future self.", icon: "🚀" },
              { step: "04", title: "Build Your Path", desc: "Get a personalized roadmap with courses, internships, and milestones.", icon: "🗺️" },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 z-0" style={{ background: "linear-gradient(90deg, rgba(79,70,229,0.4), transparent)" }} />
                )}
                <div className="glass rounded-2xl p-6 relative z-10 h-full hover:border-indigo-500/30 transition-all duration-300 career-card">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-xs font-bold gradient-text mb-2">{item.step}</div>
                  <div className="font-semibold text-white mb-2">{item.title}</div>
                  <div className="text-sm text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 lg:px-16" style={{ background: "rgba(30,41,59,0.4)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-cyan-400 mb-4">
              ✦ FEATURES
            </div>
            <h2 className="font-display text-4xl font-bold mb-4">Everything You Need to Own Your Future</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">A complete ecosystem built for career clarity and student success.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6 career-card group">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}22` }}
                >
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-violet-400 mb-4">
              ✦ TESTIMONIALS
            </div>
            <h2 className="font-display text-4xl font-bold mb-4">Students Love FutureWalk</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-6 career-card">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden rounded-3xl p-12 text-center"
            style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #06B6D4 100%)" }}
          >
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Ready to Walk Your Future?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Join 50,000+ students who have already discovered their dream career with FutureWalk.</p>
              <button
                onClick={() => navigate("/signup")}
                className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl text-base hover:shadow-2xl transition-all hover:scale-105"
              >
                Start Free Today — No Credit Card
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 lg:px-16" style={{ background: "rgba(30,41,59,0.3)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-green-400 mb-4">
              ✦ FAQ
            </div>
            <h2 className="font-display text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-white">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <LogoWithText size={32} />
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                AI-powered career discovery for the next generation of students.
              </p>
              <div className="flex gap-3 mt-4">
                {[ExternalLink, ExternalLink, ExternalLink].map((Icon, i) => (
                  <div key={i} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors">
                    <Icon size={14} />
                  </div>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Features", "Simulations", "AI Mentor", "Roadmap", "Pricing"] },
              { title: "For", links: ["Students", "Parents", "Schools", "Colleges", "Corporates"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-sm font-semibold text-white mb-3">{col.title}</div>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">© 2026 FutureWalk Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-600 hover:text-slate-400 transition-colors">Privacy</a>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-400 transition-colors">Terms</a>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
