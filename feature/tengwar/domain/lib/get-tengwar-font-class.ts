import { ProcessorLanguages } from 'feature/tengwar/domain/entity/processor-languages';
import { PluginSettings } from '../../../settings/domain/entity/plugin-settings';
import { Encoding } from '../entity/encoding';

export const getTengwarFontClass = (
  encoding: Encoding,
  settings: PluginSettings,
  language: ProcessorLanguages,
) => {
  if (language && language !== 'teng') {
    return language.split('-')[1];
  }

  switch (encoding) {
    case 'CSUR':
      return settings.tengCsurFont;
    case 'ASCII':
      return settings.tengAsciiFont;
  }
};
