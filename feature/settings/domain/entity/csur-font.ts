export type CsurFont =
  | 'AlcarinTengwar'
  | 'TengwarAnnatarItalic'
  | 'TengwarTelcontar'
  | 'TengwarTtfTelcontar';

export const CsurFontMap: Record<CsurFont, string> = {
  AlcarinTengwar: 'Alcarin Tengwar',
  TengwarAnnatarItalic: 'Tengwar Artano',
  TengwarTelcontar: 'Tengwar Telcontar',
  TengwarTtfTelcontar: 'Tengwar Telcontar (TTF)',
};
