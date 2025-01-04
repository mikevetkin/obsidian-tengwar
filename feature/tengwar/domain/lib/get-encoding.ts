import { TENGWAR_CSUR_REG_EXP } from '../entity/csurTengwar';
import { Encoding } from '../entity/encoding';

export const getEncoding = (source: string): Encoding => {
  return TENGWAR_CSUR_REG_EXP.test(source) ? 'CSUR' : 'ASCII';
};
