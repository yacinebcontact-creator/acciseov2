import { useState, useMemo } from "react";

const RATES = {
  trm: { idf: 0.1745, corse: 0.1421, autre: 0.1556, label: "Transport de marchandises (PL ≥ 7,5 t)" },
  trv: { idf: 0.2345, corse: 0.2021, autre: 0.2156, label: "Transport de voyageurs (autocars ≥ 10 places)" },
};

const fmt = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)));
const fmtL = (n) => new Intl.NumberFormat("fr-FR").format(Math.round(n)) + " L";

export default function Controle() {
  const [mode, setMode] = useState("trm");
  const [veh, setVeh] = useState(12);
  const [litres, setLitres] = useState(33000);
  const [idf, setIdf] = useState(70);
  const [corse, setCorse] = useState(0);
  const [claimed, setClaimed] = useState("non");
  const [received, setReceived] = useState("");
  const [ventil, setVentil] = useState("nsp");
  const [sent, setSent] = useState(false);

  const navy = "#0B1D33", accent = "#00A86B", warm = "#FAFAF7", t2 = "#5C6370", border = "rgba(0,0,0,.06)";

  const r = RATES[mode];
  const autre = Math.max(0, 100 - idf - corse);
  const totalL = veh * litres;
  const theo = totalL * ((idf / 100) * r.idf + (corse / 100) * r.corse + (autre / 100) * r.autre);
  const flat = totalL * r.autre; // ce qu'on obtient si tout est déclaré au taux standard
  const idfLoss = totalL * (idf / 100) * (r.idf - r.autre); // manque à gagner si IDF non ventilée
  const rec = parseFloat(String(received).replace(/\s/g, "").replace(",", ".")) || 0;
  const gap = claimed === "oui" ? theo - rec : theo;
  const gapPct = claimed === "oui" && theo > 0 ? (gap / theo) * 100 : 100;

  const verdict = useMemo(() => {
    if (claimed === "non") return { level: "high", title: "Vous n'avez rien réclamé sur 2024", text: `Vous pouvez encore récupérer environ ${fmt(theo)}. Les consommations 2024 sont prescrites au 31 décembre 2026.` };
    if (rec === 0) return { level: "mid", title: "Indiquez le montant reçu", text: "Additionnez les virements DGDDI / RTICPE reçus au titre de 2024 (relevés bancaires ou export SIDECAR)." };
    if (gapPct > 15) return { level: "high", title: `Écart probable : ${fmt(gap)}`, text: "Votre remboursement est nettement inférieur à l'estimation. Causes fréquentes : ventilation régionale absente, véhicules loués non déclarés, semestre manquant." };
    if (gapPct > 5) return { level: "mid", title: `Écart possible : ${fmt(gap)}`, text: "L'écart est modéré mais réel. Une vérification ligne par ligne permet de le confirmer et de sécuriser le dossier en cas de contrôle." };
    return { level: "ok", title: "Dossier cohérent", text: "Votre remboursement 2024 correspond à l'estimation. Restent à vérifier la traçabilité (ERA) et la ventilation exacte, mais rien n'indique d'argent laissé de côté." };
  }, [claimed, rec, gap, gapPct, theo]);

  const mailto = `mailto:contact@acciseo.fr?subject=${encodeURIComponent("Diagnostic gratuit TICPE 2024")}&body=${encodeURIComponent(
    `Bonjour,\n\nRésultat du contrôle en ligne :\n- Activité : ${r.label}\n- Véhicules : ${veh}\n- Litres/an/véhicule : ${litres}\n- Répartition : IDF ${idf}% / Corse ${corse}% / autres ${autre}%\n- Remboursement 2024 déjà réclamé : ${claimed === "oui" ? "oui, " + fmt(rec) + " reçus" : "non"}\n- Estimation Acciseo : ${fmt(theo)}\n- Écart estimé : ${fmt(gap)}\n\nMerci de me recontacter pour un diagnostic gratuit.\n\nRaison sociale :\nTéléphone :`
  )}`;

  const Field = ({ label, children, hint }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: navy, marginBottom: 6 }}>{label}</div>
      {children}
      {hint && <div style={{ fontSize: 11, color: t2, marginTop: 5 }}>{hint}</div>}
    </div>
  );
  const input = { background: warm, border: "1.5px solid transparent", borderRadius: 12, padding: "13px 16px", fontFamily: "'Outfit',sans-serif", fontSize: 15, width: "100%", color: navy };
  const seg = (active) => ({ flex: 1, padding: "11px 12px", borderRadius: 10, border: `1.5px solid ${active ? accent : border}`, background: active ? "rgba(0,168,107,.08)" : "#fff", color: navy, fontWeight: active ? 600 : 500, fontSize: 13, cursor: "pointer", fontFamily: "'Outfit',sans-serif" });

  const colors = { high: { bg: "#FEF2F2", bd: "rgba(220,38,38,.25)", fg: "#B91C1C" }, mid: { bg: "#FFF8E1", bd: "rgba(212,130,10,.3)", fg: "#B26A05" }, ok: { bg: "#E6F7F0", bd: "rgba(0,168,107,.3)", fg: "#00794E" } }[verdict.level];

  return (
    <div style={{ background: "#fff", color: "#1A1A1A", fontFamily: "'Outfit','Helvetica Neue',sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=DM+Serif+Display&family=IBM+Plex+Mono:wght@500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        .serif{font-family:'DM Serif Display',Georgia,serif}
        .mono{font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums}
        .btn{background:${accent};color:#fff;border:none;padding:16px 36px;border-radius:50px;font-family:'Outfit',sans-serif;font-weight:600;font-size:15px;cursor:pointer;box-shadow:0 2px 12px rgba(0,168,107,.2);transition:transform .3s}
        .btn:hover{transform:translateY(-2px)}
        input[type=range]{accent-color:${accent};width:100%}
        input:focus{outline:none;border-color:${accent}!important;background:#fff!important;box-shadow:0 0 0 4px rgba(0,168,107,.08)}
        @media(max-width:900px){.grid2{grid-template-columns:1fr!important}}
      `}</style>

      <div style={{ background: "linear-gradient(90deg,#B91C1C,#DC2626)", color: "#fff", textAlign: "center", padding: "11px 20px", fontSize: 13, fontWeight: 600 }}>
        Consommations 2024 : dépôt possible jusqu'au 31 décembre 2026. Après, c'est perdu.
      </div>

      <nav style={{ borderBottom: `1px solid ${border}`, padding: "0 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="/"><img src="./logo-nav.png" alt="Acciseo" style={{ height: 30 }} /></a>
          <a href="tel:0614595701" style={{ color: navy, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>06 14 59 57 01</a>
        </div>
      </nav>

      <header style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 32px 28px", textAlign: "center" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: accent, marginBottom: 14 }}>CONTRÔLE GRATUIT — 2 MINUTES</div>
        <h1 className="serif" style={{ fontSize: "clamp(30px,4.2vw,46px)", color: navy, lineHeight: 1.12, letterSpacing: -1 }}>
          Vous réclamez déjà votre TICPE ?<br /><span style={{ color: accent }}>Vérifiez qu'il ne manque rien.</span>
        </h1>
        <p style={{ color: t2, fontSize: 16, maxWidth: 620, margin: "18px auto 0", lineHeight: 1.7 }}>
          La majorité des dossiers que nous auditons sont incomplets : ventilation Île-de-France oubliée, véhicules loués non déclarés, semestre manquant. Comparez ce que vous avez reçu à ce que vous auriez dû recevoir.
        </p>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px 80px" }}>
        <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
          {/* FORM */}
          <div style={{ background: "#fff", border: `1px solid ${border}`, borderRadius: 20, padding: 32 }}>
            <Field label="Votre activité">
              <div style={{ display: "flex", gap: 8 }}>
                <button style={seg(mode === "trm")} onClick={() => setMode("trm")}>Marchandises</button>
                <button style={seg(mode === "trv")} onClick={() => setMode("trv")}>Voyageurs</button>
              </div>
            </Field>

            <Field label={`Véhicules éligibles : ${veh}`} hint={mode === "trm" ? "PTAC ≥ 7,5 t, en propriété ou en location" : "Autocars et bus de plus de 9 places"}>
              <input type="range" min={1} max={80} value={veh} onChange={(e) => setVeh(+e.target.value)} />
            </Field>

            <Field label="Litres de gazole par véhicule et par an" hint="33 000 L est la moyenne d'un poids lourd en exploitation régulière">
              <input style={input} type="number" value={litres} onChange={(e) => setLitres(+e.target.value || 0)} />
            </Field>

            <Field label={`Part du carburant acheté en Île-de-France : ${idf} %`} hint="Le taux IDF est majoré. Ne pas le déclarer, c'est perdre de l'argent sur chaque litre.">
              <input type="range" min={0} max={100} value={idf} onChange={(e) => { const v = +e.target.value; setIdf(v); if (v + corse > 100) setCorse(100 - v); }} />
            </Field>

            <Field label={`Part achetée en Corse : ${corse} %`}>
              <input type="range" min={0} max={100 - idf} value={corse} onChange={(e) => setCorse(+e.target.value)} />
            </Field>

            <Field label="Avez-vous déjà réclamé la TICPE 2024 ?">
              <div style={{ display: "flex", gap: 8 }}>
                <button style={seg(claimed === "non")} onClick={() => setClaimed("non")}>Non, jamais</button>
                <button style={seg(claimed === "oui")} onClick={() => setClaimed("oui")}>Oui</button>
              </div>
            </Field>

            {claimed === "oui" && (
              <>
                <Field label="Montant total reçu pour 2024 (€)" hint="Somme des virements DGDDI / RTICPE, tous semestres confondus — pas un seul virement.">
                  <input style={input} type="text" inputMode="decimal" placeholder="ex : 42 500" value={received} onChange={(e) => setReceived(e.target.value)} />
                </Field>
                <Field label="Aviez-vous ventilé l'Île-de-France séparément ?">
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={seg(ventil === "oui")} onClick={() => setVentil("oui")}>Oui</button>
                    <button style={seg(ventil === "non")} onClick={() => setVentil("non")}>Non</button>
                    <button style={seg(ventil === "nsp")} onClick={() => setVentil("nsp")}>Je ne sais pas</button>
                  </div>
                </Field>
              </>
            )}
          </div>

          {/* RESULT */}
          <div style={{ position: "sticky", top: 24 }}>
            <div style={{ background: navy, borderRadius: 20, padding: 32, color: "#fff" }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,.4)", marginBottom: 18 }}>ESTIMATION 2024 — {r.label.toUpperCase()}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: 18 }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: 2, marginBottom: 8 }}>GAZOLE ÉLIGIBLE</div>
                  <div className="mono" style={{ fontSize: 22, color: "#fff" }}>{fmtL(totalL)}</div>
                </div>
                <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: 18 }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: 2, marginBottom: 8 }}>REMBOURSEMENT DÛ</div>
                  <div className="mono" style={{ fontSize: 22, color: accent }}>{fmt(theo)}</div>
                </div>
              </div>

              {claimed === "oui" && rec > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                  <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: 18 }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: 2, marginBottom: 8 }}>REÇU</div>
                    <div className="mono" style={{ fontSize: 22, color: "#fff" }}>{fmt(rec)}</div>
                  </div>
                  <div style={{ background: gap > 0 ? "rgba(255,92,92,.1)" : "rgba(0,168,107,.1)", borderRadius: 14, padding: 18, border: `1px solid ${gap > 0 ? "rgba(255,92,92,.25)" : "rgba(0,168,107,.3)"}` }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: 2, marginBottom: 8 }}>ÉCART</div>
                    <div className="mono" style={{ fontSize: 22, color: gap > 0 ? "#F09595" : accent }}>{fmt(gap)}</div>
                  </div>
                </div>
              )}

              {idf > 0 && (claimed === "non" || ventil !== "oui") && (
                <div style={{ background: "rgba(255,255,255,.04)", borderLeft: `3px solid ${accent}`, padding: "12px 16px", borderRadius: "0 10px 10px 0", marginBottom: 18, fontSize: 13, color: "rgba(255,255,255,.8)", lineHeight: 1.6 }}>
                  Sans ventilation Île-de-France, la majoration IDF seule représente <span className="mono" style={{ color: accent }}>{fmt(idfLoss)}</span> sur l'année. C'est l'erreur la plus fréquente que nous corrigeons.
                </div>
              )}

              <div style={{ background: colors.bg, border: `1px solid ${colors.bd}`, borderRadius: 14, padding: 18, color: "#1A1A1A" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: colors.fg, marginBottom: 6 }}>{verdict.title}</div>
                <div style={{ fontSize: 13, color: "#3a3f47", lineHeight: 1.65 }}>{verdict.text}</div>
              </div>

              {!sent ? (
                <a href={mailto} onClick={() => setSent(true)} style={{ textDecoration: "none" }}>
                  <button className="btn" style={{ width: "100%", marginTop: 20 }}>Recevoir mon diagnostic gratuit →</button>
                </a>
              ) : (
                <div style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "rgba(255,255,255,.7)" }}>Votre messagerie s'est ouverte avec le résumé. Ajoutez votre raison sociale et envoyez — réponse sous 48 h.</div>
              )}
              <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "rgba(255,255,255,.4)" }}>ou par téléphone : <a href="tel:0614595701" style={{ color: "#fff" }}>06 14 59 57 01</a></div>
            </div>
            <p style={{ fontSize: 11, color: t2, marginTop: 14, lineHeight: 1.6 }}>
              Estimation indicative sur la base des tarifs 2024 (art. L.312-53 et L.312-51 du CIBS). Le montant exact dépend des factures et des cartes grises — c'est l'objet du diagnostic gratuit.
            </p>
          </div>
        </div>

        <section style={{ marginTop: 72, maxWidth: 760, margin: "72px auto 0" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: accent, marginBottom: 12 }}>LES 4 ERREURS QUE NOUS TROUVONS LE PLUS SOUVENT</div>
          {[
            ["Ventilation régionale absente", "Tout est déclaré au taux standard alors qu'une partie du gazole est achetée en Île-de-France, où le tarif de remboursement est majoré."],
            ["Véhicules en location non déclarés", "Les véhicules en LLD ou crédit-bail sont éligibles. Beaucoup pensent qu'il faut en être propriétaire."],
            ["Un semestre oublié", "Une demande déposée pour un seul semestre sur les deux. L'autre est simplement passé à la trappe."],
            ["AdBlue et essence mal exclus", "Des litres non éligibles gonflent la déclaration : c'est de l'argent à rendre en cas de contrôle."],
          ].map(([t, d]) => (
            <div key={t} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: `1px solid ${border}` }}>
              <span className="mono" style={{ color: accent, fontSize: 13, paddingTop: 2 }}>—</span>
              <div><div style={{ fontWeight: 700, color: navy, fontSize: 15, marginBottom: 4 }}>{t}</div><div style={{ fontSize: 14, color: t2, lineHeight: 1.65 }}>{d}</div></div>
            </div>
          ))}
        </section>
      </main>

      <footer style={{ borderTop: `1px solid ${border}`, padding: "28px 32px", textAlign: "center", fontSize: 11, color: t2 }}>
        © 2026 Acciseo — SIRET 105 464 259 00016 — RCS Pontoise — <a href="/" style={{ color: t2 }}>acciseo.fr</a>
      </footer>
    </div>
  );
}
