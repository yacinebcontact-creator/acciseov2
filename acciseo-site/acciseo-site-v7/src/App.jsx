import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, RATES_2024, ROUTE_IMG } from "./config";

const navy = "#0B1D33";
const accent = "#00A86B";
const warmBg = "#FAFAF7";
const textPrimary = "#1A1A1A";
const textSecondary = "#5C6370";
const borderLight = "rgba(0,0,0,0.08)";

const euro = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const nf = (n) => new Intl.NumberFormat("fr-FR").format(n);
const rate = (n) => n.toFixed(2).replace(".", ",");

const FAQ = [
  { q: "Sur quoi repose ce remboursement ?", a: "Sur l'article L.312-53 du Code des impositions sur les biens et services (CIBS) : les entreprises de transport routier de marchandises peuvent obtenir le remboursement partiel de l'accise sur le gazole consommé par leurs véhicules d'un PTAC supérieur ou égal à 7,5 tonnes." },
  { q: "Quels véhicules sont concernés ?", a: "Les véhicules routiers destinés au transport de marchandises dont le PTAC est supérieur ou égal à 7,5 tonnes, immatriculés dans l'Union européenne, que l'entreprise en soit propriétaire, locataire ou sous-locataire." },
  { q: "Où et jusqu'à quand déposer la demande ?", a: "Pour les consommations jusqu'au 31 décembre 2024, la demande se dépose sur SIDECAR Web (douane, DGDDI), en principe jusqu'au 31 décembre 2026. Pour les consommations à partir du 1er janvier 2025, la demande relève de la DGFiP et passe par l'annexe 3310-TIC de la déclaration de TVA des entreprises françaises concernées. Les délais exacts dépendent de la période : nous les vérifions avec vous lors du premier échange." },
  { q: "Comment êtes-vous rémunérés ?", a: "Au pourcentage du remboursement effectivement obtenu, sans frais d'avance. Le pourcentage est indiqué par écrit avant tout engagement. Aucune prestation n'est facturée sans accord écrit préalable." },
  { q: "De quels documents avez-vous besoin ?", a: "Pour un premier diagnostic, aucun : quelques informations sur votre flotte suffisent. Pour constituer le dossier, il faut ensuite les factures de carburant et les cartes grises des véhicules concernés." },
  { q: "J'ai déjà fait une demande. Puis-je vérifier qu'elle est complète ?", a: "Oui, c'est le rôle de la page Contrôle : vous comparez le montant reçu à une estimation calculée avec les taux officiels. C'est une estimation, pas un audit de vos justificatifs." },
];

