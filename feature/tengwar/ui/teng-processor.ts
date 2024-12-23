import { PluginCodeBlockProcessor } from "core/types";
import { TENGWAR_CSUR_REG_EXP, TENGWAR_TEHTAR_CSUR_REG_EXP } from "../domain/entity/csurTengwar";
import { Encoding } from "../domain/entity/encoding";
import { PluginSettings } from "feature/settings/domain/entity/plugin-settings";

const getTengwarFontClass = (encoding: Encoding) => {
	switch (encoding) {
		case 'CSUR':
			return 'TengwarTelcontar';
		case 'ASCII':
			return 'TengwarAnnatar';
	}
}

export const getEncoding = (source: string): Encoding => {
	const isCSUR = TENGWAR_CSUR_REG_EXP.test(source);

	if (isCSUR) {
		return 'CSUR'
	}

	return 'ASCII';
}

export const addTehtarSpans = (element: HTMLElement, source: string, settings: PluginSettings): void => {
	for (const char of source) {
		if (TENGWAR_TEHTAR_CSUR_REG_EXP.test(char)) {
			const span = document.createElement('span');
			span.classList.add('tehtar');
			span.style.color = settings.isHighlightedTehtar ? settings.tehtarColor : 'unset';
			span.textContent = char;
			element.appendChild(span);
		} else if (char === '\n') {
			const br = document.createElement('br');
			element.appendChild(br);
		} else {
			const textNode = document.createTextNode(char);
			element.appendChild(textNode);
			
		}
	}
}

export const tengProcessor: PluginCodeBlockProcessor = (settings) => (source, el, _ctx) => {
	const encoding = getEncoding(source);
	addTehtarSpans(el, source, settings);

	el.id = 'teng';
	el.classList.add('tengwarBlock')
	el.classList.add(getTengwarFontClass(encoding));
}
