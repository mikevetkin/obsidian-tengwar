import TengwarObsidianPlugin from 'main';
import { App, PluginSettingTab, Setting } from 'obsidian';

export class SettingsTab extends PluginSettingTab {
  plugin: TengwarObsidianPlugin;

  constructor(app: App, plugin: TengwarObsidianPlugin) {
    super(app, plugin);
    this.plugin = plugin;
    const hello = 1;

    console.log('hello :>> ', hello);
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
      .addColorPicker((color) =>
        color
          .setValue(this.plugin.settings.tehtarColor)
          .onChange(async (value) => {
            this.plugin.settings.tehtarColor = value;
            await this.plugin.saveSettings();
            this.plugin.refresh();
          }),
      );

    new Setting(containerEl)
      .setName('Tengwar CSUR font')
      .setDesc('In Progress')
      .addDropdown((dropdown) =>
        dropdown
          .addOption('tengwar-telcontar', 'Tengwar Telcontar')
          .addOption('tengwar-formal-csur', 'Tengwar Formal CSUR')
          .addOption('tengwar-alcarin', 'Tengwar Alcarin')
          .setValue(this.plugin.settings.tengCsurFont)
          .setDisabled(true)
          .onChange(async (value) => {
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
          .addOption('tengwar-annatar', 'Tengwar Annatar')
          .setValue(this.plugin.settings.tengFont)
          .setDisabled(true)
          .onChange(async (value) => {
            this.plugin.settings.tengFont = value;
            await this.plugin.saveSettings();
            this.plugin.refresh();
          }),
      );
  }
}
