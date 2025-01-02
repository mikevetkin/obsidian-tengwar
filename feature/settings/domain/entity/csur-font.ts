export type CsurFont =
  | 'Alcarin'
  | 'Artano'
  | 'Telcontar'
  /**
   * TODO: Delete from css
   */
  // | 'TengwarTtfTelcontar'
  | 'FreeMono'
  // !TEST
  | 'TengwarTelcontarScoped';

export const CsurFontMap: Record<CsurFont, string> = {
  Alcarin: 'Alcarin',
  Artano: 'Artano (italic)',
  Telcontar: 'Telcontar',
  /**
   * Not rendered fine on all platforms
   */
  // TengwarTtfTelcontar: 'Tengwar Telcontar (TTF)',
  FreeMono: 'Free Mono',
  TengwarTelcontarScoped: 'Tengwar Telcontar Scoped (test)',
};
