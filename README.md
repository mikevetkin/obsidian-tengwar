# Tengwar for Obsidian

> An [Obsidian](https://obsidian.md/) plugin that allows you to add [tengwar](https://en.wikipedia.org/wiki/Tengwar) to your notes

<img src="/assets/doc-30fps-720px.gif" />

## How to use

To add text in Tengwar to the document:

- create a [block of code](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Code+blocks);
- specify the extension `teng`;
- paste tengwar text.

## Apply a specific font on a page

You may need to set different fonts for different notes, other than the main font selected in the settings.

To do this, in the code block, add the font name separated by a `-` to the keyword `teng`.

Examples: `teng`, `teng-annatar`, `teng-eldamar`, `teng-primate`, `teng-alcarin`, `teng-artano`, `teng-telcontar`, `teng-freemono`.

> [!IMPORTANT]
> If you changed the keyword from `tang` to `elfish` in the settings, you need use font name with this keyword.
> For example: `elfish-telcontar` or `elfish-eldamar`.

## Supported encodings

At [the moment](https://en.wikipedia.org/wiki/Tengwar) there are two ways to work with Tengvar on a computer in the community:

- [ISO 8859-1](https://en.wikipedia.org/wiki/ISO_8859-1);
- [ConScript Unicode Registry](https://en.wikipedia.org/wiki/ConScript_Unicode_Registry);

Both ways is supported.

## Supported devices

The plugin supports all devices. But at the moment, on Apple devices, there are problems with rendering some CSUR fonts.

## Contacts

If you have questions or suggestions, text me in Telegram [mikevetkin](https://mikevetkin.t.me) or create issue on [Github](https://github.com/mikevetkin/obsidian-tengwar).
