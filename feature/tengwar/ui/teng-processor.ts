import { PluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { TENGWAR_TEHTAR_CSUR_REG_EXP } from '../domain/entity/csurTengwar';
import { getEncoding } from 'feature/tengwar/domain/lib/getEncoding';
import { getTengwarFontClass } from 'feature/tengwar/domain/lib/getTengwarFontClass';

export const addTehtarSpans = (
  element: HTMLElement,
  source: string,
  settings: PluginSettings,
): void => {
  for (const char of source) {
    if (TENGWAR_TEHTAR_CSUR_REG_EXP.test(char)) {
      const span = document.createElement('span');
      span.classList.add('tehtar');
      span.style.color = settings.isHighlightedTehtar
        ? settings.tehtarColor
        : 'unset';
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
};

export const processTengwar = (
  source: string,
  el: HTMLElement,
  settings: PluginSettings,
) => {
  const encoding = getEncoding(source);
  addTehtarSpans(el, source, settings);

  el.id = 'teng';
  el.classList.add('tengwarBlock');
  el.classList.add(getTengwarFontClass(encoding, settings));
};
