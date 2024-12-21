import { pluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { tengProcessor, processCsur } from './teng-processor';

describe('CSUR', () => {
	test('The "Tengwar Formal CSUR" font is used for ConScript Unicode Registry', () => {
		const innerHTML = processCsur('', pluginSettings());

		expect(innerHTML).toEqual('<div class="tengwar-formal-csur"></div>');
	});
});
