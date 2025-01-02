export type CsurFont =
  | 'AlcarinTengwar'
  | 'TengwarAnnatarItalic'
  | 'TengwarTelcontar'
  /**
   * TODO: Delete from css
   */
  // | 'TengwarTtfTelcontar'
  | 'FreeMonoTengwarTtf';

export const CsurFontMap: Record<CsurFont, string> = {
  AlcarinTengwar: 'Alcarin',
  TengwarAnnatarItalic: 'Artano (italic)',
  TengwarTelcontar: 'Telcontar',
  /**
   * Not rendered fine on all platforms
   */
  // TengwarTtfTelcontar: 'Tengwar Telcontar (TTF)',
  FreeMonoTengwarTtf: 'Free Mono',
};
