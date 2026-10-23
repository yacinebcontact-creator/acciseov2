import { useState } from "react";
import ContactForm from "./ContactForm";
import { PHONE_DISPLAY, PHONE_TEL, RATES_2024 } from "./config";

const navy = "#0B1D33", accent = "#00A86B", warm = "#FAFAF7", t2 = "#5C6370", border = "rgba(0,0,0,.08)";
const fmt = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(n));
const nf = (n) => new Intl.NumberFormat("fr-FR").format(Math.round(n));
const rate = (n) => n.toFixed(2).replace(".", ",");

const input = { background: warm, border: `1.5px solid ${border}`, borderRadius: 10, padding: "12px 14px", fontFamily: "'Outfit',sans-serif", fontSize: 15, width: "100%", color: navy };
const seg = (active) => ({ flex: 1, padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${active ? accent : border}`, background: active ? "rgba(0,168,107,.08)" : "#fff", color: navy, fontWeight: active ? 600 : 500, fontSize: 14, cursor: "pointer", fontFamily: "'Outfit',sans-serif" });

const Field = ({ id, label, hint, children }) => (
  <div style={{ marginBottom: 20 }}>
    <label htmlFor={id} style={{ display: "block", fontSize: 14, fontWeight: 600, color: navy, marginBottom: 6 }}>{label}</label>
    {children}
    {hint && <div style={{ fontSize: 12, color: t2, marginTop: 5, lineHeight: 1.5 }}>{hint}</div>}
  </div>
);

export default function Controle() {
  const [veh, setVeh] = useState(12);
  const [litres, setLitres] = useState(33000);
  const [idf, setIdf] = useState(0);
  const [ara, setAra] = useState(0);
  const [corse, setCorse] = useState(0);
  const [claimed, setClaimed] = useState("non");
  const [received, setReceived] = useState("");

  const autre = Math.max(0, 100 - idf - ara - corse);
  const hl = (veh * litres) / 100;
  const shares = { autre, idf, ara, corse };
  const lines = Object.keys(shares).filter((k) => shares[k] > 0).map((k) => ({ ...RATES_2024[k], pct: shares[k], hl: hl * shares[k] / 100, amount: hl * shares[k] / 100 * RATES_2024[k].eurPerHl }));
  const est = lines.reduce((s, l) => s + l.amount, 0);
  const rec = parseFloat(String(received).replace(/\s/g, "").replace(",", ".")) || 0;
  const gap = est - rec;
  const gapPct = est > 0 ? (gap / est) * 100 : 0;

  let verdict;
  if (claimed === "non") verdict = { title: "Aucune demande déposée pour 2024", text: `Selon ces hypothèses, l'estimation est d'environ ${fmt(est)}. Les consommations 2024 peuvent faire l'objet d'une demande sur SIDECAR Web jusqu'au 31 décembre 2026.` };
  else if (rec === 0) verdict = { title: "Indiquez le montant reçu", text: "Additionnez les remboursements reçus au titre des consommations 2024 (relevés bancaires ou export SIDECAR Web)." };
  else if (gapPct > 5) verdict = { title: `Écart à expliquer : ${fmt(gap)}`, text: "Le montant reçu est inférieur à l'estimation. Cela ne prouve pas une erreur : une partie du gazole peut être non éligible ou non justifiée. Seul l'examen des factures et des cartes grises le dira." };
  else if (gapPct < -5) verdict = { title: "Montant reçu supérieur à l'estimation", text: "Vérifiez vos hypothèses (litres, répartition par région). Un écart dans ce sens peut venir d'hypothèses trop basses." };
  else verdict = { title: "Montant cohérent avec l'estimation", text: "Le montant reçu est proche de l'estimation. Ce contrôle ne vérifie ni les justificatifs ni l'exhaustivité des véhicules déclarés." };

  const context = `Contrôle d'une demande 2024 — véhicules : ${veh}, litres/véhicule : ${litres}, répartition IDF ${idf}% / ARA ${ara}% / Corse ${corse}% / autres ${autre}%, demande déjà déposée : ${claimed === "oui" ? "oui, " + fmt(rec) + " reçus" : "non"}, estimation : ${fmt(est)}.`;

  const shareInput = (id, label, val, setter, others) => (
    <div>
      <label htmlFor={id} style={{ fontSize: 12, color: t2, display: "block", marginBottom: 4 }}>{label} (%)</label>
      <input id={id} type="number" min={0} max={100 - others} style={input} value={val} onChange={(e) => setter(Math.min(100 - others, Math.max(0, +e.target.value || 0)))} />
    </div>
  );

  return (
    <div style={{ background: "#fff", color: "#1A1A1A", fontFamily: "'Outfit','Helvetica Neue',sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        .serif{font-family:'Outfit','Helvetica Neue',sans-serif;font-weight:300;letter-spacing:-0.025em}
        h1.serif{letter-spacing:-0.03em}
        h3{font-weight:500}
        body{-webkit-font-smoothing:antialiased}
        .num{font-variant-numeric:tabular-nums}
        .btn-accent{background:${accent};color:#fff;border:none;padding:15px 32px;border-radius:10px;font-family:'Outfit',sans-serif;font-weight:500;font-size:15px;cursor:pointer}
        .btn-accent:hover{background:#00945E}
        input[type=range]{accent-color:${accent};width:100%}
        input:focus,select:focus,textarea:focus{outline:none;border-color:${accent}!important;box-shadow:0 0 0 3px rgba(0,168,107,.12)}
        a:focus-visible,button:focus-visible{outline:2px solid ${accent};outline-offset:2px}
        @media(max-width:900px){.grid2{grid-template-columns:1fr!important}.form-row{grid-template-columns:1fr!important}}
      `}</style>

      <nav style={{ borderBottom: `1px solid ${border}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="./"><img src="./logo-nav.png" alt="Acciseo" style={{ height: 30, display: "block" }} /></a>
          <a href={`tel:${PHONE_TEL}`} style={{ color: navy, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{PHONE_DISPLAY}</a>
        </div>
      </nav>

      <header style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 28px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>Contrôle d'une demande 2024</div>
        <h1 className="serif" style={{ fontSize: "clamp(30px,4.2vw,44px)", color: navy, lineHeight: 1.12, letterSpacing: "-0.03em", maxWidth: 720 }}>
          Vous avez déjà déposé une demande ? Comparez-la à une estimation.
        </h1>
        <p style={{ color: t2, fontSize: 16, maxWidth: 640, marginTop: 16, lineHeight: 1.7 }}>
          Pour des consommations jusqu'au 31 décembre 2024, transport routier de marchandises, véhicules de PTAC supérieur ou égal à 7,5 tonnes. L'estimation utilise les taux officiels 2024 de chaque région d'achat.
        </p>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px 72px" }}>
        <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
          <div style={{ border: `1px solid ${border}`, borderRadius: 16, padding: 28 }}>
            <Field id="c-veh" label={`Véhicules de PTAC ≥ 7,5 t : ${veh}`} hint="En propriété ou en location.">
              <input id="c-veh" type="range" min={1} max={80} value={veh} onChange={(e) => setVeh(+e.target.value)} />
            </Field>
            <Field id="c-l" label="Gazole acheté par véhicule et par an (litres)" hint="Reprenez la consommation réelle de votre flotte, relevée sur vos factures.">
              <input id="c-l" style={input} type="number" min={0} value={litres} onChange={(e) => setLitres(Math.max(0, +e.target.value || 0))} />
            </Field>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: navy, marginBottom: 6 }}>Part du gazole achetée par région</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {shareInput("c-idf", "Île-de-France", idf, setIdf, ara + corse)}
                {shareInput("c-ara", "Auvergne-Rhône-Alpes", ara, setAra, idf + corse)}
                {shareInput("c-cor", "Corse", corse, setCorse, idf + ara)}
                <div><div style={{ fontSize: 12, color: t2, marginBottom: 4 }}>Autres régions (%)</div><div className="num" style={{ padding: "11px 0", fontSize: 15 }}>{autre}</div></div>
              </div>
            </div>
            <Field id="c-cl" label="Avez-vous déjà déposé une demande pour 2024 ?">
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" style={seg(claimed === "non")} onClick={() => setClaimed("non")}>Non</button>
                <button type="button" style={seg(claimed === "oui")} onClick={() => setClaimed("oui")}>Oui</button>
              </div>
            </Field>
            {claimed === "oui" && (
              <Field id="c-rec" label="Total reçu pour 2024 (€)" hint="Somme de tous les remboursements reçus au titre de 2024, pas un seul virement.">
                <input id="c-rec" style={input} type="text" inputMode="decimal" value={received} onChange={(e) => setReceived(e.target.value)} />
              </Field>
            )}
          </div>

          <div>
            <div style={{ background: navy, borderRadius: 16, padding: 28, color: "#fff" }}>
              <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 10 }}>Estimation, consommations 2024</div>
              <div className="serif num" style={{ fontSize: 44, lineHeight: 1.05, marginBottom: 18 }}>{fmt(est)}</div>
              <div className="num" style={{ borderTop: "1px solid rgba(255,255,255,.14)", paddingTop: 14, fontSize: 13, color: "rgba(255,255,255,.8)", lineHeight: 1.8 }}>
                <div style={{ color: "rgba(255,255,255,.55)" }}>Hypothèses du calcul</div>
                <div>{veh} × {nf(litres)} L = {nf(hl * 100)} L ({nf(hl)} hl)</div>
                {lines.map((l) => <div key={l.label}>{l.label} : {nf(l.hl)} hl × {rate(l.eurPerHl)} €/hl = {fmt(l.amount)}</div>)}
              </div>
              {claimed === "oui" && rec > 0 && (
                <div className="num" style={{ display: "flex", justifyContent: "space-between", marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.14)", fontSize: 14 }}>
                  <span>Reçu : {fmt(rec)}</span><span>Écart : {fmt(gap)}</span>
                </div>
              )}
              <div style={{ background: "#fff", color: "#1A1A1A", borderRadius: 12, padding: 18, marginTop: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: navy, marginBottom: 6 }}>{verdict.title}</div>
                <div style={{ fontSize: 13.5, color: "#3a3f47", lineHeight: 1.65 }}>{verdict.text}</div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: t2, marginTop: 14, lineHeight: 1.6 }}>
              Estimation indicative, calculée avec les taux 2024 publiés par la douane (€/hl, sans taux forfaitaire). Elle ne remplace pas l'examen des factures et des cartes grises.
            </p>
          </div>
        </div>

        <section id="contact" style={{ marginTop: 64, maxWidth: 640 }}>
          <h2 className="serif" style={{ fontSize: 30, color: navy, marginBottom: 8 }}>Faire examiner mon dossier</h2>
          <p style={{ fontSize: 15, color: t2, lineHeight: 1.7, marginBottom: 22 }}>Le résultat de ce contrôle est joint à votre demande. Aucun document à envoyer à ce stade.</p>
          <ContactForm context={context} source="controle" />
        </section>
      </main>

      <footer style={{ borderTop: `1px solid ${border}`, padding: "28px 24px", textAlign: "center", fontSize: 11.5, color: t2 }}>
        © 2026 Acciseo — SIRET 105 464 259 00016 — RCS Pontoise — <a href="./" style={{ color: t2 }}>acciseo.fr</a>
      </footer>
    </div>
  );
}
