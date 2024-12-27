export type CsurFont =
  | 'AlcarinTengwar'
  | 'TengwarAnnatarItalic'
  | 'TengwarTelcontar'
  // | 'TengwarTtfTelcontar'
  | 'FreeMonoTengwarTtf';

export const CsurFontMap: Record<CsurFont, string> = {
  AlcarinTengwar: 'Alcarin Tengwar',
  TengwarAnnatarItalic: 'Tengwar Artano',
  TengwarTelcontar: 'Tengwar Telcontar',
  /**
   * Not rendered fine on all platforms
   */
  // TengwarTtfTelcontar: 'Tengwar Telcontar (TTF)',
  FreeMonoTengwarTtf: 'Free Mono Tengwar (TTF)',
};
