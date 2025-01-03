import { pluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { processTengwar } from './teng-processor';
import { CsurFont } from 'feature/settings/domain/entity/csur-font';
import { AsciiFont } from 'feature/settings/domain/entity/ascii-font';

describe('Common requirements', () => {
  let block: HTMLElement;

  beforeEach(() => {
    block = document.createElement('div');
  });

  it('Sets a id "teng" for the block', () => {
    processTengwar('text', block, pluginSettings());

    expect(block.id).toBe('teng');
  });

  it('Sets a classname "tengwarBlock" for the block', () => {
    processTengwar('text', block, pluginSettings());

    expect(block.classList.contains('tengwarBlock')).toBe(true);
  });
});

describe('Tengwar CSUR Font settings', () => {
  let block: HTMLElement;

  beforeEach(() => {
    block = document.createElement('div');
  });

  const testCases: { font: CsurFont; expectedClass: string }[] = [
    { font: 'Alcarin', expectedClass: 'Alcarin' },
    { font: 'Telcontar', expectedClass: 'Telcontar' },
    { font: 'Artano', expectedClass: 'Artano' },
    { font: 'FreeMono', expectedClass: 'FreeMono' },
  ];

  testCases.forEach(({ font, expectedClass }) => {
    it(`If the ${font} font is selected and text is Tengwar CSUR, sets ${expectedClass} classname for the block`, () => {
      processTengwar(
        '',
        block,
        pluginSettings({
          tengCsurFont: font,
        }),
      );

      expect(block.classList.contains(expectedClass)).toBe(true);
    });
  });
});

describe('Tengwar ASCII Font settings', () => {
  let block: HTMLElement;

  beforeEach(() => {
    block = document.createElement('div');
  });

  const testCases: { font: AsciiFont; expectedClass: string }[] = [
    { font: 'Annatar', expectedClass: 'Annatar' },
    { font: 'Eldamar', expectedClass: 'Eldamar' },
    { font: 'Parmaite', expectedClass: 'Parmaite' },
  ];

  testCases.forEach(({ font, expectedClass }) => {
    it(`If the ${font} font is selected and text is Tengwar ASCII, sets ${expectedClass} classname for the block`, () => {
      processTengwar(
        '9t&5#',
        block,
        pluginSettings({
          tengAsciiFont: font,
        }),
      );

      expect(block.classList.contains(expectedClass)).toBe(true);
    });
  });
});
