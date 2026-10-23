// Source unique des informations de contact et des taux officiels utilisés par le site.

export const PHONE_DISPLAY = "06 19 43 89 78";
export const PHONE_TEL = "+33619438978";
export const EMAIL = "contact@acciseo.fr";

// Endpoint du formulaire (Formspree, ou tout service acceptant un POST JSON).
// À définir dans l'environnement de build : VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
export const FORM_ENDPOINT = (import.meta.env && import.meta.env.VITE_FORM_ENDPOINT) || "https://formspree.io/f/xqppkvnn";

// Taux de remboursement partiel d'accise sur le gazole, transport routier de marchandises
// (véhicules de PTAC >= 7,5 t), en euros par hectolitre.
// Source : douane.gouv.fr, page « Demander le remboursement partiel de la TICPE — entreprise de transport
// de marchandises », tableau T1 à T4 2024. À revérifier avant toute modification d'année.
export const RATES_2024 = {
  autre: { label: "Autres régions", eurPerHl: 15.56 },
  idf: { label: "Île-de-France", eurPerHl: 17.45 },
  ara: { label: "Auvergne-Rhône-Alpes", eurPerHl: 15.29 },
  corse: { label: "Corse", eurPerHl: 14.21 },
};

// Photo d'ambiance (Maxence Clodion, Unsplash, licence Unsplash). Pour l'héberger sur le site,
// enregistrer le fichier dans public/route.jpg et remplacer cette valeur par "./route.jpg".
export const ROUTE_IMG = "https://images.unsplash.com/photo-1785652604220-ec7099d133c8?ixlib=rb-4.1.0&q=80&fm=jpg&w=2000&fit=max";
