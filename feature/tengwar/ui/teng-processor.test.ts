import { pluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { processTengwar } from './teng-processor';

describe('processTengwar', () => {
  let block: HTMLElement;

  // beforeEach(() => {
  //   // block = document.createElement('div');
  // });

  it('Sets a id "teng" for the block', () => {
    block = document.createElement('div');
    processTengwar('text', block, pluginSettings());

    expect(block.id).toBe('teng');
  });
});
