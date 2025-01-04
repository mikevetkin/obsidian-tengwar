import { PluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { ProcessorLanguages } from 'feature/tengwar/domain/entity/processor-languages';
import { tengProcessor } from 'feature/tengwar/domain/lib/teng-processor';

export const refreshProcessors = (settings: PluginSettings) => {
  const elements = document.querySelectorAll('#teng');

  elements.forEach((element) => {
    const source = getTextWithBreaks(element as HTMLElement);

    const processorLanguage = element.id as ProcessorLanguages;

    element.textContent = '';
    element.className = '';
    element.id = '';

    tengProcessor(source, element as HTMLElement, settings, processorLanguage);
  });
};
