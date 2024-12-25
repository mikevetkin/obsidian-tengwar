import {
  AsciiFont,
  AsciiFontMap,
} from 'feature/settings/domain/entity/ascii-font';
import {
  CsurFont,
  CsurFontMap,
} from 'feature/settings/domain/entity/csur-font';
import TengwarObsidianPlugin from 'main';
import { App, PluginSettingTab, Setting } from 'obsidian';

export class SettingsTab extends PluginSettingTab {
  plugin: TengwarObsidianPlugin;

  constructor(app: App, plugin: TengwarObsidianPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl).setName('General').setHeading();

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
      .addColorPicker((color) =>
        color
          .setValue(this.plugin.settings.tehtarColor)
          .onChange(async (value) => {
            this.plugin.settings.tehtarColor = value;
            await this.plugin.saveSettings();
            this.plugin.refresh();
          }),
      );

    new Setting(containerEl).setName('Font settings').setHeading();

    new Setting(containerEl)
      .setName('Tengwar CSUR font')
      .setDesc('In Progress')
      .addDropdown((dropdown) =>
        dropdown
          .addOptions(CsurFontMap)
          .setValue(this.plugin.settings.tengCsurFont)
          // .setDisabled(true)
          .onChange(async (value: CsurFont) => {
            this.plugin.settings.tengCsurFont = value;
            await this.plugin.saveSettings();
            this.plugin.refresh();
          }),
      );

    new Setting(containerEl)
      .setName('Tengwar ASCII font')
      .setDesc('In Progress')
      .addDropdown((dropdown) =>
        dropdown
          .addOptions(AsciiFontMap)
          .setValue(this.plugin.settings.tengAsciiFont)
          // .setDisabled(true)
          .onChange(async (value: AsciiFont) => {
            this.plugin.settings.tengAsciiFont = value;
            await this.plugin.saveSettings();
            this.plugin.refresh();
          }),
      );

    new Setting(containerEl).setName('Codeblock settings').setHeading();

    new Setting(containerEl)
      .setName('Tengwar keyword')
      .setDesc('Keyword for Tengwar blocks. Defaults to "teng"')
      .addText((text) =>
        text
          .setPlaceholder('teng')
          .setValue(this.plugin.settings.tengwarKeywrod)
          .setDisabled(true)
          .onChange(async (value) => {
            this.plugin.settings.tengwarKeywrod = value;
            await this.plugin.saveSettings();
          }),
      );
  }
}
