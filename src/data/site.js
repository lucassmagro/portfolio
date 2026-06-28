/**
 * Fonte única de verdade para informações de contato e redes sociais.
 *
 * Antes, esses dados estavam duplicados (e divergentes) em AboutSection,
 * Footer e LinkHub. Centralizar evita e-mails/links errados como o
 * "lucas.magro@email.com" que aparecia no rodapé.
 */

// Domínio absoluto usado para Open Graph, canonical e sitemap.
// Ajuste aqui caso o domínio de produção mude.
export const SITE_URL = 'https://lucasmagro.vercel.app'

export const CONTACT = {
  email: 'lucassmagro@gmail.com',
  // WhatsApp em formato internacional, sem símbolos (usado em links wa.me).
  whatsapp: '5549991259617',
  whatsappDisplay: '+55 (49) 99125-9617',
  location: 'Chapecó, SC, Brasil',
}

/**
 * Redes sociais e canais de contato.
 * `label` curto é usado em ícones do rodapé; `name` completo nas listas.
 */
export const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    label: 'IN',
    url: 'https://www.linkedin.com/in/lucasmagro/',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    label: 'IG',
    url: 'https://instagram.com/lucassmagro',
  },
  {
    id: 'github',
    name: 'GitHub',
    label: 'GH',
    url: 'https://github.com/lucassmagro',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    label: 'SP',
    url: 'https://open.spotify.com/user/22rnygwzowt7xufk4hvh7bzcy',
  },
]

// Link direto de WhatsApp reutilizável.
export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsapp}`
export const MAILTO_URL = `mailto:${CONTACT.email}`
