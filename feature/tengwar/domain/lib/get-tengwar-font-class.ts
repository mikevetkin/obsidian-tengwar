import { PluginSettings } from '../../../settings/domain/entity/plugin-settings';
import { Encoding } from '../entity/encoding';

export const getTengwarFontClass = (
  encoding: Encoding,
  settings: PluginSettings,
) => {
  switch (encoding) {
    case 'CSUR':
      return settings.tengCsurFont;
    case 'ASCII':
      return settings.tengAsciiFont;
  }
};
