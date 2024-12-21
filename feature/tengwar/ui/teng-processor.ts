import { PluginCodeBlockProcessor } from "core/types";
import { TENGWAR_CSUR_REG_EXP, TENGWAR_TEHTAR_CSUR_REG_EXP } from "../domain/entity/csurTengwar";
import { Encoding } from "../domain/entity/encoding";
import { PluginSettings } from "feature/settings/domain/entity/plugin-settings";

// export const processCsur = (source: string, settings: PluginSettings): string => {
// 	const innerHTML = settings.isHighlightedTehtar ? addTehtarSpans(source, settings) : source

// 	return innerHTML;
// }

export const addTehtarSpans = (source: string, settings: PluginSettings): string => {
	return source.replaceAll(
		TENGWAR_TEHTAR_CSUR_REG_EXP,
		(tehtar: string) => `<span class="tehtar" style="color: ${settings.isHighlightedTehtar ? settings.tehtarColor : 'unset'}">${tehtar}</span>`,
	)
}

/**
 * Legacy
 */
export const changeTehtar = (source: string, settings: PluginSettings): string => {

	const elements = document.querySelectorAll(".tehtar");

	elements.forEach((element) => {
		element.style.color = settings.isHighlightedTehtar ? settings.tehtarColor : 'unset';
	}); 

	return source;
}

export const getEncoding = (source: string): Encoding => {
	if (TENGWAR_CSUR_REG_EXP.test(source)) {
		return 'CSUR'
	}

	return 'ASCII';
}

export const addBrs = (source: string, settings: PluginSettings): string => {
	const innerHTML = source.replaceAll('\n', '<br />');

	return innerHTML;
}

const addTengwarFontClass = (encoding: Encoding) => {
	switch (encoding) {
		case 'CSUR':
			return 'tengwar-formal-csur';
		case 'ASCII':
			return 'tengwar-annatar';
	}
}

export const tengProcessor: PluginCodeBlockProcessor = (settings) => (source, el, _ctx) => {
	const encoding = getEncoding(source);

	el.innerHTML = addTehtarSpans(addBrs(source, settings), settings);
	el.id = 'teng';
	el.classList.add(addTengwarFontClass(encoding));
}
