import { DEFAULT_PLUGIN_SETTINGS } from 'feature/settings/domain/entity/default-plugin-settings';
import { PluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { SettingsTab } from 'feature/settings/ui/settings-tab';
import {
  processTengwar,
  tengProcessor,
} from 'feature/tengwar/ui/teng-processor';
import { Plugin } from 'obsidian';

export default class TengwarObsidianPlugin extends Plugin {
  settings: PluginSettings;

  refresh() {
    const elements = document.querySelectorAll('#teng');

    elements.forEach((element) => {
      const source = getTextWithBreaks(element as HTMLElement);

      element.textContent = '';
      element.className = '';
      element.id = '';

      processTengwar(source, element as HTMLElement, this.settings);
    });
  }

  async onload() {
    await this.loadSettings();

    /**
     * Add code block processor for 'teng'
     */
    this.registerMarkdownCodeBlockProcessor(
      'teng',
      tengProcessor(this.settings),
    );

    /**
     * This adds a settings tab so the user can configure various aspects of the plugin
     */
    this.addSettingTab(new SettingsTab(this.app, this));
  }

  // onunload() {}

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_PLUGIN_SETTINGS,
      await this.loadData(),
    );
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
