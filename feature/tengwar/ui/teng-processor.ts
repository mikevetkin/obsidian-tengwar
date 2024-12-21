import { PluginCodeBlockProcessor } from "core/types";
import { TENGWAR_CSUR_REG_EXP, TENGWAR_TEHTAR_CSUR_REG_EXP } from "../domain/entity/csurTengwar";
import { Encoding } from "../domain/entity/encoding";
import { PluginSettings } from "feature/settings/domain/entity/plugin-settings";

export const processCsur = (source: string, settings: PluginSettings): string => {
	const className = 'tengwar-formal-csur'

	const innerHTML = settings.isHighlightedTehtar ? highlightCsurTehtars(source, settings) : source

	return `<div class="${className}">${innerHTML}</div>`
}

export const highlightCsurTehtars = (source: string, settings: PluginSettings): string => {
	return source.replaceAll(
		TENGWAR_TEHTAR_CSUR_REG_EXP,
		(tehtar: string) => `<span style="color: ${settings.tehtarColor}">${tehtar}</span>`,
	)
}

export const processAscii = (source: string): string => {
	const className = 'tengwar-annatar';

	return `<div class="${className}">${source}</div>`
}

export const getEncoding = (source: string): Encoding => {
	if (TENGWAR_CSUR_REG_EXP.test(source)) {
		return 'CSUR'
	}

	return 'ASCII';
}

export const processTengwar = (source: string, settings: PluginSettings): string => {
	const innerHTML = source.replaceAll(/\n/g, '<br />');

	switch (getEncoding(source)) {
		case 'CSUR': return processCsur(innerHTML, settings);
		case 'ASCII': return processAscii(innerHTML);
	}
}

export const tengProcessor: PluginCodeBlockProcessor = (settings) => (source, el, _ctx) => {
	el.innerHTML = processTengwar(source, settings);
}
