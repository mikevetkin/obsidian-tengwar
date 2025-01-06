import { pluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { CsurFont } from 'feature/settings/domain/entity/csur-font';
import { AsciiFont } from 'feature/settings/domain/entity/ascii-font';
import {
  TENGWAE_CSUR_END,
  TENGWAR_CSUR_START,
  TENGWAR_TEHTAR_CSUR_END,
  TENGWAR_TEHTAR_CSUR_START,
} from 'feature/tengwar/domain/entity/csur-tengwar';
import { tengProcessor } from 'feature/tengwar/domain/lib/teng-processor';
import { ProcessorLanguages } from 'feature/tengwar/domain/entity/processor-languages';

let block: HTMLElement;

beforeEach(() => {
  block = document.createElement('div');
});

describe('Common requirements', () => {
  it('Sets a id "teng" for the block by default', () => {
    tengProcessor('text', block, pluginSettings(), 'teng');

    expect(block.id).toBe('teng');
  });

  it('If user changed keyword, apply this word for block', () => {
    tengProcessor(
      'text',
      block,
      pluginSettings({
        tengwarKeywrod: 'tengwar',
      }),
    );

    expect(block.id).toBe('tengwar');
  });

  it('Sets a classname "tengwarBlock" for the block', () => {
    tengProcessor('text', block, pluginSettings(), 'teng');

    expect(block.classList.contains('tengwarBlock')).toBe(true);
  });

  it('All new line characters replaced with <br />', () => {
    const source =
      '\n\n\n';

    tengProcessor(
      source,
      block,
      pluginSettings({
        tengCsurFont: 'telcontar',
      }),
    );

    expect(block.querySelectorAll('br').length).toBe(3);
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
    { font: 'alcarin', expectedClass: 'alcarin' },
    { font: 'telcontar', expectedClass: 'telcontar' },
    { font: 'artano', expectedClass: 'artano' },
    { font: 'freemono', expectedClass: 'freemono' },
  ];

  tengwarCsurFonts.forEach(({ font, expectedClass }) => {
    describe(`${font} have ${expectedClass} className`, () => {
      tengwarCsurCodes.forEach((code) => {
        it(`Support symbol U+${code.toString(16).toUpperCase().padStart(4, '0')}`, () => {
          const tengwarSymbol = String.fromCodePoint(code);

          tengProcessor(
            tengwarSymbol,
            block,
            pluginSettings({
              tengCsurFont: font,
              tengwarKeywrod: 'teng',
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
    { font: 'alcarin', expectedClass: 'Alcarin' },
    { font: 'telcontar', expectedClass: 'telcontar' },
    { font: 'artano', expectedClass: 'Artano' },
    { font: 'freemono', expectedClass: 'Freemono' },
  ];

  tengwarCsurFonts.forEach(({ font, expectedClass }) => {
    describe(`${font} have ${expectedClass} className`, () => {
      tengwarCsurCodes.forEach((code) => {
        it(`Symbol U+${code.toString(16).toUpperCase().padStart(4, '0')} is wrapped in span with tehtar className`, () => {
          const tengwarSymbol = String.fromCodePoint(code);

          tengProcessor(
            tengwarSymbol,
            block,
            pluginSettings({
              tengCsurFont: font,
              isHighlightedTehtar: true,
              tengwarKeywrod: 'teng',
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
    { font: 'alcarin', expectedClass: 'alcarin' },
    { font: 'telcontar', expectedClass: 'telcontar' },
    { font: 'artano', expectedClass: 'artano' },
    { font: 'freemono', expectedClass: 'freemono' },
  ];

  testCases.forEach(({ font, expectedClass }) => {
    it(`If the ${font} font is selected and text is Tengwar CSUR, sets ${expectedClass} classname for the block`, () => {
      tengProcessor(
        '',
        block,
        pluginSettings({
          tengCsurFont: font,
          tengwarKeywrod: 'teng',
        }),
        'teng',
      );

      expect(block.classList.contains(expectedClass)).toBe(true);
    });
  });
});

describe('Tengwar ASCII Font settings', () => {
  const testCases: { font: AsciiFont; expectedClass: string }[] = [
    { font: 'annatar', expectedClass: 'annatar' },
    { font: 'eldamar', expectedClass: 'eldamar' },
    { font: 'primate', expectedClass: 'primate' },
  ];

  testCases.forEach(({ font, expectedClass }) => {
    it(`If the ${font} font is selected and text is Tengwar ASCII, sets ${expectedClass} classname for the block`, () => {
      tengProcessor(
        '9t&5#',
        block,
        pluginSettings({
          tengAsciiFont: font,
          tengwarKeywrod: 'teng',
        }),
        'teng',
      );

      expect(block.classList.contains(expectedClass)).toBe(true);
    });
  });
});

describe('Font manual mode', () => {
  describe('ASCII Fonts', () => {
    const testCases: { procLang: ProcessorLanguages; expectedClass: string }[] =
      [
        { procLang: 'teng-annatar', expectedClass: 'annatar' },
        { procLang: 'teng-eldamar', expectedClass: 'eldamar' },
        { procLang: 'teng-primate', expectedClass: 'primate' },
      ];

    testCases.forEach(({ procLang, expectedClass }) => {
      it(`Supports ${procLang}, sets ${expectedClass} classname for the block`, () => {
        tengProcessor(
          '9t&5#',
          block,
          pluginSettings({
            tengAsciiFont: 'primate',
            tengwarKeywrod: 'teng',
          }),
          procLang,
        );

        expect(block.classList.contains(expectedClass)).toBe(true);
      });
    });
  });
  describe('CSUR Fonts', () => {
    const testCases: { procLang: ProcessorLanguages; expectedClass: string }[] =
      [
        { procLang: 'teng-alcarin', expectedClass: 'alcarin' },
        { procLang: 'teng-telcontar', expectedClass: 'telcontar' },
        { procLang: 'teng-artano', expectedClass: 'artano' },
        { procLang: 'teng-freemono', expectedClass: 'freemono' },
      ];

    testCases.forEach(({ procLang, expectedClass }) => {
      it(`Supports ${procLang}, sets ${expectedClass} classname for the block`, () => {
        tengProcessor(
          '',
          block,
          pluginSettings({
            tengCsurFont: 'telcontar',
            tengwarKeywrod: 'teng',
          }),
          procLang,
        );

        expect(block.classList.contains(expectedClass)).toBe(true);
      });
    });
  });
});

describe('Keyword settings', () => {
  const testCases: { keyword: string; expectedId: string }[] = [
    { keyword: 'teng', expectedId: 'teng' },
    { keyword: 'tengwar', expectedId: 'tengwar' },
    { keyword: 'elfish', expectedId: 'elfish' },
  ];

  testCases.forEach(({ keyword, expectedId }) => {
    describe(`If user selected ${keyword} keyword`, () => {
      it(`Sets ${expectedId} id to block`, () => {
        tengProcessor(
          '',
          block,
          pluginSettings({
            tengCsurFont: 'telcontar',
            tengwarKeywrod: keyword,
          }),
        );

        expect(block.id).toBe(expectedId);
      });
    });
  });
});