export default function App() {
  const [camions, setCamions] = useState(10);
  const [litres, setLitres] = useState(33000);
  const [idf, setIdf] = useState(0);
  const [ara, setAra] = useState(0);
  const [corse, setCorse] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Animations : une entrée sobre pour le héros, apparitions discrètes au défilement. Aucune si mouvement réduit.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("#top .eyebrow, #top h1, #top header p, #top .cta-row, #top aside", { y: 22, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 });
      gsap.set(".blk .wrap > *", { autoAlpha: 0, y: 24 });
      ScrollTrigger.batch(".blk .wrap > *", {
        start: "top 88%", once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, overwrite: true }),
      });
      document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Simulateur : calcul région par région, taux officiels 2024 (douane.gouv.fr)
  const autre = Math.max(0, 100 - idf - ara - corse);
  const totalL = camions * litres;
  const hl = totalL / 100;
  const parts = [
    { k: "autre", pct: autre }, { k: "idf", pct: idf }, { k: "ara", pct: ara }, { k: "corse", pct: corse },
  ].filter((p) => p.pct > 0).map((p) => ({ ...RATES_2024[p.k], pct: p.pct, hl: hl * p.pct / 100, amount: hl * p.pct / 100 * RATES_2024[p.k].eurPerHl }));
  const simul = parts.reduce((s, p) => s + p.amount, 0);

  const link = { color: textSecondary, fontSize: 13, textDecoration: "none", fontWeight: 500 };
  const navItems = [["Échéances", "#echeances"], ["Éligibilité", "#eligibilite"], ["Simulateur", "#simulateur"], ["FAQ", "#faq"]];

  return (
    <div style={{ background: "#fff", color: textPrimary, fontFamily: "'Outfit','Helvetica Neue',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;scroll-padding-top:84px}
        @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}
        a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,summary:focus-visible{outline:2px solid ${accent};outline-offset:2px}
        input:focus,select:focus,textarea:focus{outline:none;border-color:${accent}!important;background:#fff!important;box-shadow:0 0 0 3px rgba(0,168,107,.12)}
        .serif{font-family:'Outfit','Helvetica Neue',sans-serif;font-weight:300;letter-spacing:-0.025em}
        h1.serif{letter-spacing:-0.03em}
        h3{font-weight:500}
        body{-webkit-font-smoothing:antialiased}
        .btn-accent{background:${accent};color:#fff;border:none;padding:15px 32px;border-radius:10px;font-family:'Outfit',sans-serif;font-weight:500;font-size:15px;cursor:pointer;transition:background .2s;text-decoration:none;display:inline-block;text-align:center}
        .btn-accent:hover{background:#00945E}
        .btn-line{background:#fff;color:${navy};border:1.5px solid ${borderLight};padding:13.5px 28px;border-radius:10px;font-family:'Outfit',sans-serif;font-weight:500;font-size:15px;cursor:pointer;text-decoration:none;display:inline-block;transition:border-color .2s}
        .btn-line:hover{border-color:${navy}}
        .eyebrow{font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${accent};margin-bottom:14px;display:block}
        .wrap{max-width:1080px;margin:0 auto;padding:0 32px}
        section.blk{padding:88px 0}
        .nav-burger{display:none;background:none;border:none;cursor:pointer;padding:12px;flex-direction:column;gap:5px}
        .faq-btn{width:100%;text-align:left;background:none;border:none;padding:20px 0;display:flex;justify-content:space-between;gap:16px;font-family:'Outfit',sans-serif;font-size:16px;font-weight:600;color:${navy};cursor:pointer}
        input[type=range]{accent-color:${accent};width:100%}
        .num{font-variant-numeric:tabular-nums}
        @media(max-width:900px){
          .wrap{padding:0 20px}
          section.blk{padding:60px 0}
          .two{grid-template-columns:1fr!important;gap:32px!important}
          .three{grid-template-columns:1fr!important;gap:28px!important}
          .form-row{grid-template-columns:1fr!important}
          .nav-links{display:none!important}
          .nav-burger{display:flex}
          .btn-accent,.btn-line{width:100%}
          .cta-row a{width:100%}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,.97)", borderBottom: `1px solid ${borderLight}`, boxShadow: scrolled ? "0 6px 24px rgba(11,29,51,.06)" : "none", transition: "box-shadow .3s" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <a href="#top"><img src="./logo-nav.png" alt="Acciseo" style={{ height: 32, display: "block" }} /></a>
          <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navItems.map(([t, h]) => <a key={t} href={h} style={link}>{t}</a>)}
            <a href="./controle" style={link}>Contrôle d'une demande</a>
            <a href={`tel:${PHONE_TEL}`} style={{ color: navy, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{PHONE_DISPLAY}</a>
            <a href="#contact" className="btn-accent" style={{ padding: "10px 22px", fontSize: 14 }}>Vérifier mon éligibilité</a>
          </div>
          <button className="nav-burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            <span style={{ width: 22, height: 2, background: navy }} /><span style={{ width: 22, height: 2, background: navy }} /><span style={{ width: 22, height: 2, background: navy }} />
          </button>
        </div>
        {menuOpen && (
          <div className="wrap" style={{ display: "flex", flexDirection: "column", padding: "8px 20px 20px", borderTop: `1px solid ${borderLight}` }}>
            {navItems.map(([t, h]) => <a key={t} href={h} onClick={() => setMenuOpen(false)} style={{ color: navy, fontSize: 16, fontWeight: 600, textDecoration: "none", padding: "13px 0" }}>{t}</a>)}
            <a href="./controle" style={{ color: navy, fontSize: 16, fontWeight: 600, textDecoration: "none", padding: "13px 0" }}>Contrôle d'une demande</a>
            <a href={`tel:${PHONE_TEL}`} style={{ color: navy, fontSize: 16, fontWeight: 600, textDecoration: "none", padding: "13px 0" }}>{PHONE_DISPLAY}</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <header id="top" className="wrap" style={{ padding: "84px 32px 72px" }}>
        <div className="two" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <span className="eyebrow">Transport routier de marchandises</span>
            <h1 className="serif" style={{ fontSize: "clamp(38px,5.4vw,60px)", lineHeight: 1.05, color: navy, letterSpacing: "-0.03em" }}>
              Récupérez l'accise sur votre gazole professionnel.
            </h1>
            <p style={{ fontSize: 18, color: textSecondary, lineHeight: 1.7, margin: "26px 0 34px", maxWidth: 540 }}>
              Vous exploitez des poids lourds de 7,5 tonnes et plus ? Acciseo vérifie vos justificatifs, calcule votre remboursement potentiel et prépare votre dossier de demande.
            </p>
            <div className="cta-row" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              <a href="#contact" className="btn-accent">Vérifier mon éligibilité</a>
              <a href={`tel:${PHONE_TEL}`} className="btn-line">Appeler le {PHONE_DISPLAY}</a>
            </div>
          </div>

          <aside aria-label="Dates à retenir" style={{ borderLeft: `1px solid ${borderLight}`, paddingLeft: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: textSecondary, marginBottom: 14 }}>Consommations 2024</div>
            <div className="serif" style={{ fontSize: "clamp(40px,5vw,60px)", color: navy, lineHeight: 1 }}>31 décembre 2026</div>
            <p style={{ fontSize: 15, color: textSecondary, lineHeight: 1.7, marginTop: 16, maxWidth: 340 }}>
              Date limite de la demande de remboursement, à déposer sur SIDECAR Web (douane).
            </p>
            <p style={{ fontSize: 14, color: textSecondary, lineHeight: 1.7, marginTop: 28, paddingTop: 20, borderTop: `1px solid ${borderLight}`, maxWidth: 340 }}>
              À partir du 1er janvier 2025, la demande relève de la DGFiP.
            </p>
          </aside>
        </div>
      </header>

      {/* PHOTO D'AMBIANCE */}
      <div role="presentation" style={{ height: "clamp(180px,28vw,340px)", backgroundColor: navy, backgroundImage: `linear-gradient(rgba(11,29,51,.35),rgba(11,29,51,.35)), url(${ROUTE_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }} />

      {/* ÉCHÉANCES */}
      <section id="echeances" className="blk" style={{ background: warmBg, borderTop: `1px solid ${borderLight}`, borderBottom: `1px solid ${borderLight}` }}>
        <div className="wrap">
          <span className="eyebrow">Échéances</span>
          <h2 className="serif" style={{ fontSize: 36, color: navy, lineHeight: 1.15, marginBottom: 36, maxWidth: 620 }}>Deux périodes, deux administrations.</h2>
          <div className="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div style={{ borderTop: `2px solid ${navy}`, paddingTop: 20 }}>
              <h3 style={{ fontSize: 18, color: navy, marginBottom: 10 }}>Consommations jusqu'au 31 décembre 2024</h3>
              <p style={{ fontSize: 15, color: textSecondary, lineHeight: 1.7 }}>Demande auprès de la douane (DGDDI), obligatoirement via le service en ligne SIDECAR Web. Le délai court jusqu'au 31 décembre de la deuxième année suivant la période : pour les consommations de 2024, le <strong style={{ color: textPrimary }}>31 décembre 2026</strong>.</p>
            </div>
            <div style={{ borderTop: `2px solid ${navy}`, paddingTop: 20 }}>
              <h3 style={{ fontSize: 18, color: navy, marginBottom: 10 }}>Consommations à partir du 1er janvier 2025</h3>
              <p style={{ fontSize: 15, color: textSecondary, lineHeight: 1.7 }}>Demande auprès de la DGFiP. Pour les entreprises françaises concernées, elle passe par l'annexe 3310-TIC de la déclaration de TVA. Les modalités et délais sont à confirmer avec nous selon votre situation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTHODE */}
      <section className="blk">
        <div className="wrap">
          <span className="eyebrow">Méthode</span>
          <h2 className="serif" style={{ fontSize: 36, color: navy, lineHeight: 1.15, marginBottom: 40, maxWidth: 620 }}>Ce que fait Acciseo, dans l'ordre.</h2>
          <div className="three" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 48 }}>
            {[
              ["1", "Premier diagnostic", "Quelques informations sur votre flotte et vos périodes de consommation permettent de dire si une demande est envisageable, et dans quel cadre."],
              ["2", "Vérification et calcul", "Contrôle de vos factures de carburant et de vos cartes grises, rattachement de chaque litre à un véhicule éligible, calcul région par région avec les taux officiels."],
              ["3", "Préparation du dossier", "Nous préparons la demande à déposer. Le remboursement est versé par l'administration ; notre rémunération est un pourcentage du montant obtenu."],
            ].map(([n, t, d]) => (
              <div key={n}>
                <div className="serif" style={{ fontSize: 40, color: accent, lineHeight: 1, marginBottom: 14 }}>{n}</div>
                <h3 style={{ fontSize: 18, color: navy, marginBottom: 10 }}>{t}</h3>
                <p style={{ fontSize: 15, color: textSecondary, lineHeight: 1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉLIGIBILITÉ */}
      <section id="eligibilite" className="blk" style={{ background: warmBg, borderTop: `1px solid ${borderLight}`, borderBottom: `1px solid ${borderLight}` }}>
        <div className="wrap two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <span className="eyebrow">Éligibilité</span>
            <h2 className="serif" style={{ fontSize: 36, color: navy, lineHeight: 1.15 }}>Qui peut déposer une demande ?</h2>
          </div>
          <ul style={{ listStyle: "none", display: "grid", gap: 0 }}>
            {[
              "Entreprise de transport routier de marchandises, dont le siège est dans l'Union européenne.",
              "Véhicules routiers d'un PTAC supérieur ou égal à 7,5 tonnes, immatriculés dans l'Union européenne.",
              "Véhicules détenus en propriété, en location ou en sous-location.",
              "Gazole acheté pour ces véhicules, justifié par des factures.",
            ].map((t) => (
              <li key={t} style={{ padding: "16px 0", borderBottom: `1px solid ${borderLight}`, fontSize: 16, color: textPrimary, lineHeight: 1.6 }}>{t}</li>
            ))}
            <li style={{ paddingTop: 16, fontSize: 14, color: textSecondary, lineHeight: 1.6 }}>Conditions résumées d'après les informations publiées par la douane. L'éligibilité de votre entreprise se confirme lors du diagnostic.</li>
          </ul>
        </div>
      </section>

      {/* LE CALCUL */}
      <section className="blk" style={{ borderBottom: `1px solid ${borderLight}` }}>
        <div className="wrap">
          <span className="eyebrow">Le calcul</span>
          <h2 className="serif" style={{ fontSize: 36, color: navy, lineHeight: 1.15, marginBottom: 40, maxWidth: 620 }}>Une ligne suffit à comprendre.</h2>
          <div className="calc-row" style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
            {[["Gazole acheté", "en hectolitres"], ["×", ""], ["Taux de la région d'achat", "en € par hectolitre"], ["=", ""], ["Remboursement", "avant commission"]].map(([t, sub], i) =>
              sub === "" ? <span key={i} className="serif" style={{ fontSize: 40, color: accent }}>{t}</span> : (
                <div key={i} style={{ borderTop: `2px solid ${navy}`, paddingTop: 14, minWidth: 190 }}>
                  <div className="serif" style={{ fontSize: 26, color: navy, lineHeight: 1.2 }}>{t}</div>
                  <div style={{ fontSize: 13, color: textSecondary, marginTop: 6 }}>{sub}</div>
                </div>
              )
            )}
          </div>
          <p style={{ fontSize: 14, color: textSecondary, lineHeight: 1.7, marginTop: 32, maxWidth: 640 }}>
            Taux 2024 publiés par la douane : {rate(RATES_2024.autre.eurPerHl)} €/hl dans la plupart des régions, {rate(RATES_2024.idf.eurPerHl)} en Île-de-France, {rate(RATES_2024.ara.eurPerHl)} en Auvergne-Rhône-Alpes, {rate(RATES_2024.corse.eurPerHl)} en Corse.
          </p>
        </div>
      </section>

      {/* SIMULATEUR */}
      <section id="simulateur" className="blk">
        <div className="wrap">
          <span className="eyebrow">Simulateur</span>
          <h2 className="serif" style={{ fontSize: 36, color: navy, lineHeight: 1.15, marginBottom: 12, maxWidth: 620 }}>Estimez votre remboursement 2024.</h2>
          <p style={{ fontSize: 15, color: textSecondary, lineHeight: 1.7, maxWidth: 620, marginBottom: 40 }}>Estimation pour des consommations de 2024, au taux officiel de chaque région d'achat. C'est un ordre de grandeur, pas un montant garanti.</p>
          <div className="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            <div style={{ display: "grid", gap: 22 }}>
              <div>
                <label htmlFor="s-veh" style={{ fontSize: 14, fontWeight: 600, color: navy, display: "block", marginBottom: 8 }}>Véhicules de PTAC ≥ 7,5 t : <span className="num">{camions}</span></label>
                <input id="s-veh" type="range" min={1} max={80} value={camions} onChange={(e) => setCamions(+e.target.value)} />
              </div>
              <div>
                <label htmlFor="s-l" style={{ fontSize: 14, fontWeight: 600, color: navy, display: "block", marginBottom: 8 }}>Gazole acheté par véhicule et par an (litres)</label>
                <input id="s-l" type="number" min={0} value={litres} onChange={(e) => setLitres(Math.max(0, +e.target.value || 0))} style={{ background: warmBg, border: `1.5px solid ${borderLight}`, borderRadius: 10, padding: "12px 14px", fontFamily: "inherit", fontSize: 15, width: "100%" }} />
                <div style={{ fontSize: 12, color: textSecondary, marginTop: 6 }}>Hypothèse modifiable : reprenez la consommation réelle de votre flotte.</div>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: navy, marginBottom: 8 }}>Part du gazole achetée par région</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[["Île-de-France", idf, setIdf, "idf"], ["Auvergne-Rhône-Alpes", ara, setAra, "ara"], ["Corse", corse, setCorse, "corse"]].map(([l, val, setter, id]) => {
                    const others = (id === "idf" ? 0 : idf) + (id === "ara" ? 0 : ara) + (id === "corse" ? 0 : corse);
                    return (
                      <div key={id}>
                        <label htmlFor={`s-${id}`} style={{ fontSize: 12, color: textSecondary, display: "block", marginBottom: 4 }}>{l} (%)</label>
                        <input id={`s-${id}`} type="number" min={0} max={100 - others} value={val} onChange={(e) => setter(Math.min(100 - others, Math.max(0, +e.target.value || 0)))} style={{ background: warmBg, border: `1.5px solid ${borderLight}`, borderRadius: 10, padding: "10px 12px", fontFamily: "inherit", fontSize: 15, width: "100%" }} />
                      </div>
                    );
                  })}
                  <div>
                    <div style={{ fontSize: 12, color: textSecondary, marginBottom: 4 }}>Autres régions (%)</div>
                    <div className="num" style={{ padding: "11px 0", fontSize: 15 }}>{autre}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: navy, color: "#fff", borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 10 }}>Remboursement estimé, consommations 2024</div>
              <div className="serif num" style={{ fontSize: 48, lineHeight: 1.05, marginBottom: 22 }}>{euro(simul)}</div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,.14)", paddingTop: 16, fontSize: 13, color: "rgba(255,255,255,.8)", lineHeight: 1.8 }} className="num">
                <div style={{ color: "rgba(255,255,255,.55)", marginBottom: 6 }}>Hypothèses du calcul</div>
                <div>{camions} véhicule{camions > 1 ? "s" : ""} × {nf(litres)} L = {nf(totalL)} L ({nf(hl)} hl)</div>
                {parts.map((p) => (
                  <div key={p.label}>{p.label} : {nf(Math.round(p.hl))} hl × {rate(p.eurPerHl)} €/hl = {euro(p.amount)}</div>
                ))}
                <div style={{ marginTop: 8, color: "rgba(255,255,255,.55)", fontSize: 12 }}>Taux 2024 publiés par la douane. Pas de taux forfaitaire : le calcul est fait région par région.</div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: textSecondary, marginTop: 24, maxWidth: 700, lineHeight: 1.6 }}>Vous avez déjà déposé une demande ? <a href="./controle" style={{ color: navy, fontWeight: 600 }}>Comparez le montant reçu à cette estimation.</a></p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="blk" style={{ background: warmBg, borderTop: `1px solid ${borderLight}`, borderBottom: `1px solid ${borderLight}` }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <span className="eyebrow">Questions fréquentes</span>
          <h2 className="serif" style={{ fontSize: 36, color: navy, lineHeight: 1.15, marginBottom: 28 }}>Avant de nous contacter.</h2>
          {FAQ.map((item, i) => (
            <div key={item.q} style={{ borderTop: `1px solid ${borderLight}`, ...(i === FAQ.length - 1 ? { borderBottom: `1px solid ${borderLight}` } : {}) }}>
              <button className="faq-btn" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{item.q}</span><span aria-hidden="true" style={{ color: accent, fontSize: 22, lineHeight: 1 }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ fontSize: 15, color: textSecondary, lineHeight: 1.75, paddingBottom: 22 }}>{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* INTERLOCUTEUR */}
      <section className="blk" style={{ borderTop: `1px solid ${borderLight}` }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <span className="eyebrow">Votre interlocuteur</span>
          <h2 className="serif" style={{ fontSize: 36, color: navy, lineHeight: 1.15, marginBottom: 18 }}>Une seule personne suit votre dossier.</h2>
          <p style={{ fontSize: 17, color: textSecondary, lineHeight: 1.75 }}>
            Acciseo est une entreprise individuelle. Vous échangez directement avec Yacine Bali, fondateur, par téléphone au <a href={`tel:${PHONE_TEL}`} style={{ color: navy, fontWeight: 500 }}>{PHONE_DISPLAY}</a> ou par e-mail à <a href={`mailto:${EMAIL}`} style={{ color: navy, fontWeight: 500 }}>{EMAIL}</a>. Pas de centre d'appels, pas de formulaire sans réponse.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="blk">
        <div className="wrap two" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "start" }}>
          <div>
            <span className="eyebrow">Premier diagnostic</span>
            <h2 className="serif" style={{ fontSize: 36, color: navy, lineHeight: 1.15, marginBottom: 18 }}>Vérifier mon éligibilité.</h2>
            <p style={{ fontSize: 16, color: textSecondary, lineHeight: 1.7, marginBottom: 24 }}>Dites-nous qui vous êtes et combien de véhicules de 7,5 tonnes et plus vous exploitez. Nous revenons vers vous pour dire si une demande est envisageable. Pas de document à envoyer à ce stade.</p>
            <p style={{ fontSize: 15, lineHeight: 2, color: textPrimary }}>
              <a href={`tel:${PHONE_TEL}`} style={{ color: navy, fontWeight: 600, textDecoration: "none" }}>{PHONE_DISPLAY}</a><br />
              <a href={`mailto:${EMAIL}`} style={{ color: navy, fontWeight: 600, textDecoration: "none" }}>{EMAIL}</a>
            </p>
          </div>
          <ContactForm source="accueil" />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${borderLight}`, padding: "44px 0", background: "#fff" }}>
        <div className="wrap">
          <div className="two" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48, marginBottom: 32 }}>
            <div>
              <img src="./logo-footer.png" alt="Acciseo" style={{ height: 28, marginBottom: 14 }} />
              <p style={{ fontSize: 13, color: textSecondary, lineHeight: 1.7, maxWidth: 380 }}>Remboursement partiel de l'accise sur le gazole professionnel pour les entreprises de transport routier de marchandises.</p>
            </div>
            <p style={{ fontSize: 13, color: textSecondary, lineHeight: 2 }}>
              <a href={`tel:${PHONE_TEL}`} style={{ color: textSecondary, textDecoration: "none" }}>{PHONE_DISPLAY}</a><br />
              <a href={`mailto:${EMAIL}`} style={{ color: textSecondary, textDecoration: "none" }}>{EMAIL}</a>
            </p>
          </div>
          <div style={{ borderTop: `1px solid ${borderLight}`, paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 11.5, color: textSecondary, lineHeight: 1.8 }}>
            <div>© 2026 Acciseo — Entrepreneur individuel<br />SIRET 105 464 259 00016 — RCS Pontoise — APE 70.22Z<br />Responsable de la publication : Yacine Bali</div>
            <div>Hébergeur : Vercel Inc.<br />440 N Barranca Ave #4133, Covina, CA 91723, USA</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
