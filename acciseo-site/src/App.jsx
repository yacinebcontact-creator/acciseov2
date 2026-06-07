import { useState, useEffect } from "react";

const Icon = ({ type, size = 24, color = "#0B1D33" }) => {
  const icons = {
    fuel: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M3 22h12"/><path d="M15 13h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9l-3-3"/><path d="M7 10h4"/></svg>,
    money: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14.5 9a3.5 3.5 0 0 0-5 0"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/></svg>,
    truck: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    file: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    building: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
    bus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6"/><path d="M16 6v6"/><path d="M2 12h20"/><path d="M7 18h10"/><rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/></svg>,
    car: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/></svg>,
    hardhat: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 15V6a2 2 0 0 1 4 0v9"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg>,
    refresh: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  };
  return icons[type] || null;
};

const LOGO_NAV = "data:image/png;base64,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";
const LOGO_FOOTER = "data:image/png;base64,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";

export default function AcciseoFinal() {
  const [camions, setCamions] = useState(10);
  const [formSent, setFormSent] = useState(false);
  const [visible, setVisible] = useState({});
  const formatNum = (n) => new Intl.NumberFormat("fr-FR").format(n);
  const formatEuro = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const simulTICPE = Math.round(camions * 5181);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.section]: true })); });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-section]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navy = "#0B1D33";
  const accent = "#00A86B";
  const accentSoft = "rgba(0,168,107,0.08)";
  const warmBg = "#FAFAF7";
  const textPrimary = "#1A1A1A";
  const textSecondary = "#5C6370";
  const borderLight = "rgba(0,0,0,0.06)";

  const R = (section, delay = "") => `reveal ${visible[section] ? "show" : ""} ${delay}`;

  return (
    <div style={{ background: "#fff", color: textPrimary, fontFamily: "'Outfit','Helvetica Neue',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=Source+Serif+4:wght@400;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
        .reveal.show{opacity:1;transform:translateY(0)}
        .d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}.d5{transition-delay:.5s}
        .serif{font-family:'DM Serif Display',Georgia,serif;font-weight:400}
        .body-serif{font-family:'Source Serif 4',Georgia,serif}
        .btn-accent{background:${accent};color:#fff;border:none;padding:16px 40px;border-radius:50px;font-family:'Outfit',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:all .4s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 12px rgba(0,168,107,.2)}
        .btn-accent:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,168,107,.3)}
        .btn-ghost{background:transparent;color:${navy};border:1.5px solid ${borderLight};padding:14px 36px;border-radius:50px;font-family:'Outfit',sans-serif;font-weight:500;font-size:14px;cursor:pointer;transition:all .3s}
        .btn-ghost:hover{border-color:${accent};color:${accent}}
        .input-clean{background:${warmBg};border:1.5px solid transparent;border-radius:12px;padding:16px 20px;color:${textPrimary};font-family:'Outfit',sans-serif;font-size:14px;width:100%;transition:all .3s}
        .input-clean:focus{outline:none;border-color:${accent};background:#fff;box-shadow:0 0 0 4px rgba(0,168,107,.08)}
        .section-label{font-size:12px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:16px;display:block}
        .service-card{background:#fff;border:1px solid ${borderLight};border-radius:20px;padding:36px 32px;transition:all .5s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden}
        .service-card:hover{border-color:rgba(0,168,107,.25);transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,.06)}
        .service-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${accent},rgba(0,168,107,.3));transform:scaleX(0);transform-origin:left;transition:transform .5s}
        .service-card:hover::before{transform:scaleX(1)}
        .marquee{display:flex;gap:48px;animation:scroll 25s linear infinite}
        @keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .number-huge{font-family:'DM Serif Display',serif;font-size:clamp(40px,8vw,72px);color:${accent};line-height:1;letter-spacing:-2px}
        .icon-circle{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,.92)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${borderLight}`,padding:"0 32px" }}>
        <div style={{ maxWidth:1120,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:68 }}>
          <div style={{ display:"flex",alignItems:"center" }}>
            <img src={LOGO_NAV} alt="Acciseo" style={{ height:36 }}/>
          </div>
          <div style={{ display:"flex",gap:32,alignItems:"center" }}>
            {["Services","Simulateur","Contact"].map(t => <a key={t} href={`#${t.toLowerCase()}`} style={{ color:textSecondary,fontSize:13,textDecoration:"none",fontWeight:500 }}>{t}</a>)}
            <button className="btn-accent" style={{ padding:"10px 28px",fontSize:13 }}>Diagnostic gratuit</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section data-section="hero" style={{ padding:"100px 32px 80px",maxWidth:1120,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center" }}>
          <div>
            <div className={R("hero","d1")}><span style={{ display:"inline-flex",alignItems:"center",gap:8,background:accentSoft,border:"1px solid rgba(0,168,107,.2)",borderRadius:99,padding:"6px 16px",fontSize:12,color:accent,fontWeight:600 }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:accent }}/>Spécialiste remboursement d'accises
            </span></div>
            <h1 className={`${R("hero","d2")} serif`} style={{ fontSize:"clamp(36px,5vw,54px)",lineHeight:1.1,color:navy,margin:"24px 0",letterSpacing:-1.5 }}>
              Chaque litre de gazole<br/>vous donne droit à un<br/><span style={{ color:accent }}>remboursement.</span>
            </h1>
            <p className={`${R("hero","d3")} body-serif`} style={{ fontSize:18,color:textSecondary,lineHeight:1.8,maxWidth:460,marginBottom:40 }}>
              L'État rembourse une partie de l'accise sur le gazole professionnel. 
              Acciseo prend en charge l'intégralité de votre dossier — de l'extraction 
              des données au dépôt administratif. <strong style={{ color:textPrimary }}>Zéro frais si aucun remboursement.</strong>
            </p>
            <div className={R("hero","d4")} style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
              <button className="btn-accent">Demander un diagnostic gratuit <Icon type="arrow" size={16} color="#fff"/></button>
              <button className="btn-ghost">En savoir plus</button>
            </div>
          </div>

          <div className={R("hero","d4")} style={{ background:warmBg,borderRadius:24,padding:36,border:`1px solid ${borderLight}`,position:"relative" }}>
            <div style={{ position:"absolute",top:-20,right:-20,width:120,height:120,borderRadius:"50%",background:"rgba(0,168,107,.06)",filter:"blur(40px)" }}/>
            <div style={{ fontSize:11,fontWeight:600,letterSpacing:3,color:textSecondary,marginBottom:24,textTransform:"uppercase" }}>Exemple — flotte de 20 camions</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20 }}>
              {[
                { label:"Gazole éligible",value:"22 198 L",icon:"fuel" },
                { label:"Remboursement mensuel",value:"3 874 €",icon:"money" },
                { label:"Par véhicule / an",value:"2 324 €",icon:"truck" },
                { label:"Projection annuelle",value:"46 482 €",icon:"chart" },
              ].map(k => (
                <div key={k.label} style={{ background:"#fff",borderRadius:14,padding:"18px 16px",border:`1px solid ${borderLight}` }}>
                  <div style={{ marginBottom:8,opacity:.6 }}><Icon type={k.icon} size={20} color={navy}/></div>
                  <div className="serif" style={{ fontSize:20,fontWeight:400,color:navy }}>{k.value}</div>
                  <div style={{ fontSize:11,color:textSecondary,marginTop:4 }}>{k.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background:accentSoft,borderRadius:10,padding:"10px 16px",fontSize:12,color:accent,fontWeight:500,display:"flex",alignItems:"center",gap:8 }}>
              <Icon type="check" size={14} color={accent}/>Analyse réalisée sur données réelles — 2024
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ borderTop:`1px solid ${borderLight}`,borderBottom:`1px solid ${borderLight}`,padding:"18px 32px",overflow:"hidden" }}>
        <div className="marquee">
          {[...Array(2)].flatMap((_,i) => ["Zéro frais d'avance","Commission au succès uniquement","Diagnostic sous 48h","Conforme DGFiP / DGDDI","Art. L.312-53 du CIBS","Données sécurisées"].map((t,j) => (
            <span key={`${i}-${j}`} style={{ whiteSpace:"nowrap",fontSize:12,color:textSecondary,fontWeight:500,display:"flex",alignItems:"center",gap:8 }}>
              <span style={{ width:5,height:5,borderRadius:"50%",background:accent,opacity:.5 }}/>{t}
            </span>
          )))}
        </div>
      </div>

      {/* PROBLEM */}
      <section data-section="problem" style={{ padding:"100px 32px",maxWidth:1120,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <span className={`${R("problem","d1")} section-label`}>Le constat</span>
          <h2 className={`${R("problem","d2")} serif`} style={{ fontSize:38,color:navy,marginBottom:16 }}>L'argent que vous laissez à l'État</h2>
          <p className={R("problem","d3")} style={{ color:textSecondary,fontSize:16,maxWidth:520,margin:"0 auto",lineHeight:1.7 }}>
            La majorité des transporteurs ne réclament pas leur remboursement d'accise. Chaque trimestre non réclamé, c'est de l'argent définitivement perdu.
          </p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }}>
          {[
            { num:"40%",title:"des PME transport",desc:"ne réclament pas leur remboursement TICPE, par manque de temps ou de connaissance.",delay:"d1" },
            { num:"~5 000 €",title:"par camion par an",desc:"c'est le montant moyen que chaque poids lourd de plus de 7,5 tonnes permet de récupérer.",delay:"d2" },
            { num:"2 ans",title:"de prescription",desc:"passé ce délai, l'argent est définitivement perdu. Les consommations 2024 expirent le 31 décembre 2026.",delay:"d3" },
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
            <h2 className={`${R("services","d2")} serif`} style={{ fontSize:38,color:navy,marginBottom:16 }}>Trois leviers de récupération</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:20 }}>
            {[
              { tag:"Service principal",title:"Rattrapage TICPE 2023-2024",desc:"Vos années non réclamées représentent un capital dormant. Nous remontons jusqu'à 2 ans en arrière pour récupérer chaque euro avant la prescription. Un chèque immédiat, souvent inattendu.",icon:"refresh",accent:accent,num:"01" },
              { tag:"Service récurrent",title:"Gestion TICPE trimestrielle",desc:"Extraction des volumes, croisement avec vos cartes grises, ventilation régionale, dépôt sur SIDECAR Web ou déclaration TVA. Vous n'y pensez plus, l'argent revient.",icon:"calendar",accent:"#2E6BC6",num:"02" },
              { tag:"Expertise complémentaire",title:"Accises alcool — export",desc:"Vous exportez des produits alcoolisés ? Nous gérons le remboursement des droits d'accise à l'export. Même rigueur, même méthode, même rémunération au succès.",icon:"building",accent:"#7B5EA7",num:"03" },
            ].map((s,i) => (
              <div key={s.title} className={`service-card ${R("services")}`} style={{ transitionDelay:`${i*0.1+.1}s` }}>
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
          <span className={`${R("how","d1")} section-label`}>Fonctionnement</span>
          <h2 className={`${R("how","d2")} serif`} style={{ fontSize:38,color:navy }}>Trois étapes, zéro complication</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:48 }}>
          {[
            { num:"01",title:"Vous envoyez vos factures",desc:"BTF, Total, AS24, DKV — tous les fournisseurs. PDF, scan ou photo. Aucun tri nécessaire de votre part.",icon:"file",color:accent },
            { num:"02",title:"On traite votre dossier",desc:"Extraction automatisée, croisement cartes grises, ventilation régionale, préparation de l'état récapitulatif annuel.",icon:"shield",color:"#2E6BC6" },
            { num:"03",title:"Vous êtes remboursé",desc:"Le montant est crédité directement sur votre compte par l'État. Vous ne nous réglez qu'un pourcentage du montant reçu.",icon:"money",color:"#D4820A" },
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
      </section>

      {/* SIMULATOR */}
      <section id="simulateur" data-section="sim" style={{ background:navy,padding:"100px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-100,right:-100,width:400,height:400,borderRadius:"50%",background:"rgba(0,168,107,.06)",filter:"blur(80px)" }}/>
        <div style={{ maxWidth:600,margin:"0 auto",position:"relative",textAlign:"center" }}>
          <span className={`${R("sim","d1")} section-label`} style={{ color:"rgba(0,168,107,.8)" }}>Simulateur</span>
          <h2 className={`${R("sim","d2")} serif`} style={{ fontSize:38,color:"#fff",marginBottom:8 }}>Estimez votre remboursement</h2>
          <p className={R("sim","d3")} style={{ color:"rgba(255,255,255,.45)",fontSize:14,marginBottom:48 }}>Déplacez le curseur pour adapter la simulation à votre flotte</p>
          <div className={R("sim","d4")}>
            <div style={{ marginBottom:48 }}>
              <div style={{ fontSize:13,color:"rgba(255,255,255,.35)",marginBottom:16,fontWeight:500 }}>Nombre de véhicules de plus de 7,5 tonnes</div>
              <input type="range" min={1} max={60} value={camions} onChange={e => setCamions(+e.target.value)} style={{ width:"100%",accentColor:accent,height:4 }}/>
              <div style={{ marginTop:20 }}>
                <span className="serif" style={{ fontSize:72,color:accent,lineHeight:1 }}>{camions}</span>
                <span style={{ fontSize:16,color:"rgba(255,255,255,.3)",marginLeft:10 }}>camions</span>
              </div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
              <div style={{ background:"rgba(255,255,255,.05)",borderRadius:16,padding:24,border:"1px solid rgba(255,255,255,.06)" }}>
                <div style={{ fontSize:10,color:"rgba(255,255,255,.3)",letterSpacing:2,marginBottom:10,fontWeight:600 }}>REMBOURSEMENT ANNUEL</div>
                <div className="serif" style={{ fontSize:32,color:accent }}>{formatEuro(simulTICPE)}</div>
              </div>
              <div style={{ background:"rgba(255,92,92,.06)",borderRadius:16,padding:24,border:"1px solid rgba(255,92,92,.12)" }}>
                <div style={{ fontSize:10,color:"rgba(255,255,255,.3)",letterSpacing:2,marginBottom:10,fontWeight:600 }}>PERDU SI NON RÉCLAMÉ (2 ANS)</div>
                <div className="serif" style={{ fontSize:32,color:"#F09595" }}>{formatEuro(simulTICPE * 2)}</div>
              </div>
            </div>
            <p style={{ fontSize:11,color:"rgba(255,255,255,.2)",marginTop:20 }}>*Estimation basée sur 33 000 L/an/camion, taux moyen. Résultat indicatif.</p>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section data-section="elig" style={{ padding:"100px 32px",maxWidth:1120,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <span className={`${R("elig","d1")} section-label`}>Éligibilité</span>
          <h2 className={`${R("elig","d2")} serif`} style={{ fontSize:38,color:navy }}>Qui peut en bénéficier ?</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }}>
          {[
            { icon:"truck",label:"Transport de marchandises",sub:"Véhicules > 7,5 tonnes" },
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
        <div style={{ maxWidth:1120,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center" }}>
          <div>
            <span className={`${R("why","d1")} section-label`}>Pourquoi Acciseo</span>
            <h2 className={`${R("why","d2")} serif`} style={{ fontSize:36,color:navy,marginBottom:24 }}>Un cabinet spécialisé,<br/>pas un généraliste.</h2>
            <p className={`${R("why","d3")} body-serif`} style={{ fontSize:16,color:textSecondary,lineHeight:1.8 }}>
              Votre expert-comptable gère votre bilan. Les sociétés de cartes carburant s'occupent de vos pleins. 
              Personne ne se concentre exclusivement sur la récupération de vos accises. C'est notre seul métier.
            </p>
          </div>
          <div className={R("why","d3")} style={{ display:"grid",gap:20 }}>
            {[
              { icon:"money",title:"Rémunération au succès",desc:"Aucun frais d'avance. Si nous ne récupérons rien, vous ne payez rien." },
              { icon:"shield",title:"Sécurité documentaire",desc:"Votre ERA est préparé, vos justificatifs organisés. En cas de contrôle, votre dossier est prêt." },
              { icon:"clock",title:"Diagnostic en 48 heures",desc:"Envoyez vos factures. En 48h, vous savez combien l'État vous doit." },
              { icon:"eye",title:"Veille réglementaire",desc:"Taux, portails, formulaires — nous suivons chaque évolution pour vous." },
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

      {/* CONTACT */}
      <section id="contact" data-section="cta" style={{ padding:"100px 32px" }}>
        <div style={{ maxWidth:520,margin:"0 auto",textAlign:"center" }}>
          <span className={`${R("cta","d1")} section-label`}>Contact</span>
          <h2 className={`${R("cta","d2")} serif`} style={{ fontSize:38,color:navy,marginBottom:12 }}>Demandez votre<br/>diagnostic gratuit</h2>
          <p className={R("cta","d3")} style={{ color:textSecondary,fontSize:15,lineHeight:1.7,marginBottom:40 }}>
            Envoyez-nous vos factures carburant. En 48 heures, vous savez exactement combien l'État vous doit.
          </p>
          {!formSent ? (
            <div className={R("cta","d4")} style={{ display:"grid",gap:14,textAlign:"left" }}>
              <input className="input-clean" placeholder="Raison sociale"/>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <input className="input-clean" placeholder="Nom du contact"/>
                <input className="input-clean" placeholder="Téléphone" type="tel"/>
              </div>
              <input className="input-clean" placeholder="Adresse email" type="email"/>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <input className="input-clean" placeholder="Nombre de véhicules" type="number"/>
                <select className="input-clean" style={{ appearance:"auto" }}>
                  <option value="">Type d'activité</option>
                  <option>Transport de marchandises</option>
                  <option>Transport de voyageurs</option>
                  <option>Taxi</option>
                  <option>BTP</option>
                  <option>Export alcool</option>
                  <option>Autre</option>
                </select>
              </div>
              <button className="btn-accent" style={{ width:"100%",marginTop:8 }} onClick={() => setFormSent(true)}>Recevoir mon diagnostic gratuit</button>
              <p style={{ fontSize:11,color:textSecondary,textAlign:"center",marginTop:4 }}>Vos données sont strictement confidentielles et ne seront jamais partagées.</p>
            </div>
          ) : (
            <div style={{ padding:48,background:warmBg,borderRadius:20,border:`1px solid ${borderLight}` }}>
              <div className="icon-circle" style={{ background:accentSoft,margin:"0 auto 16px" }}><Icon type="check" size={24} color={accent}/></div>
              <h3 style={{ color:navy,fontSize:20,marginBottom:8,fontWeight:700 }}>Demande reçue</h3>
              <p style={{ color:textSecondary,fontSize:14,lineHeight:1.6 }}>Nous vous recontactons sous 24 heures avec votre estimation personnalisée.</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:`1px solid ${borderLight}`,padding:"40px 32px",background:warmBg }}>
        <div style={{ maxWidth:1120,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20 }}>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <img src={LOGO_FOOTER} alt="Acciseo" style={{ height:28 }}/>
            <span style={{ fontSize:12,color:textSecondary,marginLeft:4 }}>Spécialiste remboursement d'accises</span>
          </div>
          <div style={{ display:"flex",gap:24,fontSize:12,color:textSecondary }}>
            <span>© 2026 Acciseo</span><span>·</span><span>Mentions légales</span><span>·</span><span>contact@acciseo.fr</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
