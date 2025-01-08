import {
  AsciiFont,
  AsciiFontMap,
} from 'feature/settings/domain/entity/ascii-font';
import {
  CsurFont,
  CsurFontMap,
} from 'feature/settings/domain/entity/csur-font';
import { DEFAULT_PLUGIN_SETTINGS } from 'feature/settings/domain/entity/default-plugin-settings';
import TengwarObsidianPlugin from 'main';
import {
  App,
  ColorComponent,
  PluginSettingTab,
  Setting,
  TextComponent,
} from 'obsidian';

export class SettingsTab extends PluginSettingTab {
  plugin: TengwarObsidianPlugin;

  constructor(app: App, plugin: TengwarObsidianPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Turn on Tehtar highlighting')
      .setDesc(
        'Signs and symbols written above or below letters will be highlighted',
      )
      .addToggle((text) =>
        text
          .setValue(this.plugin.settings.isHighlightedTehtar)
          .onChange(async (value) => {
            this.plugin.settings.isHighlightedTehtar = value;
            await this.plugin.saveSettings();
            this.plugin.refresh();
          }),
      );

    new Setting(containerEl)
      .setName('Color')
      .setDesc('Color of highlighted Tehtars')
      .then((setting) => {
        let colorComponent: ColorComponent;

        setting
          .addColorPicker((color) => {
            colorComponent = color;

            color
              .setValue(this.plugin.settings.tehtarColor)
              .onChange(async (value) => {
                this.plugin.settings.tehtarColor = value;
                await this.plugin.saveSettings();
                this.plugin.refresh();
              });

            return color;
          })
          .addExtraButton((button) => {
            button
              .setIcon('lucide-rotate-ccw')
              .setTooltip('Reset to default')
              .onClick(async () => {
                const defaultSetting = DEFAULT_PLUGIN_SETTINGS.tehtarColor;

                this.plugin.settings.tehtarColor = defaultSetting;
                colorComponent.setValue(defaultSetting);

                await this.plugin.saveSettings();
                this.plugin.refresh();
              });
          });
      });

    new Setting(containerEl).setName('Font settings').setHeading();

    new Setting(containerEl)
      .setName('Tengwar ASCII font')
      .setDesc('Font family for ASCII tengwar words')
      .addDropdown((dropdown) =>
        dropdown
          .addOptions(AsciiFontMap)
          .setValue(this.plugin.settings.tengAsciiFont)
          .onChange(async (value: AsciiFont) => {
            this.plugin.settings.tengAsciiFont = value;
            await this.plugin.saveSettings();
            this.plugin.refresh();
          }),
      );

    new Setting(containerEl)
      .setName('Tengwar CSUR font')
      .setDesc('Font family for CSUR tengwar words')
      .addDropdown((dropdown) =>
        dropdown
          .addOptions(CsurFontMap)
          .setValue(this.plugin.settings.tengCsurFont)
          .onChange(async (value: CsurFont) => {
            this.plugin.settings.tengCsurFont = value;
            await this.plugin.saveSettings();
            this.plugin.refresh();
          }),
      );

    new Setting(containerEl).setName('Codeblock settings').setHeading();

    new Setting(containerEl)
      .setName('Tengwar keyword')
      .setDesc('Keyword for Tengwar blocks (Reload required)')
      .then((setting) => {
        let textComponent: TextComponent;

        setting
          .addText((text) => {
            textComponent = text;

            text
              .setPlaceholder('teng')
              .setValue(this.plugin.settings.tengwarKeywrod)
              .onChange(async (value) => {
                this.plugin.settings.tengwarKeywrod = value;

                await this.plugin.saveSettings();
                this.plugin.refresh();
              });

            return text;
          })
          .addExtraButton((button) => {
            button
              .setIcon('lucide-rotate-ccw')
              .setTooltip('Reset to default')
              .onClick(async () => {
                const defaultSetting = DEFAULT_PLUGIN_SETTINGS.tengwarKeywrod;

                this.plugin.settings.tengwarKeywrod = defaultSetting;
                textComponent.setValue(defaultSetting);

                await this.plugin.saveSettings();
                this.plugin.refresh();
              });
          });
      });
  }
}
