export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      {/* Arc */}
      <path
        d="M 50 8 A 42 42 0 1 1 10 60"
        stroke="url(#arcGrad)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* F path / road */}
      <path
        d="M 22 75 L 35 55 L 48 42 L 60 50 L 72 38 L 78 28"
        stroke="url(#logoGrad)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* F top bar */}
      <path d="M 28 38 L 62 38" stroke="url(#logoGrad)" strokeWidth="5" strokeLinecap="round" />
      {/* F middle bar */}
      <path d="M 28 50 L 50 50" stroke="url(#logoGrad)" strokeWidth="4" strokeLinecap="round" />
      {/* F vertical */}
      <path d="M 28 28 L 28 72" stroke="url(#logoGrad)" strokeWidth="5" strokeLinecap="round" />
      {/* Person silhouette */}
      <circle cx="40" cy="66" r="4" fill="url(#logoGrad)" />
      <path
        d="M 40 70 L 38 80 L 36 88 M 40 70 L 42 80 L 44 88 M 38 73 L 44 73"
        stroke="url(#logoGrad)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Stars */}
      <circle cx="72" cy="18" r="2" fill="#06B6D4" opacity="0.9" />
      <circle cx="82" cy="30" r="1.5" fill="#7C3AED" opacity="0.8" />
      <circle cx="65" cy="12" r="1.5" fill="#4F46E5" opacity="0.7" />
    </svg>
  );
}

export function LogoWithText({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <Logo size={size} />
      <span
        className="font-display font-bold"
        style={{
          fontSize: size * 0.6,
          background: "linear-gradient(135deg, #4F46E5, #7C3AED, #06B6D4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        FutureWalk
      </span>
    </div>
  );
}
