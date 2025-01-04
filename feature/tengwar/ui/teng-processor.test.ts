import { pluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { processTengwar } from './teng-processor';
import { CsurFont } from 'feature/settings/domain/entity/csur-font';
import { AsciiFont } from 'feature/settings/domain/entity/ascii-font';
import {
  TENGWAE_CSUR_END,
  TENGWAR_CSUR_START,
  TENGWAR_TEHTAR_CSUR_END,
  TENGWAR_TEHTAR_CSUR_START,
} from 'feature/tengwar/domain/entity/csurTengwar';

let block: HTMLElement;

beforeEach(() => {
  block = document.createElement('div');
});

describe('Common requirements', () => {
  it('Sets a id "teng" for the block', () => {
    processTengwar('text', block, pluginSettings());

    expect(block.id).toBe('teng');
  });

  it('Sets a classname "tengwarBlock" for the block', () => {
    processTengwar('text', block, pluginSettings());

    expect(block.classList.contains('tengwarBlock')).toBe(true);
  });
});

describe('ConScript Unicode Registry (U+E000 - U+E07F)', () => {
  const start = TENGWAR_CSUR_START;
  const end = TENGWAE_CSUR_END;

  // Array of all tengwar CSUR codes in the range from start to end
  const tengwarCsurCodes = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index,
  );

  // Array of all tengwar CSUR fonts
  const tengwarCsurFonts: { font: CsurFont; expectedClass: string }[] = [
    { font: 'Alcarin', expectedClass: 'Alcarin' },
    { font: 'Telcontar', expectedClass: 'Telcontar' },
    { font: 'Artano', expectedClass: 'Artano' },
    { font: 'FreeMono', expectedClass: 'FreeMono' },
  ];

  tengwarCsurFonts.forEach(({ font, expectedClass }) => {
    describe(`${font} have ${expectedClass} className`, () => {
      tengwarCsurCodes.forEach((code) => {
        it(`Support symbol U+${code.toString(16).toUpperCase().padStart(4, '0')}`, () => {
          const tengwarSymbol = String.fromCodePoint(code);

          processTengwar(
            tengwarSymbol,
            block,
            pluginSettings({
              tengCsurFont: font,
            }),
          );

          expect(block.classList.contains(expectedClass)).toBe(true);
        });
      });
    });
  });
});

describe('ConScript Unicode Registry Tehtars (U+E040 - U+E05D)', () => {
  const start = TENGWAR_TEHTAR_CSUR_START;
  const end = TENGWAR_TEHTAR_CSUR_END;

  // Array of all tengwar tehtar CSUR codes in the range from start to end
  const tengwarCsurCodes = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index,
  );

  // Array of all tengwar CSUR fonts
  const tengwarCsurFonts: { font: CsurFont; expectedClass: string }[] = [
    { font: 'Alcarin', expectedClass: 'Alcarin' },
    { font: 'Telcontar', expectedClass: 'Telcontar' },
    { font: 'Artano', expectedClass: 'Artano' },
    { font: 'FreeMono', expectedClass: 'FreeMono' },
  ];

  tengwarCsurFonts.forEach(({ font, expectedClass }) => {
    describe(`${font} have ${expectedClass} className`, () => {
      tengwarCsurCodes.forEach((code) => {
        it(`Symbol U+${code.toString(16).toUpperCase().padStart(4, '0')} is wrapped in span with tehtar className`, () => {
          const tengwarSymbol = String.fromCodePoint(code);

          processTengwar(
            tengwarSymbol,
            block,
            pluginSettings({
              tengCsurFont: font,
              isHighlightedTehtar: true,
            }),
          );
          expect(block.children.length).toBe(1);
          expect(block.children[0].tagName).toBe('SPAN');
          expect(block.children[0].textContent).toBe(tengwarSymbol);
          expect(block.children[0].className).toBe('tehtar');
        });
      });
    });
  });
});

describe('Tengwar CSUR Font settings', () => {
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

it.skip('If CSUR font is selected and tehtar highlighting is disabled, all tehtars is not wrapped in span', () => {
  const source = '';

  processTengwar(
    source,
    block,
    pluginSettings({
      tengCsurFont: 'Telcontar',
      isHighlightedTehtar: false,
    }),
  );

  expect(block.textContent).toBe('');
  expect(block.children).toBe(1);
});

it.skip('If CSUR font is selected and tehtar highlighting is enabled in the settings, all tehtars is wrapped in span', () => {
  const source = '';

  processTengwar(
    source,
    block,
    pluginSettings({
      tengCsurFont: 'Telcontar',
      isHighlightedTehtar: true,
    }),
  );

  expect(block.innerHTML).toBe('');
});
