import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";

import { auth, googleProvider } from "../firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Shield } from "lucide-react";
import { LogoWithText } from "../components/Logo";

interface AuthProps {
  mode: "student-login" | "student-signup" | "admin-login";
}

export default function Auth({ mode }: AuthProps) {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPass: "" });

  const isLogin = mode === "student-login" || mode === "admin-login";
  const isAdmin = mode === "admin-login";

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (isAdmin) {
      navigate("/admin");
      return;
    }

    if (isLogin) {
      await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      navigate("/dashboard");
    } else {
      if (form.password !== form.confirmPass) {
        alert("Passwords do not match");
        return;
      }

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

      await updateProfile(userCredential.user, {
        displayName: form.name,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: form.name,
        email: form.email,
        xp: 0,
        coins: 0,
        level: 1,
        streak: 0,
        createdAt: new Date(),
      });

      navigate("/onboarding");
    }
  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden p-12"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}
      >
        {/* Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full animate-orb" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full animate-orb delay-300" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative z-10">
          <LogoWithText size={40} />
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
              {isAdmin ? "Admin Control Center" : "Your Career Journey Starts Here"}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {isAdmin
                ? "Manage students, careers, analytics and platform settings from one powerful dashboard."
                : "Join 50,000+ students who are already experiencing their future careers through AI-powered simulations."}
            </p>
          </div>

          <div className="space-y-4">
            {(isAdmin ? [
              { icon: Shield, text: "Full platform control", color: "#4F46E5" },
              { icon: Sparkles, text: "Real-time analytics", color: "#7C3AED" },
              { icon: User, text: "User management", color: "#06B6D4" },
            ] : [
              { icon: Sparkles, text: "AI Mentor available 24/7", color: "#4F46E5" },
              { icon: ArrowRight, text: "3D career simulations", color: "#7C3AED" },
              { icon: User, text: "Personalized roadmaps", color: "#06B6D4" },
            ]).map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}22` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <span className="text-slate-300 text-sm">{text}</span>
              </div>
            ))}
          </div>

          {/* Floating cards */}
          <div className="flex gap-3">
            <div className="glass rounded-2xl p-4 animate-float">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-xs text-slate-400">XP Rewards</div>
              <div className="text-sm font-bold gradient-text">2,840 XP</div>
            </div>
            <div className="glass rounded-2xl p-4 animate-float delay-200">
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-xs text-slate-400">Achievement</div>
              <div className="text-sm font-bold text-amber-400">Explorer</div>
            </div>
            <div className="glass rounded-2xl p-4 animate-float delay-400">
              <div className="text-2xl mb-1">🚀</div>
              <div className="text-xs text-slate-400">Simulations</div>
              <div className="text-sm font-bold gradient-text">12 Done</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-slate-600 text-sm">
          © 2026 FutureWalk Technologies. All rights reserved.
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <LogoWithText size={36} />
          </div>

          <div className="glass rounded-3xl p-8">
            <div className="mb-8">
              <h1 className="font-display text-2xl font-bold text-white mb-2">
                {isAdmin ? "Admin Login" : isLogin ? "Welcome back!" : "Create your account"}
              </h1>
              <p className="text-slate-400 text-sm">
                {isAdmin
                  ? "Sign in to your admin dashboard"
                  : isLogin
                  ? "Sign in to continue your journey"
                  : "Start your career discovery journey for free"}
              </p>
            </div>

            {/* Social login (non-admin) */}
            {!isAdmin && (
              <>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
  onClick={async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      await setDoc(
        doc(db, "users", result.user.uid),
        {
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          level: 1,
          xp: 0,
          coins: 0,
        },
        { merge: true }
      );

      navigate("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  }}
  className="flex items-center justify-center gap-2 py-2.5 glass rounded-xl text-sm text-slate-300 hover:bg-white/10 transition-all"
>
  <span>🔵</span> Google
</button>
                  <button className="flex items-center justify-center gap-2 py-2.5 glass rounded-xl text-sm text-slate-300 hover:bg-white/10 transition-all">
                    <span>📘</span> Facebook
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-slate-500">or continue with email</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="fw-input pl-10"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder={isAdmin ? "admin@futurewalk.ai" : "you@example.com"}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="fw-input pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="fw-input pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={form.confirmPass}
                    onChange={(e) => setForm({ ...form, confirmPass: e.target.value })}
                    className="fw-input pl-10"
                    required
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm mt-2">
                {isAdmin ? "Sign in to Admin" : isLogin ? "Sign In" : "Create Account"}
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              {isAdmin ? (
                <span>
                  Student?{" "}
                  <button onClick={() => navigate("/login")} className="text-indigo-400 hover:text-indigo-300">
                    Go to student login
                  </button>
                </span>
              ) : isLogin ? (
                <span>
                  Don't have an account?{" "}
                  <button onClick={() => navigate("/signup")} className="text-indigo-400 hover:text-indigo-300">
                    Sign up free
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <button onClick={() => navigate("/login")} className="text-indigo-400 hover:text-indigo-300">
                    Sign in
                  </button>
                </span>
              )}
            </div>

            {!isAdmin && (
              <div className="mt-6 pt-6 border-t border-white/5 text-center">
                <button onClick={() => navigate("/admin-login")} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                  Admin Login →
                </button>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-slate-600 mt-6">
            By continuing, you agree to our{" "}
            <a href="#" className="text-slate-500 hover:text-slate-400">Terms</a> and{" "}
            <a href="#" className="text-slate-500 hover:text-slate-400">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
