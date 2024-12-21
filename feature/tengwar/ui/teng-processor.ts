import { PluginCodeBlockProcessor } from "core/types";
import { TENGWAR_CSUR_REG_EXP, TENGWAR_TEHTAR_CSUR_REG_EXP } from "../domain/entity/csurTengwar";

export const tengProcessor: PluginCodeBlockProcessor = (settings) => (source, el, _ctx) => {
	const targetSymbol = (tehtar: string) => `<span style="color: ${settings.tehtarColor}">${tehtar}</span>`;

	const isTengCsur = TENGWAR_CSUR_REG_EXP.test(source);

	const replacedEntersSource = source.replaceAll(/\n/g, '<br />');
	const formatted = replacedEntersSource.replaceAll(TENGWAR_TEHTAR_CSUR_REG_EXP, targetSymbol);

	const className = isTengCsur ? 'tengwar-csur' : 'tengwar-annatar';

	const resultSource = settings.isHighlightedTehtar ? formatted : replacedEntersSource;

	el.innerHTML = `<div class="${className}">${resultSource}</div>`;
}
