/**
 * All tengwar symbols in CSUR
 * more info: https://en.wikipedia.org/wiki/ConScript_Unicode_Registry
 *
 * The range of codes is taken from Wikipedia
 * https://en.wikipedia.org/wiki/Tengwar
 */
export const TENGWAR_CSUR_START = 0xe000;
export const TENGWAE_CSUR_END = 0xe07f;

export const TENGWAR_CSUR_REG_EXP = /[\uE000-\uE07F]/;

/**
 * Special tengwar symbols (Tehtar)
 *
 * The range of codes is taken from Wikipedia
 * https://en.wikipedia.org/wiki/Tengwar
 */
export const TENGWAR_TEHTAR_CSUR_REG_EXP = /[\uE040-\uE05D]/g;
