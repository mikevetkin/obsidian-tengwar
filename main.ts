import { App, Modal, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface ObsidianTengwarSettings {
	isHighlightedTehtar: boolean;
	tehtarColor: string;
	tengFont: string;
	tengCsurFont: string;
}

const DEFAULT_SETTINGS: ObsidianTengwarSettings = {
	isHighlightedTehtar: true,
	tehtarColor: '#A78AF9',
	tengFont: 'Tengwar Annatar',
	tengCsurFont: 'Tengwar Formal CSUR',
}

export default class ObsidianTengwar extends Plugin {
	settings: ObsidianTengwarSettings;

	async onload() {
		await this.loadSettings();

		/**
		 * Add code block processor for 'teng'
		 */
		this.registerMarkdownCodeBlockProcessor('teng', (source, el, ctx) => {
            // Render chess board
			const targetSymbol = (tehtar: string) => `<span style="color: ${this.settings.tehtarColor}">${tehtar}</span>`;

			const tengCsurRegExp = /[\uE040-\uE05D]+/g;

			const isTengCsur = tengCsurRegExp.test(source);

			const replacedEntersSource = source.replaceAll(/\n/g, '<br />');
			const formatted = replacedEntersSource.replaceAll(tengCsurRegExp, targetSymbol);

			const className = isTengCsur ? 'tengwar-csur' : 'tengwar-annatar';

			const resultSource = this.settings.isHighlightedTehtar ? formatted : replacedEntersSource;

            el.innerHTML = `<div class="${className}">${resultSource}</div>`;
        });

		/**
		 * This adds a settings tab so the user can configure various aspects of the plugin
		 */
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: ObsidianTengwar;

	constructor(app: App, plugin: ObsidianTengwar) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Turn on Tehtar highlighting')
			.setDesc('Signs and symbols written above or below letters will be highlighted')
			.addToggle(text => text
				.setValue(this.plugin.settings.isHighlightedTehtar)
				.onChange(async (value) => {
					this.plugin.settings.isHighlightedTehtar = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
		.setName('Color')
		.setDesc('Color of highlighted Tehtars')
		.addColorPicker(color => color
			.setValue(this.plugin.settings.tehtarColor)
			.onChange(async (value) => {
				this.plugin.settings.tehtarColor = value;
				await this.plugin.saveSettings();
			}));
		
		new Setting(containerEl)
		.setName('Tengwar CSUR font')
		.setDesc('In Progress')
		.addDropdown(text => text
			.setValue(this.plugin.settings.tengFont)
			.onChange(async (value) => {
				this.plugin.settings.tengFont = value;
				await this.plugin.saveSettings();
			}));
		
		new Setting(containerEl)
		.setName('Tengwar font')
		.setDesc('In Progress')
		.addDropdown(text => text
			.setValue(this.plugin.settings.tengFont)
			.onChange(async (value) => {
				this.plugin.settings.tengFont = value;
				await this.plugin.saveSettings();
			}));
	}
}
