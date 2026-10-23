import { useState } from "react";
import { FORM_ENDPOINT, PHONE_DISPLAY, PHONE_TEL, EMAIL } from "./config";

const navy = "#0B1D33", accent = "#00A86B", warm = "#FAFAF7", t2 = "#5C6370", border = "rgba(0,0,0,.08)";

const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: navy, marginBottom: 6 };
const inputStyle = { background: warm, border: `1.5px solid ${border}`, borderRadius: 10, padding: "13px 14px", fontFamily: "'Outfit',sans-serif", fontSize: 15, width: "100%", color: "#1A1A1A" };
const errStyle = { fontSize: 12, color: "#B91C1C", marginTop: 5 };

// Formulaire de premier diagnostic. Aucun document n'est demandé à ce stade.
// `context` : texte libre (ex. résultat du simulateur) joint à la demande.
export default function ContactForm({ context = "", source = "accueil" }) {
  const [v, setV] = useState({ nom: "", societe: "", tel: "", email: "", nb: "", periode: "", message: "", website: "" });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim());
  const telOk = v.tel.replace(/[\s.\-()]/g, "").replace(/^\+33/, "0").match(/^0\d{9}$/);
  const errors = {};
  if (!v.nom.trim()) errors.nom = "Indiquez votre nom.";
  if (!emailOk && !telOk) errors.contact = "Indiquez un e-mail ou un numéro de téléphone valide pour que nous puissions vous répondre.";
  if (v.email.trim() && !emailOk) errors.email = "Cette adresse e-mail semble incomplète.";

  const submit = async (e) => {
    e.preventDefault();
    setTouched({ nom: true, email: true, tel: true, contact: true });
    if (Object.keys(errors).length) return;
    if (v.website) { setStatus("sent"); return; } // champ piège anti-robot
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nom: v.nom, societe: v.societe, telephone: v.tel, email: v.email,
          nombre_vehicules_ptac_7_5t_et_plus: v.nb, periode_concernee: v.periode,
          message: v.message, contexte: context, page: source,
          _subject: `Demande de diagnostic Acciseo${v.societe ? " — " + v.societe : ""}`,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  // Tant que le service d'envoi n'est pas configuré, on n'affiche pas un formulaire qui ne partirait nulle part.
  if (!FORM_ENDPOINT) {
    return (
      <div style={{ padding: 24, border: `1px solid ${border}`, borderRadius: 14, background: "#fff", textAlign: "left" }}>
        <p style={{ fontSize: 15, color: navy, fontWeight: 600, marginBottom: 8 }}>Contactez-nous directement</p>
        <p style={{ fontSize: 14, color: t2, lineHeight: 1.7 }}>
          Téléphone : <a href={`tel:${PHONE_TEL}`} style={{ color: navy, fontWeight: 600 }}>{PHONE_DISPLAY}</a><br />
          E-mail : <a href={`mailto:${EMAIL}`} style={{ color: navy, fontWeight: 600 }}>{EMAIL}</a>
        </p>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div role="status" style={{ padding: 32, border: `1px solid ${border}`, borderRadius: 14, background: "#fff", textAlign: "left" }}>
        <p style={{ fontSize: 17, fontWeight: 700, color: navy, marginBottom: 8 }}>Votre demande a bien été envoyée.</p>
        <p style={{ fontSize: 14, color: t2, lineHeight: 1.7 }}>Nous revenons vers vous par e-mail ou par téléphone. Si c'est urgent, appelez-nous au <a href={`tel:${PHONE_TEL}`} style={{ color: navy, fontWeight: 600 }}>{PHONE_DISPLAY}</a>.</p>
      </div>
    );
  }

  const Field = ({ id, label, optional, error, children }) => (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}{optional && <span style={{ fontWeight: 400, color: t2 }}> (facultatif)</span>}</label>
      {children}
      {error && <div style={errStyle} role="alert">{error}</div>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate style={{ display: "grid", gap: 16, textAlign: "left" }}>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field id="cf-nom" label="Votre nom" error={touched.nom && errors.nom}>
          <input id="cf-nom" style={inputStyle} autoComplete="name" value={v.nom} onChange={set("nom")} onBlur={blur("nom")} />
        </Field>
        <Field id="cf-soc" label="Entreprise" optional>
          <input id="cf-soc" style={inputStyle} autoComplete="organization" value={v.societe} onChange={set("societe")} />
        </Field>
      </div>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field id="cf-tel" label="Téléphone" error={touched.contact && errors.contact}>
          <input id="cf-tel" type="tel" style={inputStyle} autoComplete="tel" value={v.tel} onChange={set("tel")} onBlur={blur("tel")} />
        </Field>
        <Field id="cf-mail" label="E-mail" error={touched.email && errors.email}>
          <input id="cf-mail" type="email" style={inputStyle} autoComplete="email" value={v.email} onChange={set("email")} onBlur={blur("email")} />
        </Field>
      </div>
      <p style={{ fontSize: 12, color: t2, marginTop: -6 }}>Un seul des deux suffit.</p>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field id="cf-nb" label="Véhicules de PTAC ≥ 7,5 t" optional>
          <input id="cf-nb" type="number" min="0" inputMode="numeric" style={inputStyle} value={v.nb} onChange={set("nb")} />
        </Field>
        <Field id="cf-per" label="Consommations concernées" optional>
          <select id="cf-per" style={{ ...inputStyle, appearance: "auto" }} value={v.periode} onChange={set("periode")}>
            <option value="">Je ne sais pas encore</option>
            <option value="2024">Jusqu'au 31/12/2024</option>
            <option value="2025+">À partir du 01/01/2025</option>
            <option value="les deux">Les deux</option>
          </select>
        </Field>
      </div>
      <Field id="cf-msg" label="Un mot sur votre situation" optional>
        <textarea id="cf-msg" rows={3} style={{ ...inputStyle, resize: "vertical" }} value={v.message} onChange={set("message")} />
      </Field>
      {/* champ piège : invisible pour les humains */}
      <div aria-hidden="true" style={{ position: "absolute", left: -9999, height: 0, overflow: "hidden" }}>
        <label>Ne pas remplir <input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} /></label>
      </div>
      <button type="submit" disabled={status === "sending"} className="btn-accent" style={{ width: "100%", opacity: status === "sending" ? 0.7 : 1 }}>
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
      {status === "error" && (
        <div role="alert" style={{ ...errStyle, fontSize: 13 }}>
          L'envoi n'a pas abouti. Réessayez, ou contactez-nous directement : <a href={`tel:${PHONE_TEL}`} style={{ color: navy }}>{PHONE_DISPLAY}</a> · <a href={`mailto:${EMAIL}`} style={{ color: navy }}>{EMAIL}</a>.
        </div>
      )}
      <p style={{ fontSize: 12, color: t2, lineHeight: 1.6 }}>
        Aucun document n'est demandé à ce stade. Les informations saisies servent uniquement à vous répondre.
      </p>
    </form>
  );
}
