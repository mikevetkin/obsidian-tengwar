import { AsciiFont } from 'feature/settings/domain/entity/ascii-font';
import { CsurFont } from 'feature/settings/domain/entity/csur-font';

/**
 * Settings of this plugin
 */
export interface PluginSettings {
  isHighlightedTehtar: boolean;
  tehtarColor: string;
  tengCsurFont: CsurFont;
  tengAsciiFont: AsciiFont;
  tengwarKeywrod: string;
}

export const pluginSettings = (
  data: Partial<PluginSettings> = {},
): PluginSettings => ({
  isHighlightedTehtar: false,
  tehtarColor: '',
  tengCsurFont: 'TengwarTelcontar',
  tengAsciiFont: 'TengwarAnnatar',
  tengwarKeywrod: '',
  ...data,
});
