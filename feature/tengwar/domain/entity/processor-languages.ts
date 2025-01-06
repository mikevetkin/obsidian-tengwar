export type ProcessorLanguages =
  | 'teng'
  // ASCII
  | 'teng-annatar'
  | 'teng-eldamar'
  | 'teng-primate'
  // CSUR
  | 'teng-alcarin'
  | 'teng-artano'
  | 'teng-telcontar'
  | 'teng-freemono';

export const ProcessorLanguagesList = [
  'teng',
  // ASCII
  'teng-annatar',
  'teng-eldamar',
  'teng-primate',
  // CSUR
  'teng-alcarin',
  'teng-artano',
  'teng-telcontar',
  'teng-freemono',
] as const;
