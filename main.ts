import { DEFAULT_PLUGIN_SETTINGS } from 'feature/settings/domain/entity/default-plugin-settings';
import { PluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { SettingsTab } from 'feature/settings/ui/settings-tab';
import { makeProcessorLanguagesList } from 'feature/tengwar/domain/lib/make-processor-languages-list';
import { refreshProcessors } from 'feature/tengwar/domain/lib/refresh-processors';
import { tengProcessor } from 'feature/tengwar/domain/lib/teng-processor';
import { Plugin } from 'obsidian';

export default class TengwarObsidianPlugin extends Plugin {
  settings: PluginSettings;

  refresh() {
    refreshProcessors(this.settings);
  }

  async onload() {
    await this.loadSettings();
    /**
     * Add code block processor for 'teng'
     */
    this.registerTengwarProcessors();
    /**
     * This adds a settings tab so the user can configure various aspects of the plugin
     */
    this.addSettingTab(new SettingsTab(this.app, this));
  }

  registerTengwarProcessors() {
    makeProcessorLanguagesList(this.settings.tengwarKeywrod).forEach(
      (language) => {
        this.registerMarkdownCodeBlockProcessor(language, (source, el) => {
          tengProcessor(source, el, this.settings, language);
        });
      },
    );
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
