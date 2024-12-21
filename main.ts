import { CodeBlockProcessor, PluginCodeBlockProcessor } from 'core/types';
import { DEFAULT_PLUGIN_SETTINGS } from 'feature/settings/domain/entity/default-plugin-settings';
import { PluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { SettingsTab } from 'feature/settings/ui/settings-tab';
import { TENGWAR_CSUR_REG_EXP, TENGWAR_TEHTAR_CSUR_REG_EXP } from 'feature/tengwar/domain/entity/csurTengwar';
import { Plugin } from 'obsidian';

const tengProcessor: PluginCodeBlockProcessor = (settings) => (source, el, ctx) => {
	const targetSymbol = (tehtar: string) => `<span style="color: ${settings.tehtarColor}">${tehtar}</span>`;

	const isTengCsur = TENGWAR_CSUR_REG_EXP.test(source);

	const replacedEntersSource = source.replaceAll(/\n/g, '<br />');
	const formatted = replacedEntersSource.replaceAll(TENGWAR_TEHTAR_CSUR_REG_EXP, targetSymbol);

	const className = isTengCsur ? 'tengwar-csur' : 'tengwar-annatar';

	const resultSource = settings.isHighlightedTehtar ? formatted : replacedEntersSource;

	el.innerHTML = `<div class="${className}">${resultSource}</div>`;
}

export default class ObsidianTengwar extends Plugin {
	settings: PluginSettings;

	async onload() {
		await this.loadSettings();

		/**
		 * Add code block processor for 'teng'
		 */
		this.registerMarkdownCodeBlockProcessor('teng', tengProcessor(this.settings));

		/**
		 * This adds a settings tab so the user can configure various aspects of the plugin
		 */
		this.addSettingTab(new SettingsTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_PLUGIN_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
