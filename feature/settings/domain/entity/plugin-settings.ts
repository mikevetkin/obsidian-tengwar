/**
 * Settings of this plugin
 */
export interface PluginSettings {
  isHighlightedTehtar: boolean;
  tehtarColor: string;
  tengCsurFont: string;
  tengFont: string;
}

export const pluginSettings = (
  data: Partial<PluginSettings> = {},
): PluginSettings => ({
  isHighlightedTehtar: false,
  tehtarColor: '',
  tengCsurFont: '',
  tengFont: '',
  ...data,
});
