import { PluginSettings } from 'feature/settings/domain/entity/plugin-settings';
import { MarkdownPostProcessorContext } from 'obsidian';

export type CodeBlockProcessor = (
  source: string,
  el: HTMLElement,
  ctx: MarkdownPostProcessorContext,
) => Promise<unknown> | void;

export type PluginCodeBlockProcessor = (
  s: PluginSettings,
) => CodeBlockProcessor;
