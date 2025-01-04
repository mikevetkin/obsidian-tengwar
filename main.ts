import { ProcessTengwar } from 'core/types';
import { DEFAULT_PLUGIN_SETTINGS } from 'feature/settings/domain/entity/default-plugin-settings';
import { PluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { SettingsTab } from 'feature/settings/ui/settings-tab';
import { processTengwar } from 'feature/tengwar/ui/teng-processor';
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
    this.reg('teng', processTengwar);
    /**
     * This adds a settings tab so the user can configure various aspects of the plugin
     */
    this.addSettingTab(new SettingsTab(this.app, this));
  }

  reg(language: string, processor: ProcessTengwar) {
    this.registerMarkdownCodeBlockProcessor(language, (source, el) => {
      processor(source, el, this.settings);
    });
  }

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
