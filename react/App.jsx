// ============================================================
// NEXUS GMB — App.jsx
// Full React landing page (single component + subcomponents)
// Dependencies: React, react-dom
// Usage: Drop into a Vite/CRA project, import in main.jsx
// ============================================================

import { useState, useEffect, useRef } from "react";

// ── CONSTANTS ───────────────────────────────────────────────
const WHATSAPP = "https://wa.me/8801690129663";
const EMAIL    = "mailto:nokibulabsarshawon@gmail.com";

const NAV_LINKS = [
  { label: "Home",      href: "#home" },
  { label: "Services",  href: "#services" },
  { label: "Packages",  href: "#packages" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reviews",   href: "#reviews" },
  { label: "FAQ",       href: "#faq" },
];

const SERVICES = [
  { icon: "🗺", title: "Profile Optimization",       desc: "We build your GBP from the ground up — categories, attributes, service areas, descriptions, and every field that signals authority to Google's algorithm." },
  { icon: "📝", title: "Strategic Post Publishing",  desc: "Consistent, keyword-rich posts that keep your profile active and relevant. Fresh signals sent to Google every week, automatically." },
  { icon: "⭐", title: "Review Management",          desc: "We implement review generation systems and craft professional replies that build trust with customers — and credibility with Google's ranking engine." },
  { icon: "📍", title: "Citation Building",          desc: "Consistent NAP listings across 30–100 high-authority directories create a web of local trust that rockets your Map Pack position." },
  { icon: "🖼", title: "Geo-Tagged Image Uploads",   desc: "Photos embedded with your exact location coordinates send powerful proximity signals to Google Maps — a tactic most agencies skip entirely." },
  { icon: "📊", title: "Performance Reporting",      desc: "Monthly reports showing calls, direction requests, views, and keyword ranking movement — so you see the ROI in black and white, every month." },
];

const PACKAGES = [
  {
    name: "Starter", price: "$120", period: "/mo",
    tagline: "For businesses just getting visible",
    features: ["Full GBP profile optimization","8 keyword-rich posts/month","5 professional review replies","Basic keyword research report","Profile health monitoring"],
    cta: "Get Started", ctaStyle: "outline", popular: false,
  },
  {
    name: "Growth", price: "$250", period: "/mo",
    tagline: "For businesses ready to dominate",
    features: ["Everything in Starter","16 posts/month (2x frequency)","Review generation system setup","20 professional review replies","30–50 citation submissions","Monthly performance report","Dedicated account manager"],
    cta: "Start Dominating →", ctaStyle: "solid", popular: true,
  },
  {
    name: "Premium", price: "$400+", period: "/mo",
    tagline: "For market leaders who stay #1",
    features: ["Everything in Growth","Geo-tagged image uploads","50–100 premium citations","Full competitor audit & analysis","Conversion rate optimization (CRO)","Priority support & weekly check-ins","Custom strategy roadmap"],
    cta: "Talk to Sales", ctaStyle: "outline", popular: false,
  },
];

const PORTFOLIO = [
  {
    niche: "🔧 Garage Door Repair — Houston, TX", badge: "Demo Profile", badgeType: "demo",
    metrics: [{ val: "#1", label: "Map Pack Rank" },{ val: "+420%", label: "Profile Views" },{ val: "4.9★", label: "Avg Rating" }],
    tags: ["Full Optimization","Citation Building","Geo-Tagged Images","16 Posts/Mo"],
    desc: "Built from scratch — optimized every profile field, uploaded 12 geo-tagged images, submitted 45 citations. Profile went from invisible to top 3 within 47 days.",
    link: "Request a similar audit for your business →",
  },
  {
    niche: "🐛 Pest Control — Dallas, TX", badge: "Demo Profile", badgeType: "demo",
    metrics: [{ val: "#2", label: "Map Pack Rank" },{ val: "+310%", label: "Call Clicks" },{ val: "38", label: "Citations Built" }],
    tags: ["Keyword Research","Review System","Citation Audit","Monthly Report"],
    desc: "Full competitor audit identified 6 ranking gaps. After systematic fixes — citation consistency, review velocity, post frequency — the profile hit the Map Pack in 60 days.",
    link: "Get a free audit for your niche →",
  },
  {
    niche: "🏠 Roofing Contractor — Phoenix, AZ", badge: "Demo Profile", badgeType: "demo",
    metrics: [{ val: "#1", label: "Map Pack Rank" },{ val: "+550%", label: "Direction Requests" },{ val: "62", label: "Citations Built" }],
    tags: ["Geo-Tagged Photos","Competitor Audit","CRO","50+ Citations"],
    desc: "Highly competitive niche. Geo-tagged image strategy + location Q&A optimization dominated a 15-mile radius. Moved from page 2 to #1 in 75 days — now 40+ calls/week.",
    link: "See if this works for your market →",
  },
];

const REVIEWS = [
  {
    platform: "Google Review", initials: "MJ", color: "#1a6bff",
    text: "Before Nexus GMB, my garage door business was invisible on Google Maps. Within 60 days we were getting 3–4 new calls a day. The ROI is insane compared to what I was spending on Facebook ads.",
    name: "Marcus J.", role: "Owner — Express Garage Door, Houston TX",
  },
  {
    platform: "Direct Feedback", initials: "TR", color: "#e8a020",
    text: "I was skeptical — I'd tried \"SEO agencies\" before and got nothing. Shawon explained exactly what he was doing and why at every step. Two months in, we're ranking #1 for pest control in our city.",
    name: "Thomas R.", role: "Owner — ClearShield Pest Control, Dallas TX",
  },
  {
    platform: "WhatsApp Review", initials: "AL", color: "#059669",
    text: "The citation building alone was a game-changer. We had inconsistent business info all over the internet and didn't even know it. Once fixed, our ranking jumped from page 2 to the top 3 within weeks.",
    name: "Amanda L.", role: "Owner — Peak Roofing Solutions, Phoenix AZ",
  },
];

const FAQ_ITEMS = [
  {
    q: "How does Nexus GMB improve my Google Maps ranking?",
    a: "Google ranks local businesses based on three core factors: Relevance, Distance, and Prominence. We optimize every layer — your GBP profile, review velocity, citation network, and post frequency — to maximize all three simultaneously. No shortcuts, no black-hat tactics. Just systematic authority building.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No long-term contracts. We operate month-to-month because our results should be the reason you stay — not a legal obligation. That said, local SEO is a compounding strategy: clients who commit to 3–6 months see dramatically stronger results than those who stop after 30 days.",
  },
  {
    q: "What exactly are citations, and why do they matter?",
    a: "Citations are online mentions of your business's Name, Address, and Phone number (NAP) on directories like Yelp, Yellow Pages, Apple Maps, and Bing Places. When Google sees consistent NAP data across many trusted sites, it treats your business as more credible — directly boosting your Map Pack ranking.",
  },
  {
    q: "How soon will my phone start ringing more?",
    a: "Most clients see measurable ranking movement within 30–60 days and a noticeable increase in calls within 60–90 days. Competitive markets may take 90–120 days to hit top-3 positions. We provide monthly performance reports so you can track every milestone.",
  },
];

// ── CUSTOM HOOKS ─────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

// ── REVEAL WRAPPER ───────────────────────────────────────────
function Reveal({ children, className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ── NAV ──────────────────────────────────────────────────────
function Nav() {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{ padding: shrink ? "12px 6%" : "18px 6%" }}>
      <a href="#home" className="logo">
        <span className="logo-dot" />
        Nexus GMB
      </a>
      <ul className="nav-links">
        {NAV_LINKS.map((l) => (
          <li key={l.href}><a href={l.href}>{l.label}</a></li>
        ))}
      </ul>
      <a href="#contact" className="btn-primary">Get a Free Map Audit</a>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home">
      <Reveal>
        <div className="hero-eyebrow">
          <span className="eyebrow-dot" />
          Google Maps Ranking Specialists
        </div>
        <h1>We Help Local Businesses <span>Rank on Google Maps</span> and Get More Calls.</h1>
        <p className="hero-sub">
          Your Google Business Profile is your digital storefront — and most businesses are leaving it invisible.
          We optimize, manage, and grow your profile so local customers find <em>you</em> first, not your competitors.
        </p>
        <div className="hero-ctas">
          <a href="#contact" className="btn-primary">Get a Free Map Audit →</a>
          <a href="#packages" className="btn-outline">View Packages</a>
        </div>
        <div className="hero-trust">
          <div className="trust-avatars">
            {["JK","MR","AS","+"].map((i) => <span key={i}>{i}</span>)}
          </div>
          <p className="trust-text"><strong>Local businesses</strong> already dominating their Google Map Packs</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="map-visual">
          <div className="map-card">
            <div className="map-card-header">
              <span>📍 Google Map Pack — "plumber near me"</span>
              <span className="map-card-sub">Before → After</span>
            </div>
            <div className="before-after-grid">
              <div className="ba-col">
                <div className="ba-label">⚠ Before Nexus</div>
                <div className="rank-item">
                  <div className="rank-num red">14</div>
                  <div className="rank-name">Your Business<small>Not in Map Pack</small></div>
                </div>
                {["Competitor A · ⭐4.9","Competitor B · ⭐4.7","Competitor C · ⭐4.5"].map((c,i) => (
                  <div className="rank-item" key={i}>
                    <div className="rank-num muted">{i+1}</div>
                    <div className="rank-name muted-text">{c}</div>
                  </div>
                ))}
              </div>
              <div className="ba-col">
                <div className="ba-label">✅ After Nexus</div>
                <div className="rank-item active">
                  <div className="rank-num blue">1</div>
                  <div className="rank-name">Your Business<small><span className="stars">★★★★★</span> 4.9 · 87 reviews</small></div>
                </div>
                {["Competitor A · ⭐4.9","Competitor B · ⭐4.7"].map((c,i) => (
                  <div className="rank-item" key={i}>
                    <div className="rank-num muted">{i+2}</div>
                    <div className="rank-name muted-text">{c}</div>
                  </div>
                ))}
                <div className="badge-calls">📞 +340% increase in calls · 60 days</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── SERVICES ─────────────────────────────────────────────────
function Services() {
  return (
    <section id="services">
      <Reveal>
        <div className="section-tag">What We Do</div>
        <h2 className="section-title">Every Signal Google Needs.<br />Optimized by Experts.</h2>
        <p className="section-sub">Google ranks businesses based on relevance, distance, and prominence. We engineer all three — systematically and relentlessly.</p>
      </Reveal>
      <div className="services-grid">
        {SERVICES.map((s) => (
          <Reveal key={s.title}>
            <div className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── PACKAGES ─────────────────────────────────────────────────
function Packages() {
  return (
    <section id="packages">
      <Reveal className="section-center">
        <div className="section-tag">Pricing</div>
        <h2 className="section-title">Transparent Packages.<br />Measurable Results.</h2>
        <p className="section-sub centered-sub">No hidden fees. No 12-month lock-ins. Pick the level of domination that fits your growth goals.</p>
      </Reveal>
      <div className="packages-grid">
        {PACKAGES.map((pkg) => (
          <Reveal key={pkg.name}>
            <div className={`pkg-card${pkg.popular ? " popular" : ""}`}>
              {pkg.popular && <div className="popular-badge">⚡ Most Popular</div>}
              <div className="pkg-name">{pkg.name}</div>
              <div className={`pkg-price${pkg.popular ? " pkg-price-light" : ""}`}>
                {pkg.price}<span className={pkg.popular ? "pkg-price-sub" : ""}>{pkg.period}</span>
              </div>
              <div className="pkg-period">{pkg.tagline}</div>
              <div className="pkg-divider" />
              <ul className="pkg-features">
                {pkg.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a href="#contact-details" className={`pkg-cta pkg-cta-${pkg.ctaStyle}`}>{pkg.cta}</a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── WHY NEXUS ────────────────────────────────────────────────
function WhyNexus() {
  const stats = [
    { val: "3.4×", label: "Average call increase within 90 days" },
    { val: "#1",   label: "Map Pack position achieved for most clients" },
    { val: "60",   label: "Average days to first ranking movement" },
    { val: "100%", label: "Transparent reporting, every month" },
  ];
  return (
    <section id="why">
      <div className="why-grid">
        <Reveal>
          <div className="section-tag">The Nexus Advantage</div>
          <h2 className="section-title">We Don't Just Optimize.<br />We Build Local Authority.</h2>
          <p className="section-sub why-sub">
            Most agencies check a few boxes and send a report. Nexus GMB creates a <strong>nexus</strong> — an interconnected network of local signals that tells Google your business is the most relevant, most trusted result in your market.
          </p>
          <div className="why-points">
            {[
              { n:"01", title:"Data-Driven Signal Engineering",   desc:"We analyze your competitors' ranking factors and reverse-engineer what Google rewards — then scale it for your profile with precision." },
              { n:"02", title:"Geographic Authority Layers",      desc:"Geo-tagged images, location-specific posts, and service-area citations build overlapping proximity signals no single competitor can easily replicate." },
              { n:"03", title:"Compounding Results Over Time",    desc:"Every citation, post, and review compounds. Clients who stay 90+ days consistently hold top-3 positions against competitors spending 5× more on ads." },
            ].map((p) => (
              <div className="why-point" key={p.n}>
                <div className="why-num">{p.n}</div>
                <div><h4>{p.title}</h4><p>{p.desc}</p></div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="why-visual">
            <p className="why-visual-label">Client Performance Snapshot</p>
            <div className="stat-grid">
              {stats.map((s) => (
                <div className="stat-box" key={s.val}>
                  <div className="stat-num"><em>{s.val}</em></div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="why-quote">
              <p>"The Map Pack is not pay-to-play. It rewards businesses that Google trusts most. Our job is to make Google trust yours — more than anyone else in your city."</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── PORTFOLIO ────────────────────────────────────────────────
function Portfolio() {
  return (
    <section id="portfolio">
      <Reveal className="portfolio-intro">
        <div className="section-tag">Our Work</div>
        <h2 className="section-title">Real Audits. Real Optimization.<br />Real Results.</h2>
        <p className="section-sub">These are live demo profiles and client case studies built and optimized by Nexus GMB. Every profile below represents the exact same system we'll deploy for your business.</p>
      </Reveal>
      <div className="portfolio-grid">
        {PORTFOLIO.map((p) => (
          <Reveal key={p.niche}>
            <div className="port-card">
              <div className="port-header">
                <span className="port-niche">{p.niche}</span>
                <span className={`port-badge ${p.badgeType}`}>{p.badge}</span>
              </div>
              <div className="port-body">
                <div className="port-metrics">
                  {p.metrics.map((m) => (
                    <div className="port-metric" key={m.label}>
                      <div className="port-metric-val">{m.val}</div>
                      <div className="port-metric-label">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="port-tags">
                  {p.tags.map((t) => <span className="port-tag" key={t}>{t}</span>)}
                </div>
                <p className="port-desc">{p.desc}</p>
                <a href="#contact-details" className="port-link">{p.link}</a>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Free Audit CTA Card */}
        <Reveal>
          <div className="port-card port-card-cta">
            <div className="port-header port-header-light">
              <span className="port-niche port-niche-accent">📋 Your Business Could Be Here</span>
              <span className="port-badge free-badge">Free Audit</span>
            </div>
            <div className="port-body">
              <p className="port-desc port-desc-dark">Not sure where your GBP stands? We'll conduct a <strong>free, no-obligation Map Audit</strong> — covering your ranking position, profile completeness score, citation gaps, and competitor comparison.</p>
              <p className="port-desc port-desc-muted">You'll walk away knowing exactly what's holding your business back — whether you hire us or not.</p>
              <div className="port-cta-btns">
                <a href={`${WHATSAPP}?text=Hi%20Nexus%20GMB!%20I'd%20like%20a%20free%20Map%20Audit.`} className="btn-primary btn-sm" target="_blank" rel="noreferrer">💬 Request Free Audit on WhatsApp</a>
                <a href={`${EMAIL}?subject=Free Map Audit Request`} className="btn-outline btn-sm">✉ Email Us</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── REVIEWS ──────────────────────────────────────────────────
function Reviews() {
  return (
    <section id="reviews">
      <Reveal className="section-center">
        <div className="section-tag">Testimonials</div>
        <h2 className="section-title">What Clients Say<br />After Working With Us.</h2>
        <p className="section-sub centered-sub">Don't take our word for it. These are the businesses Nexus GMB helped connect with their local customers.</p>
      </Reveal>
      <div className="reviews-grid">
        {REVIEWS.map((r) => (
          <Reveal key={r.name}>
            <div className="review-card">
              <div className="review-platform">{r.platform}</div>
              <div className="review-quote-icon">"</div>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">{r.text}</p>
              <div className="review-author">
                <div className="review-avatar" style={{ background: r.color }}>{r.initials}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-role">{r.role}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="reviews-cta">
        <p>Are you a client? We'd love to feature your results here.</p>
        <a href={`${WHATSAPP}?text=Hi!%20I%20want%20to%20share%20my%20results%20with%20Nexus%20GMB.`} className="btn-outline" target="_blank" rel="noreferrer">Share Your Results →</a>
      </Reveal>
    </section>
  );
}

// ── CONTACT DETAILS ──────────────────────────────────────────
function ContactDetails() {
  const steps = [
    { step: "01 — We audit your current GBP",           time: "Free · 24 hrs" },
    { step: "02 — We share a custom ranking strategy",  time: "Free · 48 hrs" },
    { step: "03 — We start optimization work",          time: "Week 1"        },
    { step: "04 — You see ranking movement",            time: "Days 30–60"    },
    { step: "05 — Your phone starts ringing",           time: "Days 60–90"    },
  ];
  return (
    <section id="contact-details">
      <Reveal>
        <div className="section-tag">Get In Touch</div>
        <h2 className="section-title">We're One Message Away<br />from Getting You Ranked.</h2>
        <p className="section-sub">No sales pressure. No long forms. Just a quick conversation about your business, your market, and what it'll take to get you in the Map Pack.</p>
      </Reveal>
      <div className="contact-grid">
        <Reveal className="contact-cards">
          <a href={`${WHATSAPP}?text=Hi%20Nexus%20GMB!%20I'd%20like%20to%20learn%20more.`} target="_blank" rel="noreferrer" className="contact-card">
            <div className="contact-icon wa">💬</div>
            <div>
              <div className="contact-card-label">WhatsApp — Fastest Response</div>
              <div className="contact-card-value">+880 169 012 9663</div>
              <div className="contact-card-sub">Usually replies within 1–2 hours</div>
            </div>
            <div className="contact-card-arrow">→</div>
          </a>

          <a href={`${EMAIL}?subject=GBP Inquiry — Nexus GMB`} className="contact-card">
            <div className="contact-icon em">✉️</div>
            <div>
              <div className="contact-card-label">Email — Full Inquiries</div>
              <div className="contact-card-value">nokibulabsarshawon@gmail.com</div>
              <div className="contact-card-sub">Detailed proposals & audits sent here</div>
            </div>
            <div className="contact-card-arrow">→</div>
          </a>

          <a href={`${WHATSAPP}?text=Hi!%20I'd%20like%20a%20free%20Map%20Audit.`} target="_blank" rel="noreferrer" className="contact-card contact-card-accent">
            <div className="contact-icon contact-icon-accent">🗺</div>
            <div>
              <div className="contact-card-label contact-label-light">Limited Offer</div>
              <div className="contact-card-value contact-value-light">Get Your Free Map Audit</div>
              <div className="contact-card-sub contact-sub-light">We audit your GBP for free — no strings attached</div>
            </div>
            <div className="contact-card-arrow contact-arrow-light">→</div>
          </a>
        </Reveal>

        <Reveal>
          <div className="contact-info-box">
            <h3>What Happens After You Reach Out?</h3>
            <p>Here's our simple onboarding process — from first message to your profile actively ranking.</p>
            <div className="response-times">
              {steps.map((s) => (
                <div className="rt-item" key={s.step}>
                  <span>{s.step}</span>
                  <span className="rt-time">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq">
      <Reveal className="section-center">
        <div className="section-tag">FAQ</div>
        <h2 className="section-title">Real Questions.<br />Straight Answers.</h2>
      </Reveal>
      <div className="faq-grid">
        {FAQ_ITEMS.map((item, i) => (
          <Reveal key={i}>
            <div className={`faq-item${open === i ? " open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                {item.q}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">{item.a}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────
function Footer() {
  return (
    <section id="contact" className="footer-cta-section">
      <Reveal>
        <div className="section-tag footer-tag">Let's Work Together</div>
        <h2 className="section-title footer-title">Ready to Dominate<br />Your Local Market?</h2>
        <p className="section-sub footer-sub">Stop losing calls to competitors with inferior services and superior Google rankings. Let Nexus GMB build the local authority your business deserves — starting this week.</p>
        <div className="footer-ctas">
          <a href={`${WHATSAPP}?text=Hi%20Nexus%20GMB!%20I'd%20like%20to%20schedule%20a%20discovery%20call.`} target="_blank" rel="noreferrer" className="btn-primary btn-lg">💬 WhatsApp Us Now →</a>
          <a href={`${EMAIL}?subject=Discovery Call — Nexus GMB`} className="btn-outline btn-lg btn-outline-light">✉ Send an Email</a>
        </div>
      </Reveal>
      <div className="footer-meta">
        <div className="footer-meta-logo"><span className="footer-logo-dot" />Nexus GMB</div>
        <p>© 2025 Nexus GMB. All rights reserved. · Helping local businesses connect with local customers.</p>
        <p className="footer-contact-line">nokibulabsarshawon@gmail.com · wa.me/8801690129663</p>
      </div>
    </section>
  );
}

// ── ROOT APP ─────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Packages />
      <WhyNexus />
      <Portfolio />
      <Reviews />
      <ContactDetails />
      <FAQ />
      <Footer />
    </>
  );
}
