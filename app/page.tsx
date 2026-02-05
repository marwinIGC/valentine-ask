"use client";

import React, { useEffect, useMemo, useState } from "react";

type Screen = 1 | 2 | 3 | 4;

type ConfettiPiece = {
  id: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  color: string;
  round: boolean;
};

type DateOption = {
  id: string;
  label: string;
};

const DATE_OPTIONS: DateOption[] = [
  { id: "movie", label: "Movie night together 🎬" },
  { id: "dinner", label: "Dinner on video call 🍽" },
  { id: "game", label: "Game night 🎮" },
];

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [screen, setScreen] = useState<Screen>(1);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hearts = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: `heart-${i}`,
      left: (i * 7.5) % 100,
      size: 10 + (i % 5) * 4,
      duration: 10 + (i % 5) * 2,
      delay: (i % 6) * 1.1,
      opacity: 0.12 + (i % 3) * 0.05,
    }));
  }, []);

  const triggerConfetti = () => {
    if (!mounted) return;

    const colors = ["#fda4af", "#fb7185", "#fecdd3", "#f43f5e", "#be123c"];
    const pieces: ConfettiPiece[] = Array.from({ length: 80 }).map((_, i) => ({
      id: `c-${Date.now()}-${i}`,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 6) + 6,
      duration: 2.2 + Math.random() * 0.8,
      delay: Math.random() * 0.3,
      rotation: Math.random() * 360,
      color: colors[i % colors.length],
      round: Math.random() > 0.5,
    }));

    setConfetti(pieces);

    // Cleanup to prevent memory leaks
    setTimeout(() => {
      setConfetti([]);
    }, 3200);
  };

  const goToScreen = (next: Screen) => {
    setScreen(next);
  };

  const handleYes = () => {
    triggerConfetti();
    setTimeout(() => {
      goToScreen(4);
    }, 450);
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#2a0b0f] via-[#4b0f1b] to-[#1a060a] text-white">
      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0.6))]" />

      {/* Floating hearts background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="heart"
            style={{
              left: `${h.left}%`,
              width: `${h.size}px`,
              height: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              opacity: h.opacity,
            }}
            aria-hidden
          />
        ))}
      </div>

      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((p) => (
          <span
            key={p.id}
            className="confetti-piece"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              borderRadius: p.round ? "9999px" : "2px",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              transform: `rotate(${p.rotation}deg)`,
            }}
            aria-hidden
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="relative w-full max-w-md sm:max-w-lg">
          {/* Screen 1 */}
          <section
            className={`absolute inset-0 transition-all duration-500 ${
              screen === 1
                ? "opacity-100 translate-y-0"
                : "pointer-events-none opacity-0 translate-y-4"
            }`}
            aria-hidden={screen !== 1}
          >
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/30 bg-rose-200/10 px-3 py-1 text-xs font-semibold tracking-wide text-rose-100">
                <span>Made with love 💗</span>
              </div>

              <div className="mt-5 space-y-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Hey love… 💕
                </h1>
                <p className="text-sm leading-relaxed text-rose-100/90 sm:text-base">
                  Even across the miles, you’re the part of my day that feels
                  like home. I carry you with me, always.
                </p>
              </div>

              <button
                onClick={() => goToScreen(2)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 px-5 py-3 text-base font-semibold text-white shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-rose-200/70 active:scale-[0.98]"
                aria-label="Continue to our story"
              >
                Continue 💗
              </button>
            </div>
          </section>

          {/* Screen 2 */}
          <section
            className={`absolute inset-0 transition-all duration-500 ${
              screen === 2
                ? "opacity-100 translate-y-0"
                : "pointer-events-none opacity-0 translate-y-4"
            }`}
            aria-hidden={screen !== 2}
          >
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold sm:text-3xl">
                  Our little story 💞
                </h2>
                <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-rose-100/80">
                  2/4
                </span>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-relaxed text-rose-100/90 sm:p-5">
                <p className="max-w-[36ch] sm:max-w-none">
                  I knew you for a while before we really talked.
                  <br />
                  We were always around each other, in the same calls, the same
                  space…
                  <br />
                  and I always thought you were cute, even if I never said it.
                </p>
                <p className="mt-3 max-w-[36ch] sm:max-w-none">
                  Then one day, you joined me in a game.
                  <br />
                  I saw your name pop up, walked over, and said “heyyyy Zieee”…
                  <br />
                  and you smiled back with “hiiii”.
                </p>
                <p className="mt-3 max-w-[36ch] sm:max-w-none">
                  From there, everything just felt easy.
                  <br />
                  We joked, we messed around, we talked about random things…
                  <br />
                  and somehow, the conversations started getting deeper without
                  us even noticing.
                </p>
                <p className="mt-3 max-w-[36ch] sm:max-w-none">
                  You told me later you wanted to call me but were too shy.
                  <br />
                  I told you you could call me anytime.
                  <br />
                  And when we finally did… we didn’t stop.
                </p>
                <p className="mt-3 max-w-[36ch] sm:max-w-none">
                  Days turned into hours, hours into nights.
                  <br />
                  I started liking you more than I expected.
                  <br />
                  And when I finally told you how I felt… and you said you felt
                  the same —
                  <br />
                  I don’t think I’ve ever smiled that much.
                </p>
                <p className="mt-3 max-w-[36ch] sm:max-w-none">
                  Now here we are.
                  <br />
                  Talking every day. Choosing each other without even asking.
                  <br />
                  And even with the distance, all I can think about is meeting
                  you,
                  <br />
                  hugging you, and finally giving you that kiss.
                </p>
                <p className="mt-3 max-w-[36ch] sm:max-w-none">
                  I just want you to know one thing —
                  <br />
                  I’m always here for you.
                  <br />
                  And Zie… I love you. 💗
                </p>
              </div>

              <button
                onClick={() => goToScreen(3)}
                className="mt-6 w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-base font-semibold text-rose-50 backdrop-blur-sm transition-transform focus:outline-none focus:ring-2 focus:ring-rose-200/70 active:scale-[0.98]"
                aria-label="Continue to the question"
              >
                One more thing… 💞
              </button>
            </div>
          </section>

          {/* Screen 3 */}
          <section
            className={`absolute inset-0 transition-all duration-500 ${
              screen === 3
                ? "opacity-100 translate-y-0"
                : "pointer-events-none opacity-0 translate-y-4"
            }`}
            aria-hidden={screen !== 3}
          >
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-2xl sm:p-8">
              <h2 className="text-3xl font-extrabold text-rose-50 sm:text-4xl">
                Will you be my Valentine? 💘
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={handleYes}
                  className="w-full rounded-2xl bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 px-5 py-3 text-base font-semibold text-white shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-rose-200/70 active:scale-[0.98]"
                  aria-label="Yes, be my Valentine"
                >
                  Yes 💖
                </button>
                <button
                  onClick={handleYes}
                  className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-base font-semibold text-rose-50 backdrop-blur-sm transition-transform focus:outline-none focus:ring-2 focus:ring-rose-200/70 active:scale-[0.98]"
                  aria-label="Of course, be my Valentine"
                >
                  Of course 💖
                </button>
              </div>
            </div>
          </section>

          {/* Screen 4 */}
          <section
            className={`absolute inset-0 transition-all duration-500 ${
              screen === 4
                ? "opacity-100 translate-y-0"
                : "pointer-events-none opacity-0 translate-y-4"
            }`}
            aria-hidden={screen !== 4}
          >
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  Yessss 😭💖
                </h2>
                <p className="text-sm text-rose-100/90 sm:text-base">
                  I’m the luckiest person alive.
                </p>
                <p className="text-xs text-rose-100/70 sm:text-sm">
                  Screenshot this and send it to me 😌
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-rose-50">
                  So… how should we celebrate? 💗
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-3">
                  {DATE_OPTIONS.map((option) => {
                    const active = selectedDate?.id === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedDate(option)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-transform focus:outline-none focus:ring-2 focus:ring-rose-200/70 active:scale-[0.98] ${
                          active
                            ? "border-rose-200/60 bg-rose-200/20 text-rose-50"
                            : "border-white/15 bg-white/10 text-rose-100/90"
                        }`}
                        aria-label={`Select ${option.label}`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-center text-sm text-rose-100/90">
                    <div className="text-base font-semibold text-rose-50">
                      Perfect. It’s a date 💖
                    </div>
                    <div className="mt-1 text-sm text-rose-100/80">
                      {selectedDate.label}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Spacer to keep container height */}
          <div className="invisible">
            <div className="rounded-3xl p-6 sm:p-8">
              <h2 className="text-3xl">.</h2>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .heart {
          position: absolute;
          background: rgba(255, 255, 255, 0.12);
          transform: rotate(45deg);
          border-radius: 3px;
          animation: floatHeart linear infinite;
        }
        .heart::before,
        .heart::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 50%;
        }
        .heart::before {
          top: -50%;
          left: 0;
        }
        .heart::after {
          left: -50%;
          top: 0;
        }

        @keyframes floatHeart {
          0% {
            transform: translateY(120vh) rotate(45deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-20vh) rotate(45deg) scale(1.1);
            opacity: 0;
          }
        }

        .confetti-piece {
          position: absolute;
          top: -10px;
          animation-name: confettiFall;
          animation-timing-function: ease-in;
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
