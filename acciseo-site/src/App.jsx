import { useState, useEffect } from "react";

const CountUp = ({ to, started, dur = 1600, fmt = (v) => v.toLocaleString("fr-FR") }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, dur]);
  return <>{fmt(v)}</>;
};

const Icon = ({ type, size = 24, color = "#0B1D33" }) => {
  const icons = {
    fuel: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M3 22h12"/><path d="M15 13h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2V9l-3-3"/><path d="M7 10h4"/></svg>,
    money: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14.5 9a3.5 3.5 0 0 0-5 0"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/></svg>,
    truck: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    file: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    refresh: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    building: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
    bus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6"/><path d="M16 6v6"/><path d="M2 12h20"/><path d="M7 18h10"/><rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/></svg>,
    car: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/></svg>,
    hardhat: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 15V6a2 2 0 0 1 4 0v9"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg>,
    chevron: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  };
  return icons[type] || null;
};

export default function App() {
  const [camions, setCamions] = useState(10);
  const [formSent, setFormSent] = useState(false);
  const [visible, setVisible] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ rs: "", nom: "", tel: "", email: "", nb: "", type: "" });
  const setF = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const mailtoHref = `mailto:contact@acciseo.fr?subject=${encodeURIComponent("Demande de diagnostic gratuit" + (form.rs ? " — " + form.rs : ""))}&body=${encodeURIComponent("Raison sociale : " + form.rs + "\nContact : " + form.nom + "\nTéléphone : " + form.tel + "\nEmail : " + form.email + "\nNombre de véhicules : " + form.nb + "\nActivité : " + form.type + "\n\nMerci de me recontacter pour un diagnostic gratuit.")}`;
  const formatEuro = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const simulTICPE = Math.round(camions * 5181);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.section]: true })); });
    }, { threshold: 0.1 });
    document.querySelectorAll("[data-section]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navy = "#0B1D33";
  const accent = "#00A86B";
  const accentSoft = "rgba(0,168,107,0.08)";
  const warmBg = "#FAFAF7";
  const textPrimary = "#1A1A1A";
  const textSecondary = "#5C6370";
  const borderLight = "rgba(0,0,0,0.06)";
  const R = (s, d = "") => `reveal ${visible[s] ? "show" : ""} ${d}`;

  return (
    <div style={{ background: "#fff", color: textPrimary, fontFamily: "'Outfit','Helvetica Neue',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=Source+Serif+4:wght@400;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;scroll-padding-top:84px}
        .mono{font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;letter-spacing:.4px}
        a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #00A86B;outline-offset:2px}
        @media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}.marquee{animation:none}.hero-accent::after{animation:none;transform:scaleX(1)}}
        .marquee:hover{animation-play-state:paused}
        .hero-accent{position:relative;color:${accent};z-index:1}
        .hero-accent::after{content:'';position:absolute;left:2px;right:2px;bottom:8px;height:10px;background:rgba(0,168,107,.18);z-index:-1;transform:scaleX(0);transform-origin:left;animation:sweep 1s 1s cubic-bezier(.16,1,.3,1) forwards}
        @keyframes sweep{to{transform:scaleX(1)}}
        .btn-accent .arr{display:inline-block;transition:transform .35s cubic-bezier(.16,1,.3,1);margin-left:6px}
        .btn-accent:hover .arr{transform:translateX(5px)}
        .nav-burger{display:none;background:none;border:none;cursor:pointer;padding:8px}
        .mobile-menu{display:none}
        @media(max-width:900px){
          .nav-burger{display:flex;flex-direction:column;gap:5px}
          .mobile-menu{display:flex}
          section{padding-left:20px!important;padding-right:20px!important;padding-top:72px!important;padding-bottom:72px!important}
        }
        .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
        .reveal.show{opacity:1;transform:translateY(0)}
        .d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}
        .serif{font-family:'DM Serif Display',Georgia,serif;font-weight:400}
        .body-serif{font-family:'Source Serif 4',Georgia,serif}
        .btn-accent{background:${accent};color:#fff;border:none;padding:16px 40px;border-radius:50px;font-family:'Outfit',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:all .4s;box-shadow:0 2px 12px rgba(0,168,107,.2)}
        .btn-accent:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,168,107,.3)}
        .btn-ghost{background:transparent;color:${navy};border:1.5px solid ${borderLight};padding:14px 36px;border-radius:50px;font-family:'Outfit',sans-serif;font-weight:500;font-size:14px;cursor:pointer;transition:all .3s;display:inline-flex;align-items:center;gap:8px}
        .btn-ghost:hover{border-color:${accent};color:${accent}}
        .input-clean{background:${warmBg};border:1.5px solid transparent;border-radius:12px;padding:16px 20px;color:${textPrimary};font-family:'Outfit',sans-serif;font-size:14px;width:100%;transition:all .3s}
        .input-clean:focus{outline:none;border-color:${accent};background:#fff;box-shadow:0 0 0 4px rgba(0,168,107,.08)}
        .section-label{font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:16px;display:block}
        .service-card{background:#fff;border:1px solid ${borderLight};border-radius:20px;padding:36px 32px;transition:all .5s;position:relative;overflow:hidden}
        .service-card:hover{border-color:rgba(0,168,107,.25);transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,.06)}
        .service-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${accent},rgba(0,168,107,.3));transform:scaleX(0);transform-origin:left;transition:transform .5s}
        .service-card:hover::before{transform:scaleX(1)}
        .marquee{display:flex;gap:48px;animation:scroll 25s linear infinite}
        @keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .number-huge{font-family:'DM Serif Display',serif;font-size:clamp(36px,7vw,64px);color:${accent};line-height:1;letter-spacing:-2px}
        .icon-circle{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .faq-item{border:1px solid ${borderLight};border-radius:14px;overflow:hidden;transition:all .3s;cursor:pointer;background:#fff}
        .faq-item:hover{border-color:rgba(0,168,107,.2)}
        .urgency-bar{background:linear-gradient(90deg,#B91C1C,#DC2626);color:#fff;text-align:center;padding:12px 24px;font-size:13px;font-weight:600;letter-spacing:.3px}
        @media(max-width:900px){.grid-2{grid-template-columns:1fr!important}.grid-3{grid-template-columns:1fr!important}.grid-4{grid-template-columns:repeat(2,1fr)!important}.nav-links{display:none!important}}
      `}</style>

      {/* URGENCY BAR */}
      <div className="urgency-bar">
        Les consommations 2024 expirent le 31 décembre 2026 — demandez votre diagnostic avant qu'il ne soit trop tard.
      </div>

      {/* NAV */}
      <nav style={{ position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,.95)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${borderLight}`,padding:"0 32px",boxShadow:scrolled?"0 8px 30px rgba(11,29,51,.08)":"none",transition:"box-shadow .4s" }}>
        <div style={{ maxWidth:1120,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:68 }}>
          <img src="./logo-nav.png" alt="Acciseo" style={{ height:32 }}/>
          <div className="nav-links" style={{ display:"flex",gap:28,alignItems:"center" }}>
            {["Services","Simulateur","FAQ","Contact"].map(t => <a key={t} href={`#${t.toLowerCase()}`} style={{ color:textSecondary,fontSize:13,textDecoration:"none",fontWeight:500 }}>{t}</a>)}
            <a href="tel:0614595701" style={{ display:"flex",alignItems:"center",gap:6,color:navy,fontSize:13,fontWeight:600,textDecoration:"none" }}><Icon type="phone" size={14} color={navy}/>06 14 59 57 01</a>
            <a href="#contact"><button className="btn-accent" style={{ padding:"10px 28px",fontSize:13 }}>Diagnostic gratuit</button></a>
          </div>
          <button className="nav-burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(o => !o)}>
            <span style={{ width:22,height:2,background:navy,borderRadius:1,transition:"all .3s",transform:menuOpen?"translateY(7px) rotate(45deg)":"none" }}/>
            <span style={{ width:22,height:2,background:navy,borderRadius:1,transition:"all .3s",opacity:menuOpen?0:1 }}/>
            <span style={{ width:22,height:2,background:navy,borderRadius:1,transition:"all .3s",transform:menuOpen?"translateY(-7px) rotate(-45deg)":"none" }}/>
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu" style={{ flexDirection:"column",gap:4,padding:"12px 0 20px",borderTop:`1px solid ${borderLight}` }}>
            {["Services","Simulateur","FAQ","Contact"].map(t => <a key={t} href={`#${t.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ color:navy,fontSize:16,fontWeight:600,textDecoration:"none",padding:"12px 4px" }}>{t}</a>)}
            <a href="tel:0614595701" style={{ display:"flex",alignItems:"center",gap:8,color:navy,fontSize:16,fontWeight:600,textDecoration:"none",padding:"12px 4px" }}><Icon type="phone" size={16} color={accent}/>06 14 59 57 01</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} style={{ marginTop:8 }}><button className="btn-accent" style={{ width:"100%",padding:"14px 28px",fontSize:15 }}>Diagnostic gratuit</button></a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section data-section="hero" style={{ padding:"80px 32px 60px",maxWidth:1120,margin:"0 auto" }}>
        <div className="grid-2" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center" }}>
          <div>
            <div className={R("hero","d1")}><span style={{ display:"inline-flex",alignItems:"center",gap:8,background:accentSoft,border:"1px solid rgba(0,168,107,.2)",borderRadius:99,padding:"6px 16px",fontSize:12,color:accent,fontWeight:600 }}>
              Remboursement d'accise — Art. L.312-53 du CIBS
            </span></div>
            <h1 className={`${R("hero","d2")} serif`} style={{ fontSize:"clamp(34px,4.5vw,50px)",lineHeight:1.1,color:navy,margin:"24px 0",letterSpacing:-1.5 }}>
              Chaque litre de gazole<br/>vous donne droit à un<br/><span className="hero-accent">remboursement.</span>
            </h1>
            <p className={`${R("hero","d3")} body-serif`} style={{ fontSize:17,color:textSecondary,lineHeight:1.8,maxWidth:460,marginBottom:32 }}>
              L'État rembourse une partie de l'accise sur le gazole professionnel.
              Acciseo prend en charge l'intégralité de votre dossier — extraction des données,
              vérification, dépôt sur le portail SIDECAR Web de la DGDDI.
              <strong style={{ color:textPrimary }}> Zéro frais si aucun remboursement.</strong>
            </p>
            <div className={R("hero","d4")} style={{ display:"flex",gap:14,flexWrap:"wrap",marginBottom:32 }}>
              <a href="#contact"><button className="btn-accent">Diagnostic gratuit en 48h<span className="arr">→</span></button></a>
              <a href="tel:0614595701" style={{ textDecoration:"none" }}><button className="btn-ghost"><Icon type="phone" size={14} color={navy}/> 06 14 59 57 01</button></a>
            </div>
            <div className={R("hero","d4")} style={{ display:"flex",gap:24,flexWrap:"wrap" }}>
              {["Commission au succès uniquement","Dépôt via SIDECAR Web officiel","SIRET 105 464 259"].map(t => (
                <span key={t} style={{ fontSize:12,color:textSecondary,display:"flex",alignItems:"center",gap:6 }}><Icon type="check" size={12} color={accent}/>{t}</span>
              ))}
            </div>
          </div>

          <div className={R("hero","d4")} style={{ background:warmBg,borderRadius:24,padding:36,border:`1px solid ${borderLight}`,position:"relative" }}>
            <div style={{ fontSize:11,fontWeight:600,letterSpacing:3,color:textSecondary,marginBottom:24,textTransform:"uppercase" }}>Étude de cas réelle — flotte de 20 camions</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20 }}>
              {[
                { label:"Gazole éligible analysé",value:"22 198 L",icon:"fuel" },
                { label:"Remboursement mensuel",value:"3 874 €",icon:"money" },
                { label:"Par véhicule / an",value:"2 324 €",icon:"truck" },
                { label:"Projection annuelle",value:"46 482 €",icon:"chart" },
              ].map(k => (
                <div key={k.label} style={{ background:"#fff",borderRadius:14,padding:"18px 16px",border:`1px solid ${borderLight}` }}>
                  <div style={{ marginBottom:8,opacity:.6 }}><Icon type={k.icon} size={20} color={navy}/></div>
                  <div className="serif" style={{ fontSize:20,color:navy }}>{k.value}</div>
                  <div style={{ fontSize:11,color:textSecondary,marginTop:4 }}>{k.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background:accentSoft,borderRadius:10,padding:"10px 16px",fontSize:12,color:accent,fontWeight:500,display:"flex",alignItems:"center",gap:8 }}>
              <Icon type="shield" size={14} color={accent}/>Données vérifiées — 4 factures BTF/WEX, ventilation régionale conforme
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ borderTop:`1px solid ${borderLight}`,borderBottom:`1px solid ${borderLight}`,padding:"18px 32px",overflow:"hidden" }}>
        <div className="marquee">
          {[...Array(2)].flatMap((_,i) => ["Conforme DGFiP / DGDDI","Portail SIDECAR Web","Art. L.312-53 du CIBS","Formulaire 3310-TIC-SD","Commission au succès","Diagnostic en 48h","SIRET 105 464 259 00016"].map((t,j) => (
            <span key={`${i}-${j}`} style={{ whiteSpace:"nowrap",fontSize:12,color:textSecondary,fontWeight:500,display:"flex",alignItems:"center",gap:8 }}>
              <span style={{ width:5,height:5,borderRadius:"50%",background:accent,opacity:.5 }}/>{t}
            </span>
          )))}
        </div>
      </div>


      {/* STATS BAND */}
      <section data-section="stats" style={{ background:navy,padding:"56px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-120,left:"30%",width:340,height:340,borderRadius:"50%",background:"rgba(0,168,107,.05)",filter:"blur(70px)" }}/>
        <div className="grid-4" style={{ maxWidth:1120,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:32,position:"relative" }}>
          {[
            { to:22198, fmt:(v)=>v.toLocaleString("fr-FR")+" L", l:"de gazole analysés sur une seule flotte" },
            { to:46482, fmt:(v)=>v.toLocaleString("fr-FR")+" €", l:"identifiés sur douze mois — flotte de 20 camions" },
            { to:3, dur:900, fmt:(v)=>v+" taux", l:"régionaux appliqués : continental, IDF, Corse" },
            { to:100, dur:1200, fmt:(v)=>v+" %", l:"au succès — aucun frais d'avance" },
          ].map(x => (
            <div key={x.l} style={{ textAlign:"center" }}>
              <div className="mono" style={{ fontSize:28,fontWeight:600,color:accent,marginBottom:8 }}><CountUp to={x.to} dur={x.dur} fmt={x.fmt} started={!!visible.stats}/></div>
              <div style={{ fontSize:12.5,color:"rgba(255,255,255,.45)",lineHeight:1.5 }}>{x.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section data-section="problem" style={{ padding:"100px 32px",maxWidth:1120,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <span className={`${R("problem","d1")} section-label`}>Le constat</span>
          <h2 className={`${R("problem","d2")} serif`} style={{ fontSize:36,color:navy,marginBottom:16 }}>L'argent que vous laissez à l'État</h2>
          <p className={R("problem","d3")} style={{ color:textSecondary,fontSize:16,maxWidth:520,margin:"0 auto",lineHeight:1.7 }}>
            La majorité des transporteurs ne réclament pas leur remboursement d'accise.
            Chaque semestre non réclamé, c'est de l'argent définitivement perdu.
          </p>
        </div>
        <div className="grid-3" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }}>
          {[
            { num:"40%",title:"des PME transport",desc:"ne réclament pas leur remboursement, par manque de temps ou de connaissance du dispositif.",delay:"d1" },
            { num:"~5 000 €",title:"par camion par an",desc:"c'est le montant moyen récupérable pour chaque poids lourd de plus de 7,5 tonnes.",delay:"d2" },
            { num:"31/12/26",title:"date limite 2024",desc:"passé cette date, les remboursements sur les consommations 2024 sont définitivement perdus.",delay:"d3" },
          ].map(c => (
            <div key={c.title} className={R("problem",c.delay)} style={{ textAlign:"center",padding:"40px 24px" }}>
              <div className="number-huge">{c.num}</div>
              <h3 style={{ fontSize:16,fontWeight:700,color:navy,margin:"16px 0 8px" }}>{c.title}</h3>
              <p className="body-serif" style={{ fontSize:14,color:textSecondary,lineHeight:1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" data-section="services" style={{ background:warmBg,padding:"100px 32px" }}>
        <div style={{ maxWidth:1120,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:64 }}>
            <span className={`${R("services","d1")} section-label`}>Nos services</span>
            <h2 className={`${R("services","d2")} serif`} style={{ fontSize:36,color:navy,marginBottom:16 }}>Trois leviers de récupération</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:20 }}>
            {[
              { tag:"Prioritaire",title:"Rattrapage TICPE 2023–2024",desc:"Les consommations non réclamées des deux dernières années représentent un capital dormant. Nous constituons le dossier complet et déposons la demande sur SIDECAR Web avant la date limite de prescription.",icon:"refresh",accent:accent,num:"01" },
              { tag:"Récurrent",title:"Gestion semestrielle",desc:"Extraction des volumes par véhicule, croisement avec vos cartes grises, ventilation régionale conforme, préparation de l'état récapitulatif annuel (ERA). Vous n'y pensez plus.",icon:"calendar",accent:"#2E6BC6",num:"02" },
              { tag:"Expertise",title:"Accises alcool — export",desc:"Vous exportez des produits soumis à accise ? Nous gérons le remboursement des droits à l'export avec la même rigueur et la même rémunération au succès.",icon:"building",accent:"#7B5EA7",num:"03" },
            ].map((s,i) => (
              <div key={s.title} className={`service-card ${R("services")}`} style={{ transitionDelay:`${i*.1+.1}s` }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20 }}>
                  <span style={{ fontSize:10,fontWeight:600,letterSpacing:2,color:s.accent,textTransform:"uppercase" }}>{s.tag}</span>
                  <span className="serif" style={{ fontSize:32,color:"rgba(0,0,0,.04)" }}>{s.num}</span>
                </div>
                <div className="icon-circle" style={{ background:`${s.accent}10`,border:`1px solid ${s.accent}20`,marginBottom:20 }}>
                  <Icon type={s.icon} size={22} color={s.accent}/>
                </div>
                <h3 style={{ fontSize:18,fontWeight:700,color:navy,marginBottom:10 }}>{s.title}</h3>
                <p className="body-serif" style={{ fontSize:14,color:textSecondary,lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section data-section="how" style={{ padding:"100px 32px",maxWidth:1120,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <span className={`${R("how","d1")} section-label`}>Notre méthode</span>
          <h2 className={`${R("how","d2")} serif`} style={{ fontSize:36,color:navy }}>Trois étapes, zéro complication</h2>
        </div>
        <div className="grid-3" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:48 }}>
          {[
            { num:"01",title:"Vous envoyez vos documents",desc:"Factures carburant (BTF, Total, AS24, DKV) et copies de cartes grises. PDF, scan ou photo — aucun tri nécessaire de votre part.",icon:"file",color:accent },
            { num:"02",title:"Nous traitons le dossier",desc:"Extraction automatisée des volumes, croisement carte-véhicule, ventilation régionale, vérification PTAC, préparation de l'ERA conforme.",icon:"shield",color:"#2E6BC6" },
            { num:"03",title:"Vous êtes remboursé",desc:"Dépôt sur SIDECAR Web ou déclaration 3310-TIC. L'État verse le remboursement sur votre compte. Vous nous réglez un pourcentage du montant reçu.",icon:"money",color:"#D4820A" },
          ].map((s,i) => (
            <div key={s.num} className={R("how")} style={{ transitionDelay:`${i*.15+.1}s`,textAlign:"center" }}>
              <div style={{ width:64,height:64,borderRadius:"50%",margin:"0 auto 24px",background:`${s.color}10`,border:`1.5px solid ${s.color}20`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <Icon type={s.icon} size={24} color={s.color}/>
              </div>
              <h3 style={{ fontSize:17,fontWeight:700,color:navy,marginBottom:10 }}>{s.title}</h3>
              <p className="body-serif" style={{ fontSize:14,color:textSecondary,lineHeight:1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
              <div className={R("how","d4")} style={{ marginTop:56,display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap" }}>
          {["CARTE ↔ PLAQUE ↔ PTAC ≥ 7,5 t","VENTILATION PAR RÉGION D'ACQUISITION","ARRONDIS CONFORMES SIDECAR","ERA TENU À DISPOSITION"].map(t => (
            <span key={t} className="mono" style={{ fontSize:11,color:navy,background:accentSoft,border:"1px solid rgba(0,168,107,.2)",borderRadius:8,padding:"8px 14px" }}>{t}</span>
          ))}
        </div>
      </section>

      {/* VIDEO */}
      <section data-section="video" style={{ background:warmBg,padding:"100px 32px" }}>
        <div style={{ maxWidth:900,margin:"0 auto",textAlign:"center" }}>
          <span className={`${R("video","d1")} section-label`}>En 25 secondes</span>
          <h2 className={`${R("video","d2")} serif`} style={{ fontSize:36,color:navy,marginBottom:40 }}>Acciseo, en bref</h2>
          <div className={R("video","d3")} style={{ borderRadius:20,overflow:"hidden",boxShadow:"0 24px 80px rgba(11,29,51,.15)",lineHeight:0 }}>
            <video controls preload="metadata" poster="./promo-poster.jpg" style={{ width:"100%",display:"block" }}>
              <source src="./promo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* SIMULATOR */}
      <section id="simulateur" data-section="sim" style={{ background:navy,padding:"100px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-100,right:-100,width:400,height:400,borderRadius:"50%",background:"rgba(0,168,107,.06)",filter:"blur(80px)" }}/>
        <div style={{ maxWidth:600,margin:"0 auto",position:"relative",textAlign:"center" }}>
          <span className={`${R("sim","d1")} section-label`} style={{ color:"rgba(0,168,107,.8)" }}>Simulateur</span>
          <h2 className={`${R("sim","d2")} serif`} style={{ fontSize:36,color:"#fff",marginBottom:8 }}>Estimez votre remboursement</h2>
          <p className={R("sim","d3")} style={{ color:"rgba(255,255,255,.4)",fontSize:14,marginBottom:48 }}>Déplacez le curseur pour adapter la simulation à votre flotte</p>
          <div className={R("sim","d4")}>
            <div style={{ fontSize:13,color:"rgba(255,255,255,.3)",marginBottom:16 }}>Véhicules de plus de 7,5 tonnes (PTAC)</div>
            <input type="range" min={1} max={60} value={camions} onChange={e => setCamions(+e.target.value)} style={{ width:"100%",accentColor:accent }}/>
            <div style={{ marginTop:20,marginBottom:40 }}>
              <span className="serif" style={{ fontSize:72,color:accent }}>{camions}</span>
              <span style={{ fontSize:16,color:"rgba(255,255,255,.3)",marginLeft:10 }}>camions</span>
            </div>
            <div className="grid-2" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
              <div style={{ background:"rgba(255,255,255,.05)",borderRadius:16,padding:24,border:"1px solid rgba(255,255,255,.06)" }}>
                <div style={{ fontSize:10,color:"rgba(255,255,255,.3)",letterSpacing:2,marginBottom:10,fontWeight:600 }}>REMBOURSEMENT ANNUEL</div>
                <div className="serif" style={{ fontSize:32,color:accent }}>{formatEuro(simulTICPE)}</div>
              </div>
              <div style={{ background:"rgba(255,92,92,.06)",borderRadius:16,padding:24,border:"1px solid rgba(255,92,92,.12)" }}>
                <div style={{ fontSize:10,color:"rgba(255,255,255,.3)",letterSpacing:2,marginBottom:10,fontWeight:600 }}>PERDU SI NON RÉCLAMÉ (2 ANS)</div>
                <div className="serif" style={{ fontSize:32,color:"#F09595" }}>{formatEuro(simulTICPE * 2)}</div>
              </div>
            </div>
            <p style={{ fontSize:11,color:"rgba(255,255,255,.15)",marginTop:20 }}>*Estimation : 33 000 L/an/camion, taux moyen pondéré. Résultat indicatif, diagnostic personnalisé sur demande.</p>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section data-section="elig" style={{ padding:"100px 32px",maxWidth:1120,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <span className={`${R("elig","d1")} section-label`}>Éligibilité</span>
          <h2 className={`${R("elig","d2")} serif`} style={{ fontSize:36,color:navy }}>Qui peut en bénéficier ?</h2>
        </div>
        <div className="grid-4" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }}>
          {[
            { icon:"truck",label:"Transport de marchandises",sub:"Véhicules > 7,5t PTAC" },
            { icon:"bus",label:"Transport de voyageurs",sub:"Autocars, bus" },
            { icon:"car",label:"Taxis",sub:"Gazole et essence" },
            { icon:"hardhat",label:"BTP et engins",sub:"Véhicules routiers éligibles" },
          ].map((c,i) => (
            <div key={c.label} className={R("elig")} style={{ transitionDelay:`${i*.1+.1}s`,textAlign:"center",padding:"36px 20px",borderRadius:20,background:warmBg,border:`1px solid ${borderLight}` }}>
              <div className="icon-circle" style={{ background:accentSoft,margin:"0 auto 16px" }}><Icon type={c.icon} size={24} color={accent}/></div>
              <div style={{ fontSize:15,fontWeight:700,color:navy,marginBottom:4 }}>{c.label}</div>
              <div style={{ fontSize:12,color:textSecondary }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY ACCISEO */}
      <section data-section="why" style={{ background:warmBg,padding:"100px 32px" }}>
        <div className="grid-2" style={{ maxWidth:1120,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center" }}>
          <div>
            <span className={`${R("why","d1")} section-label`}>Pourquoi Acciseo</span>
            <h2 className={`${R("why","d2")} serif`} style={{ fontSize:34,color:navy,marginBottom:24 }}>Un cabinet spécialisé,<br/>pas un généraliste.</h2>
            <p className={`${R("why","d3")} body-serif`} style={{ fontSize:16,color:textSecondary,lineHeight:1.8 }}>
              Votre expert-comptable gère votre bilan. Les sociétés de cartes carburant gèrent vos pleins.
              Personne ne se concentre exclusivement sur la récupération de vos accises. C'est notre seul métier.
            </p>
          </div>
          <div className={R("why","d3")} style={{ display:"grid",gap:20 }}>
            {[
              { icon:"money",title:"Rémunération au succès",desc:"Aucun frais d'avance, aucun abonnement. Si nous ne récupérons rien, vous ne payez rien." },
              { icon:"shield",title:"Conformité documentaire",desc:"ERA préparé, justificatifs organisés, dossier conforme aux exigences DGDDI et DGFiP." },
              { icon:"clock",title:"Diagnostic en 48 heures",desc:"Envoyez vos factures. En 48h, vous connaissez le montant exact récupérable." },
              { icon:"eye",title:"Veille réglementaire",desc:"Taux, portails, formulaires — nous suivons chaque évolution réglementaire pour vous." },
            ].map(c => (
              <div key={c.title} style={{ display:"flex",gap:16,alignItems:"flex-start" }}>
                <div className="icon-circle" style={{ background:accentSoft,marginTop:2 }}><Icon type={c.icon} size={20} color={accent}/></div>
                <div>
                  <div style={{ fontSize:15,fontWeight:700,color:navy,marginBottom:4 }}>{c.title}</div>
                  <div style={{ fontSize:13,color:textSecondary,lineHeight:1.6 }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CABINET */}
      <section data-section="cab" style={{ padding:"100px 32px",maxWidth:900,margin:"0 auto",textAlign:"center" }}>
        <span className={`${R("cab","d1")} section-label`}>Le cabinet</span>
        <h2 className={`${R("cab","d2")} serif`} style={{ fontSize:34,color:navy,marginBottom:24 }}>Une spécialisation, pas un catalogue.</h2>
        <p className={`${R("cab","d3")} body-serif`} style={{ fontSize:16.5,color:textSecondary,lineHeight:1.9,maxWidth:680,margin:"0 auto 32px" }}>
          Acciseo est un cabinet indépendant fondé par un professionnel de la fiscalité indirecte,
          spécialisé exclusivement dans les droits d'accise — carburants et alcools.
          Notre conviction : la récupération d'accises exige une précision que les généralistes
          ne peuvent pas offrir. Chaque dossier est traité ligne par ligne, du relevé de carte carburant
          jusqu'au dépôt administratif, avec une traçabilité complète en cas de contrôle.
        </p>
        <div className={R("cab","d4")} style={{ display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap" }}>
          {["SIRET 105 464 259","RCS PONTOISE","APE 7022Z"].map(t => (
            <span key={t} className="mono" style={{ fontSize:11,color:textSecondary,border:`1px solid ${borderLight}`,borderRadius:8,padding:"8px 14px" }}>{t}</span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" data-section="faq" style={{ padding:"100px 32px",maxWidth:800,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:48 }}>
          <span className={`${R("faq","d1")} section-label`}>Questions fréquentes</span>
          <h2 className={`${R("faq","d2")} serif`} style={{ fontSize:36,color:navy }}>Vos questions, nos réponses</h2>
        </div>
        <div className={R("faq","d3")} style={{ display:"grid",gap:12 }}>
          {[
            { q:"C'est légal ? L'État rembourse vraiment ?",a:"Oui. Le remboursement partiel d'accise sur le gazole professionnel est prévu par l'article L.312-53 du Code des impositions sur les biens et services (CIBS). C'est un droit, pas une faveur. Les demandes sont déposées via SIDECAR Web (portail officiel de la DGDDI) ou via la déclaration de TVA (formulaire 3310-TIC-SD)." },
            { q:"Combien ça coûte ?",a:"Aucun frais d'avance. Notre rémunération est un pourcentage du montant effectivement remboursé par l'État. Si nous ne récupérons rien, vous ne payez rien." },
            { q:"Mon comptable ne le fait pas déjà ?",a:"Dans la majorité des cas, les experts-comptables ne traitent pas les dossiers TICPE car ce n'est pas leur spécialité : tri des factures ligne par ligne, croisement carte-véhicule, ventilation régionale. Nous travaillons en complémentarité avec votre comptable." },
            { q:"De quels documents avez-vous besoin ?",a:"Vos factures carburant (BTF, Total, AS24, DKV...) et les copies des cartes grises de vos véhicules de plus de 7,5 tonnes. C'est tout." },
            { q:"Combien de temps prend le remboursement ?",a:"Le diagnostic est réalisé en 48 heures. Le dépôt du dossier prend 1 à 2 semaines. Le remboursement par l'État intervient généralement sous 1 à 3 mois après le dépôt." },
            { q:"J'ai oublié de réclamer les années précédentes, c'est trop tard ?",a:"La prescription est de 2 ans. Les consommations 2024 sont réclamables jusqu'au 31 décembre 2026. Au-delà, l'argent est définitivement perdu — c'est pourquoi le rattrapage est notre service prioritaire." },
          ].map((item,i) => (
            <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div style={{ padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <span style={{ fontSize:15,fontWeight:600,color:navy }}>{item.q}</span>
                <span style={{ transform:openFaq===i?"rotate(180deg)":"rotate(0)",transition:"transform .3s",flexShrink:0,marginLeft:16 }}><Icon type="chevron" size={18} color={textSecondary}/></span>
              </div>
              <div style={{ maxHeight:openFaq===i?320:0,opacity:openFaq===i?1:0,overflow:"hidden",transition:"max-height .5s cubic-bezier(.16,1,.3,1), opacity .35s" }}>
                <div style={{ padding:"0 24px 18px",fontSize:14,color:textSecondary,lineHeight:1.7 }} className="body-serif">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" data-section="cta" style={{ background:warmBg,padding:"100px 32px" }}>
        <div style={{ maxWidth:560,margin:"0 auto",textAlign:"center" }}>
          <span className={`${R("cta","d1")} section-label`}>Contact</span>
          <h2 className={`${R("cta","d2")} serif`} style={{ fontSize:36,color:navy,marginBottom:12 }}>Demandez votre<br/>diagnostic gratuit</h2>
          <p className={R("cta","d3")} style={{ color:textSecondary,fontSize:15,lineHeight:1.7,marginBottom:24 }}>
            Envoyez-nous vos factures carburant. En 48 heures, vous savez exactement combien l'État vous doit.
          </p>
          <div className={R("cta","d3")} style={{ display:"flex",justifyContent:"center",gap:24,marginBottom:32,flexWrap:"wrap" }}>
            <a href="tel:0614595701" style={{ display:"flex",alignItems:"center",gap:8,color:navy,fontWeight:600,textDecoration:"none",fontSize:15 }}><Icon type="phone" size={18} color={accent}/>06 14 59 57 01</a>
            <a href="mailto:contact@acciseo.fr" style={{ display:"flex",alignItems:"center",gap:8,color:navy,fontWeight:600,textDecoration:"none",fontSize:15 }}><Icon type="mail" size={18} color={accent}/>contact@acciseo.fr</a>
          </div>
          {!formSent ? (
            <div className={R("cta","d4")} style={{ display:"grid",gap:14,textAlign:"left" }}>
              <input className="input-clean" placeholder="Raison sociale" value={form.rs} onChange={setF("rs")}/>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <input className="input-clean" placeholder="Nom du contact" value={form.nom} onChange={setF("nom")}/>
                <input className="input-clean" placeholder="Téléphone" type="tel" value={form.tel} onChange={setF("tel")}/>
              </div>
              <input className="input-clean" placeholder="Adresse email" type="email" value={form.email} onChange={setF("email")}/>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <input className="input-clean" placeholder="Nombre de véhicules" type="number" value={form.nb} onChange={setF("nb")}/>
                <select className="input-clean" style={{ appearance:"auto" }} value={form.type} onChange={setF("type")}>
                  <option value="">Type d'activité</option>
                  <option>Transport de marchandises</option>
                  <option>Transport de voyageurs</option>
                  <option>Taxi</option>
                  <option>BTP</option>
                  <option>Export alcool</option>
                  <option>Autre</option>
                </select>
              </div>
              <a href={mailtoHref} style={{ textDecoration:"none" }}>
                <button className="btn-accent" style={{ width:"100%",marginTop:8 }} onClick={() => setFormSent(true)}>Recevoir mon diagnostic gratuit<span className="arr">→</span></button>
              </a>
              <p style={{ fontSize:11,color:textSecondary,textAlign:"center" }}>Vos données sont strictement confidentielles.</p>
            </div>
          ) : (
            <div style={{ padding:48,background:"#fff",borderRadius:20,border:`1px solid ${borderLight}` }}>
              <div className="icon-circle" style={{ background:accentSoft,margin:"0 auto 16px" }}><Icon type="check" size={24} color={accent}/></div>
              <h3 style={{ color:navy,fontSize:20,marginBottom:8,fontWeight:700 }}>Demande reçue</h3>
              <p style={{ color:textSecondary,fontSize:14 }}>Nous vous recontactons sous 24 heures.</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:`1px solid ${borderLight}`,padding:"48px 32px",background:"#fff" }}>
        <div style={{ maxWidth:1120,margin:"0 auto" }}>
          <div className="grid-3" style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:48,marginBottom:40 }}>
            <div>
              <img src="./logo-footer.png" alt="Acciseo" style={{ height:28,marginBottom:16 }}/>
              <p style={{ fontSize:13,color:textSecondary,lineHeight:1.7,maxWidth:300 }}>
                Cabinet spécialisé dans le remboursement d'accises sur les produits énergétiques.
                Nous accompagnons les transporteurs routiers dans la récupération de leur TICPE.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize:13,fontWeight:700,color:navy,marginBottom:12 }}>Contact</h4>
              <p style={{ fontSize:13,color:textSecondary,lineHeight:2 }}>
                <a href="tel:0614595701" style={{ color:textSecondary,textDecoration:"none" }}>06 14 59 57 01</a><br/>
                <a href="mailto:contact@acciseo.fr" style={{ color:textSecondary,textDecoration:"none" }}>contact@acciseo.fr</a><br/>
                Île-de-France
              </p>
            </div>
            <div>
              <h4 style={{ fontSize:13,fontWeight:700,color:navy,marginBottom:12 }}>Liens</h4>
              <p style={{ fontSize:13,color:textSecondary,lineHeight:2 }}>
                <a href="#services" style={{ color:textSecondary,textDecoration:"none" }}>Services</a><br/>
                <a href="#simulateur" style={{ color:textSecondary,textDecoration:"none" }}>Simulateur</a><br/>
                <a href="#faq" style={{ color:textSecondary,textDecoration:"none" }}>FAQ</a><br/>
                <a href="#contact" style={{ color:textSecondary,textDecoration:"none" }}>Contact</a>
              </p>
            </div>
          </div>
          <div style={{ borderTop:`1px solid ${borderLight}`,paddingTop:24,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16 }}>
            <div style={{ fontSize:11,color:textSecondary,lineHeight:1.8 }}>
              © 2026 Acciseo — Entrepreneur individuel<br/>
              SIRET 105 464 259 00016 — RCS Pontoise — APE 7022Z<br/>
              Responsable de la publication : Yacine B.
            </div>
            <div style={{ fontSize:11,color:textSecondary,lineHeight:1.8,textAlign:"right" }}>
              Hébergeur : Vercel Inc.<br/>
              440 N Barranca Ave #4133, Covina, CA 91723, USA
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
