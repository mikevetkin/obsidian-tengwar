import { AsciiFont } from 'feature/settings/domain/entity/ascii-font';
import { CsurFont } from 'feature/settings/domain/entity/csur-font';

/**
 * Settings of this plugin
 */
export interface PluginSettings {
  isHighlightedTehtar: boolean;
  tehtarColor: string;
  tengAsciiFont: AsciiFont;
  tengCsurFont: CsurFont;
  tengwarKeywrod: string;
}

export const pluginSettings = (
  data: Partial<PluginSettings> = {},
): PluginSettings => ({
  isHighlightedTehtar: false,
  tehtarColor: '',
  tengAsciiFont: 'annatar',
  tengCsurFont: 'alcarin',
  tengwarKeywrod: '',
  ...data,
});
