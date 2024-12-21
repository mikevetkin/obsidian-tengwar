import ObsidianTengwar from 'main';
import { App, PluginSettingTab, Setting } from 'obsidian';

export class SettingsTab extends PluginSettingTab {
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
