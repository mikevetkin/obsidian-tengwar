import { pluginSettings } from '../../settings/domain/entity/plugin-settings';
import { processCsur, processAscii } from './teng-processor';

describe('CSUR', () => {
	test('The "Tengwar Formal CSUR" font is used for ConScript Unicode Registry', () => {
		const innerHTML = processCsur('', pluginSettings());

		expect(innerHTML).toEqual('<div class="tengwar-formal-csur"></div>');
	});

	test('The "Tengwar Annatar" font is used for ASCII standart registry', () => {
		const innerHTML = processAscii('2x%51T`Û');

		expect(innerHTML).toEqual('<div class="tengwar-annatar">2x%51T`Û</div>');
	});
});
