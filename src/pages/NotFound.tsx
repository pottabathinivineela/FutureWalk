import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <div className="font-display text-[150px] font-black leading-none animate-float" style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl animate-float delay-200">🚀</div>
        </div>
      </div>
      <h1 className="font-display text-2xl font-bold text-white mb-3">Lost in the Future</h1>
      <p className="text-slate-400 text-base max-w-sm mb-8 leading-relaxed">
        Looks like this page doesn't exist yet — but your future does. Let's get you back on track.
      </p>
      <div className="flex gap-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-6 py-3 glass rounded-xl text-sm text-slate-300 hover:text-white transition-all">
          <ArrowLeft size={16} />
          Go Back
        </button>
        <button onClick={() => navigate("/")} className="btn-primary flex items-center gap-2 px-6 py-3 text-sm">
          <Home size={16} />
          Home
        </button>
      </div>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-2 border-indigo-400/20 border-t-indigo-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">🚀</div>
      </div>
      <div className="text-center">
        <div className="font-display text-xl font-bold gradient-text mb-1">Loading FutureWalk</div>
        <div className="text-sm text-slate-500">Preparing your experience...</div>
      </div>
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full animate-shimmer" style={{ width: "60%", background: "linear-gradient(90deg, #4F46E5, #7C3AED)" }} />
      </div>
    </div>
  );
}

export function Maintenance() {
  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="text-8xl mb-6 animate-float">🔧</div>
      <h1 className="font-display text-3xl font-bold text-white mb-3">Under Maintenance</h1>
      <p className="text-slate-400 text-base max-w-sm mb-6 leading-relaxed">
        We're working on making FutureWalk even better. We'll be back shortly!
      </p>
      <div className="glass rounded-2xl p-5 max-w-sm w-full text-left">
        <div className="text-sm text-slate-400 mb-2">Estimated time</div>
        <div className="font-display text-2xl font-bold gradient-text">~2 hours</div>
        <div className="text-xs text-slate-600 mt-1">Started: July 18, 2026 at 10:00 PM IST</div>
      </div>
    </div>
  );
}
