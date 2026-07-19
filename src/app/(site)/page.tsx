"use client";

import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Small helper: animated counter that fires once when scrolled into */
/*  view — no external libraries, just IntersectionObserver.          */
/* ------------------------------------------------------------------ */
function Counter({
  target,
  suffix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll wrapper                                          */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const categories = [
  { name: "Electronics", emoji: "📱", gradient: "from-blue-500 to-cyan-400" },
  { name: "Fashion", emoji: "👕", gradient: "from-pink-500 to-rose-400" },
  { name: "Grocery", emoji: "🛒", gradient: "from-emerald-500 to-lime-400" },
  { name: "Home & Living", emoji: "🛋️", gradient: "from-amber-500 to-orange-400" },
  { name: "Mobiles", emoji: "📲", gradient: "from-violet-500 to-purple-400" },
  { name: "Books & Stationery", emoji: "📚", gradient: "from-teal-500 to-emerald-400" },
  { name: "Beauty & Care", emoji: "💄", gradient: "from-fuchsia-500 to-pink-400" },
  { name: "Sports & Fitness", emoji: "🏸", gradient: "from-sky-500 to-blue-400" },
];

const features = [
  {
    title: "Same-Day Local Delivery",
    desc: "Orders placed before 4 PM reach every corner of Bihiya Chauraha the same day.",
    icon: "⚡",
  },
  {
    title: "100% Genuine Products",
    desc: "Every product verified and quality-checked before it reaches your doorstep.",
    icon: "✅",
  },
  {
    title: "Secure Payments",
    desc: "UPI, Cards, COD & Net Banking — bank-grade encryption on every transaction.",
    icon: "🔒",
  },
  {
    title: "24/7 Local Support",
    desc: "Talk to our Bihiya-based support team in Hindi, Bhojpuri or English.",
    icon: "🎧",
  },
  {
    title: "Easy 7-Day Returns",
    desc: "Not satisfied? Free pickup and instant refund, no questions asked.",
    icon: "↩️",
  },
  {
    title: "Best Price Guarantee",
    desc: "Find it cheaper elsewhere in Bihar? We'll match it, guaranteed.",
    icon: "💰",
  },
];

const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "Shopkeeper, Bihiya",
    text: "Sabse tez delivery aur asli maal. BTC Balajee ne local shopping ka experience hi badal diya.",
    rating: 5,
  },
  {
    name: "Priya Singh",
    role: "College Student",
    text: "Mobile order kiya tha, next day mil gaya. Price bhi Amazon se kam tha. Highly recommended!",
    rating: 5,
  },
  {
    name: "Anil Yadav",
    role: "Local Business Owner",
    text: "Bulk order ke liye best platform. Support team bahut helpful hai, Bhojpuri me baat kar sakte hai.",
    rating: 5,
  },
];

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Custom keyframe animations — Tailwind-only project, so defined inline */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.1); }
          66% { transform: translate(-25px,25px) scale(0.95); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-blob { animation: blob 9s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
        }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-slow { animation: float 7s ease-in-out infinite; }
        .shimmer-text {
          background: linear-gradient(90deg,#fbbf24 0%,#fff 50%,#fbbf24 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <main className="relative overflow-hidden bg-[#05060a]">
        {/* ============ NAVBAR ============ */}
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#05060a]/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 font-black text-black shadow-lg shadow-amber-500/30">
                BB
              </div>
              <span className="text-lg font-bold tracking-tight">
                BTC <span className="text-amber-400">Balajee</span>
              </span>
            </div>

            <div className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
              <a href="#categories" className="transition hover:text-amber-400">
                Categories
              </a>
              <a href="#features" className="transition hover:text-amber-400">
                Why Us
              </a>
              <a href="#testimonials" className="transition hover:text-amber-400">
                Reviews
              </a>
              <a href="#contact" className="transition hover:text-amber-400">
                Contact
              </a>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <button className="text-sm font-medium text-white/70 transition hover:text-white">
                Sign In
              </button>
              <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-amber-500/30 transition hover:shadow-amber-500/50">
                <span className="relative z-10">Get Started</span>
              </button>
            </div>

            <button
              className="text-2xl md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {menuOpen && (
            <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-6 md:hidden">
              {["Categories", "Why Us", "Reviews", "Contact"].map((item) => {
                const anchor = item.toLowerCase().replace(/\s+/g, "-");
                return (
                  <a key={item} href={`#${anchor}`} className="text-white/80">
                    {item}
                  </a>
                );
              })}
              <button className="mt-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 py-2 font-semibold text-black">
                Get Started
              </button>
            </div>
          )}
        </nav>

        {/* ============ HERO ============ */}
        <section className="relative flex min-h-screen items-center justify-center px-6 pt-24">
          {/* animated blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-blob absolute -top-20 left-10 h-96 w-96 rounded-full bg-amber-500/30 mix-blend-screen blur-3xl" />
            <div className="animation-delay-2000 animate-blob absolute top-40 right-10 h-96 w-96 rounded-full bg-orange-600/20 mix-blend-screen blur-3xl" />
            <div className="animation-delay-4000 animate-blob absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-yellow-400/20 mix-blend-screen blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#05060a_80%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-300">
                🇮🇳 Made for Bihar &nbsp;•&nbsp; Serving Bihiya Chauraha & Beyond
              </span>
            </Reveal>

            <Reveal delay={150}>
              <h1 className="mt-8 text-5xl leading-tight font-black tracking-tight sm:text-6xl md:text-7xl">
                Bihar's Most <span className="shimmer-text">Trusted</span>
                <br />
                E-Commerce Destination
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
                From electronics to everyday essentials — BTC Balajee brings genuine products,
                unbeatable prices, and lightning-fast local delivery straight to your doorstep in
                Bihiya Chauraha.
              </p>
            </Reveal>

            <Reveal delay={450}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 font-bold text-black shadow-2xl shadow-amber-500/40 transition-transform hover:scale-105 sm:w-auto">
                  <span className="relative z-10">Start Shopping Now →</span>
                  <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
                <button className="w-full rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/10 sm:w-auto">
                  Explore Categories
                </button>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { n: 50000, s: "+", l: "Happy Customers" },
                  { n: 12000, s: "+", l: "Products Listed" },
                  { n: 25, s: "+", l: "Cities Covered" },
                  { n: 4.9, s: "★", l: "Average Rating" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-black text-amber-400 sm:text-4xl">
                      {stat.l === "Average Rating" ? (
                        "4.9★"
                      ) : (
                        <Counter target={stat.n} suffix={stat.s} />
                      )}
                    </div>
                    <div className="mt-1 text-xs text-white/50 sm:text-sm">{stat.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* floating product cards, decorative */}
          <div className="animate-float-slow pointer-events-none absolute top-1/3 left-8 hidden lg:block">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
              <div className="text-3xl">📦</div>
              <div className="mt-2 text-xs font-semibold">Order Delivered</div>
              <div className="text-[10px] text-white/40">2 mins ago</div>
            </div>
          </div>
          <div className="animate-float pointer-events-none absolute right-8 bottom-1/4 hidden lg:block">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
              <div className="text-3xl">⭐</div>
              <div className="mt-2 text-xs font-semibold">5-Star Rated</div>
              <div className="text-[10px] text-white/40">By 50k+ users</div>
            </div>
          </div>
        </section>

        {/* ============ MARQUEE STRIP ============ */}
        <div className="relative border-y border-white/10 bg-white/[0.03] py-4">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-16 px-8">
                {[
                  "🚚 Fast Local Delivery",
                  "✅ Verified Sellers",
                  "🔒 Secure Checkout",
                  "💯 Genuine Products",
                  "📍 Bihiya Chauraha, Bihar",
                  "⭐ 4.9/5 Rated Platform",
                ].map((t, i) => (
                  <span
                    key={i}
                    className="text-sm font-semibold tracking-wider text-white/40 uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ============ CATEGORIES ============ */}
        <section id="categories" className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                Shop by Category
              </span>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Everything You Need,
                <br />
                In One Place
              </h2>
            </Reveal>

            <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((cat, i) => (
                <Reveal key={cat.name} delay={i * 80}>
                  <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/20">
                    <div
                      className={`absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br ${cat.gradient} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40`}
                    />
                    <div className="relative text-4xl">{cat.emoji}</div>
                    <div className="relative mt-4 font-bold">{cat.name}</div>
                    <div className="relative mt-1 text-xs text-white/40">Explore now →</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section id="features" className="relative px-6 py-28">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.03] to-transparent" />
          <div className="relative mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                Why BTC Balajee
              </span>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Built Different. Built for Bihar.
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 100}>
                  <div className="group h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 transition-all duration-500 hover:border-amber-400/30 hover:from-amber-400/[0.06]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:bg-amber-400/10">
                      {f.icon}
                    </div>
                    <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section id="testimonials" className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                Customer Love
              </span>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">Trusted by Thousands</h2>
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 120}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-amber-400/20">
                    <div className="text-amber-400">{"★".repeat(t.rating)}</div>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">"{t.text}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 font-bold text-black">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-white/40">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA BANNER ============ */}
        <section className="px-6 py-20">
          <Reveal>
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-12 text-center sm:p-20">
              <div className="animate-gradient-x pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10" />
              <div className="relative">
                <h2 className="text-3xl font-black sm:text-5xl">Ready to Shop Smarter?</h2>
                <p className="mx-auto mt-4 max-w-xl text-white/60">
                  Join 50,000+ customers already shopping with Bihar's #1 local e-commerce platform.
                </p>
                <button className="mt-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-10 py-4 font-bold text-black shadow-2xl shadow-amber-500/40 transition-transform hover:scale-105">
                  Create Free Account
                </button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ FOOTER ============ */}
        <footer id="contact" className="border-t border-white/10 px-6 pt-20 pb-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 font-black text-black">
                    BB
                  </div>
                  <span className="font-bold">BTC Balajee</span>
                </div>
                <p className="mt-4 text-sm text-white/40">
                  Bihiya Chauraha's premium e-commerce platform, delivering trust and quality across
                  Bihar.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white/80">Company</h4>
                <ul className="mt-4 space-y-2 text-sm text-white/40">
                  <li className="cursor-pointer hover:text-amber-400">About Us</li>
                  <li className="cursor-pointer hover:text-amber-400">Careers</li>
                  <li className="cursor-pointer hover:text-amber-400">Blog</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white/80">Support</h4>
                <ul className="mt-4 space-y-2 text-sm text-white/40">
                  <li className="cursor-pointer hover:text-amber-400">Help Center</li>
                  <li className="cursor-pointer hover:text-amber-400">Track Order</li>
                  <li className="cursor-pointer hover:text-amber-400">Returns</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white/80">Location</h4>
                <p className="mt-4 text-sm text-white/40">
                  Bihiya Chauraha, Bhojpur,
                  <br />
                  Bihar, India
                </p>
              </div>
            </div>

            {/* ---------- Developer Credit Card ---------- */}
            <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row">
              <div className="flex items-center gap-4">
                {/* Place your photo at /public/developer.jpg */}
                <img
                  src="/dhiraj.jpg"
                  alt="Developer"
                  className="h-14 w-14 rounded-full border-2 border-amber-400/50 object-cover object-top"
                />
                <div>
                  <div className="text-sm font-bold">
                    Designed & Developed by <span className="text-amber-400">Dhiraj Pandey</span>
                  </div>
                  <div className="text-xs text-white/40">
                    Full-Stack Developer • Next.js & React Specialist
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-white/50">
                <a href="#" className="transition hover:text-amber-400">
                  Portfolio
                </a>
                <a href="#" className="transition hover:text-amber-400">
                  LinkedIn
                </a>
                <a href="#" className="transition hover:text-amber-400">
                  GitHub
                </a>
                <a href="#" className="transition hover:text-amber-400">
                  Contact
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/30 sm:flex-row">
              <span>© {new Date().getFullYear()} BTC Balajee. All rights reserved.</span>
              <span>Privacy Policy • Terms of Service</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
