/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ObsidianTengwar
});
module.exports = __toCommonJS(main_exports);

// feature/settings/domain/entity/plugin-settings.ts
var pluginSettings = (data = {}) => ({
  isHighlightedTehtar: false,
  tehtarColor: "",
  tengCsurFont: "",
  tengFont: "",
  ...data
});

// feature/settings/domain/entity/default-plugin-settings.ts
var DEFAULT_PLUGIN_SETTINGS = pluginSettings({
  isHighlightedTehtar: true,
  tehtarColor: "#A78AF9",
  tengFont: "Tengwar Annatar",
  tengCsurFont: "Tengwar Formal CSUR"
});

// feature/settings/ui/settings-tab.ts
var import_obsidian = require("obsidian");
var SettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("Turn on Tehtar highlighting").setDesc("Signs and symbols written above or below letters will be highlighted").addToggle((text) => text.setValue(this.plugin.settings.isHighlightedTehtar).onChange(async (value) => {
      this.plugin.settings.isHighlightedTehtar = value;
      await this.plugin.saveSettings();
      this.plugin.refresh();
    }));
    new import_obsidian.Setting(containerEl).setName("Color").setDesc("Color of highlighted Tehtars").addColorPicker((color) => color.setValue(this.plugin.settings.tehtarColor).onChange(async (value) => {
      this.plugin.settings.tehtarColor = value;
      await this.plugin.saveSettings();
      this.plugin.refresh();
    }));
    new import_obsidian.Setting(containerEl).setName("Tengwar CSUR font").setDesc("In Progress").addDropdown((text) => text.setValue(this.plugin.settings.tengFont).setDisabled(true).onChange(async (value) => {
      this.plugin.settings.tengFont = value;
      await this.plugin.saveSettings();
      this.plugin.refresh();
    }));
    new import_obsidian.Setting(containerEl).setName("Tengwar font").setDesc("In Progress").setDisabled(true).addDropdown((text) => text.setValue(this.plugin.settings.tengFont).onChange(async (value) => {
      this.plugin.settings.tengFont = value;
      await this.plugin.saveSettings();
      this.plugin.refresh();
    }));
  }
};

// feature/tengwar/domain/entity/csurTengwar.ts
var TENGWAR_CSUR_REG_EXP = /[^\uE000-\uE06E]/;
var TENGWAR_TEHTAR_CSUR_REG_EXP = /[\uE040-\uE05D]+/g;

// feature/tengwar/ui/teng-processor.ts
var addTehtarSpans = (source, settings) => {
  return source.replaceAll(
    TENGWAR_TEHTAR_CSUR_REG_EXP,
    (tehtar) => `<span class="tehtar" style="color: ${settings.isHighlightedTehtar ? settings.tehtarColor : "unset"}">${tehtar}</span>`
  );
};
var changeTehtar = (source, settings) => {
  const elements = document.querySelectorAll(".tehtar");
  elements.forEach((element) => {
    element.style.color = settings.isHighlightedTehtar ? settings.tehtarColor : "unset";
  });
  return source;
};
var getEncoding = (source) => {
  const isCSUR = TENGWAR_CSUR_REG_EXP.test(source);
  console.log("isCSUR :>> ", isCSUR, source);
  if (isCSUR) {
    return "CSUR";
  }
  return "ASCII";
};
var addBrs = (source, settings) => {
  const innerHTML = source.replaceAll("\n", "<br />");
  return innerHTML;
};
var addTengwarFontClass = (encoding) => {
  switch (encoding) {
    case "CSUR":
      return "tengwar-formal-csur";
    case "ASCII":
      return "tengwar-annatar";
  }
};
var tengProcessor = (settings) => (source, el, _ctx) => {
  const encoding = getEncoding(source);
  el.innerHTML = addTehtarSpans(addBrs(source, settings), settings);
  el.id = "teng";
  el.classList.add(addTengwarFontClass(encoding));
};

// main.ts
var import_obsidian2 = require("obsidian");
var ObsidianTengwar = class extends import_obsidian2.Plugin {
  refresh() {
    const elements = document.querySelectorAll("#teng");
    elements.forEach((element) => {
      element.innerHTML = changeTehtar(element.innerHTML, this.settings);
    });
  }
  async onload() {
    await this.loadSettings();
    this.registerMarkdownCodeBlockProcessor("teng", tengProcessor(this.settings));
    this.addSettingTab(new SettingsTab(this.app, this));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_PLUGIN_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyIsICJmZWF0dXJlL3NldHRpbmdzL2RvbWFpbi9lbnRpdHkvcGx1Z2luLXNldHRpbmdzLnRzIiwgImZlYXR1cmUvc2V0dGluZ3MvZG9tYWluL2VudGl0eS9kZWZhdWx0LXBsdWdpbi1zZXR0aW5ncy50cyIsICJmZWF0dXJlL3NldHRpbmdzL3VpL3NldHRpbmdzLXRhYi50cyIsICJmZWF0dXJlL3Rlbmd3YXIvZG9tYWluL2VudGl0eS9jc3VyVGVuZ3dhci50cyIsICJmZWF0dXJlL3Rlbmd3YXIvdWkvdGVuZy1wcm9jZXNzb3IudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IERFRkFVTFRfUExVR0lOX1NFVFRJTkdTIH0gZnJvbSAnZmVhdHVyZS9zZXR0aW5ncy9kb21haW4vZW50aXR5L2RlZmF1bHQtcGx1Z2luLXNldHRpbmdzJztcbmltcG9ydCB7IFBsdWdpblNldHRpbmdzIH0gZnJvbSAnZmVhdHVyZS9zZXR0aW5ncy9kb21haW4vZW50aXR5L3BsdWdpbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBTZXR0aW5nc1RhYiB9IGZyb20gJ2ZlYXR1cmUvc2V0dGluZ3MvdWkvc2V0dGluZ3MtdGFiJztcbmltcG9ydCB7IGFkZEJycywgY2hhbmdlVGVodGFyLCB0ZW5nUHJvY2Vzc29yIH0gZnJvbSAnZmVhdHVyZS90ZW5nd2FyL3VpL3RlbmctcHJvY2Vzc29yJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzaWRpYW5UZW5nd2FyIGV4dGVuZHMgUGx1Z2luIHtcblx0c2V0dGluZ3M6IFBsdWdpblNldHRpbmdzO1xuXG5cdHJlZnJlc2goKSB7XG5cdFx0Y29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3RlbmdcIik7XG5cblx0XHRlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IGNoYW5nZVRlaHRhcihlbGVtZW50LmlubmVySFRNTCwgdGhpcy5zZXR0aW5ncyk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBvbmxvYWQoKSB7XG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuXHRcdC8qKlxuXHRcdCAqIEFkZCBjb2RlIGJsb2NrIHByb2Nlc3NvciBmb3IgJ3RlbmcnXG5cdFx0ICovXG5cdFx0dGhpcy5yZWdpc3Rlck1hcmtkb3duQ29kZUJsb2NrUHJvY2Vzc29yKCd0ZW5nJywgdGVuZ1Byb2Nlc3Nvcih0aGlzLnNldHRpbmdzKSk7XG5cblx0XHQvKipcblx0XHQgKiBUaGlzIGFkZHMgYSBzZXR0aW5ncyB0YWIgc28gdGhlIHVzZXIgY2FuIGNvbmZpZ3VyZSB2YXJpb3VzIGFzcGVjdHMgb2YgdGhlIHBsdWdpblxuXHRcdCAqL1xuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcblx0fVxuXG5cdG9udW5sb2FkKCkge31cblxuXHRhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfUExVR0lOX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXHR9XG5cblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG5cdH1cbn1cbiIsICIvKipcbiAqIFNldHRpbmdzIG9mIHRoaXMgcGx1Z2luXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGx1Z2luU2V0dGluZ3Mge1xuXHRpc0hpZ2hsaWdodGVkVGVodGFyOiBib29sZWFuO1xuXHR0ZWh0YXJDb2xvcjogc3RyaW5nO1xuXHR0ZW5nRm9udDogc3RyaW5nO1xuXHR0ZW5nQ3N1ckZvbnQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHBsdWdpblNldHRpbmdzID0gKGRhdGE6IFBhcnRpYWw8UGx1Z2luU2V0dGluZ3M+ID0ge30pOiBQbHVnaW5TZXR0aW5ncyA9PiAoe1xuXHRpc0hpZ2hsaWdodGVkVGVodGFyOiBmYWxzZSxcblx0dGVodGFyQ29sb3I6ICcnLFxuXHR0ZW5nQ3N1ckZvbnQ6ICcnLFxuXHR0ZW5nRm9udDogJycsXG5cdC4uLmRhdGEsXG4gIH0pO1xuICAiLCAiaW1wb3J0IHsgcGx1Z2luU2V0dGluZ3MsIFBsdWdpblNldHRpbmdzIH0gZnJvbSBcIi4vcGx1Z2luLXNldHRpbmdzXCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1BMVUdJTl9TRVRUSU5HUyA9IHBsdWdpblNldHRpbmdzKHtcblx0aXNIaWdobGlnaHRlZFRlaHRhcjogdHJ1ZSxcblx0dGVodGFyQ29sb3I6ICcjQTc4QUY5Jyxcblx0dGVuZ0ZvbnQ6ICdUZW5nd2FyIEFubmF0YXInLFxuXHR0ZW5nQ3N1ckZvbnQ6ICdUZW5nd2FyIEZvcm1hbCBDU1VSJyxcbn0pXG4iLCAiaW1wb3J0IE9ic2lkaWFuVGVuZ3dhciBmcm9tICdtYWluJztcbmltcG9ydCB7IEFwcCwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG5cdHBsdWdpbjogT2JzaWRpYW5UZW5nd2FyO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE9ic2lkaWFuVGVuZ3dhcikge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdGRpc3BsYXkoKTogdm9pZCB7XG5cdFx0Y29uc3Qge2NvbnRhaW5lckVsfSA9IHRoaXM7XG5cblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnVHVybiBvbiBUZWh0YXIgaGlnaGxpZ2h0aW5nJylcblx0XHRcdC5zZXREZXNjKCdTaWducyBhbmQgc3ltYm9scyB3cml0dGVuIGFib3ZlIG9yIGJlbG93IGxldHRlcnMgd2lsbCBiZSBoaWdobGlnaHRlZCcpXG5cdFx0XHQuYWRkVG9nZ2xlKHRleHQgPT4gdGV4dFxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaXNIaWdobGlnaHRlZFRlaHRhcilcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmlzSGlnaGxpZ2h0ZWRUZWh0YXIgPSB2YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG5cdFx0XHRcdH0pKTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdC5zZXROYW1lKCdDb2xvcicpXG5cdFx0LnNldERlc2MoJ0NvbG9yIG9mIGhpZ2hsaWdodGVkIFRlaHRhcnMnKVxuXHRcdC5hZGRDb2xvclBpY2tlcihjb2xvciA9PiBjb2xvclxuXHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRlaHRhckNvbG9yKVxuXHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZWh0YXJDb2xvciA9IHZhbHVlO1xuXHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0dGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuXHRcdFx0fSkpO1xuXHRcdFxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdC5zZXROYW1lKCdUZW5nd2FyIENTVVIgZm9udCcpXG5cdFx0LnNldERlc2MoJ0luIFByb2dyZXNzJylcblx0XHQuYWRkRHJvcGRvd24odGV4dCA9PiB0ZXh0XG5cdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudGVuZ0ZvbnQpXG5cdFx0XHQuc2V0RGlzYWJsZWQodHJ1ZSlcblx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudGVuZ0ZvbnQgPSB2YWx1ZTtcblx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdHRoaXMucGx1Z2luLnJlZnJlc2goKTtcblx0XHRcdH0pKTtcblx0XHRcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHQuc2V0TmFtZSgnVGVuZ3dhciBmb250Jylcblx0XHQuc2V0RGVzYygnSW4gUHJvZ3Jlc3MnKVxuXHRcdC5zZXREaXNhYmxlZCh0cnVlKVxuXHRcdC5hZGREcm9wZG93bih0ZXh0ID0+IHRleHRcblx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZW5nRm9udClcblx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudGVuZ0ZvbnQgPSB2YWx1ZTtcblx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdHRoaXMucGx1Z2luLnJlZnJlc2goKTtcblx0XHRcdH0pKTtcblx0fVxufVxuIiwgIi8qKlxuICogQWxsIHRlbmd3YXIgc3ltYm9scyBpbiBDU1VSXG4gKiBtb3JlIGluZm86IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvblNjcmlwdF9Vbmljb2RlX1JlZ2lzdHJ5XG4gKiBcbiAqIFRoZSByYW5nZSBvZiBjb2RlcyBpcyB0YWtlbiBmcm9tIFdpa2lwZWRpYVxuICogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVGVuZ3dhclxuICovXG5leHBvcnQgY29uc3QgVEVOR1dBUl9DU1VSX1JFR19FWFAgPSAvW15cXHVFMDAwLVxcdUUwNkVdLztcblxuLyoqXG4gKiBTcGVjaWFsIHRlbmd3YXIgc3ltYm9scyAoVGVodGFyKVxuICogXG4gKiBUaGUgcmFuZ2Ugb2YgY29kZXMgaXMgdGFrZW4gZnJvbSBXaWtpcGVkaWFcbiAqIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Rlbmd3YXJcbiAqL1xuZXhwb3J0IGNvbnN0IFRFTkdXQVJfVEVIVEFSX0NTVVJfUkVHX0VYUCA9IC9bXFx1RTA0MC1cXHVFMDVEXSsvZztcbiIsICJpbXBvcnQgeyBQbHVnaW5Db2RlQmxvY2tQcm9jZXNzb3IgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xuaW1wb3J0IHsgVEVOR1dBUl9DU1VSX1JFR19FWFAsIFRFTkdXQVJfVEVIVEFSX0NTVVJfUkVHX0VYUCB9IGZyb20gXCIuLi9kb21haW4vZW50aXR5L2NzdXJUZW5nd2FyXCI7XG5pbXBvcnQgeyBFbmNvZGluZyB9IGZyb20gXCIuLi9kb21haW4vZW50aXR5L2VuY29kaW5nXCI7XG5pbXBvcnQgeyBQbHVnaW5TZXR0aW5ncyB9IGZyb20gXCJmZWF0dXJlL3NldHRpbmdzL2RvbWFpbi9lbnRpdHkvcGx1Z2luLXNldHRpbmdzXCI7XG5cbi8vIGV4cG9ydCBjb25zdCBwcm9jZXNzQ3N1ciA9IChzb3VyY2U6IHN0cmluZywgc2V0dGluZ3M6IFBsdWdpblNldHRpbmdzKTogc3RyaW5nID0+IHtcbi8vIFx0Y29uc3QgaW5uZXJIVE1MID0gc2V0dGluZ3MuaXNIaWdobGlnaHRlZFRlaHRhciA/IGFkZFRlaHRhclNwYW5zKHNvdXJjZSwgc2V0dGluZ3MpIDogc291cmNlXG5cbi8vIFx0cmV0dXJuIGlubmVySFRNTDtcbi8vIH1cblxuZXhwb3J0IGNvbnN0IGFkZFRlaHRhclNwYW5zID0gKHNvdXJjZTogc3RyaW5nLCBzZXR0aW5nczogUGx1Z2luU2V0dGluZ3MpOiBzdHJpbmcgPT4ge1xuXHRyZXR1cm4gc291cmNlLnJlcGxhY2VBbGwoXG5cdFx0VEVOR1dBUl9URUhUQVJfQ1NVUl9SRUdfRVhQLFxuXHRcdCh0ZWh0YXI6IHN0cmluZykgPT4gYDxzcGFuIGNsYXNzPVwidGVodGFyXCIgc3R5bGU9XCJjb2xvcjogJHtzZXR0aW5ncy5pc0hpZ2hsaWdodGVkVGVodGFyID8gc2V0dGluZ3MudGVodGFyQ29sb3IgOiAndW5zZXQnfVwiPiR7dGVodGFyfTwvc3Bhbj5gLFxuXHQpXG59XG5cbi8qKlxuICogTGVnYWN5XG4gKi9cbmV4cG9ydCBjb25zdCBjaGFuZ2VUZWh0YXIgPSAoc291cmNlOiBzdHJpbmcsIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncyk6IHN0cmluZyA9PiB7XG5cblx0Y29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRlaHRhclwiKTtcblxuXHRlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0ZWxlbWVudC5zdHlsZS5jb2xvciA9IHNldHRpbmdzLmlzSGlnaGxpZ2h0ZWRUZWh0YXIgPyBzZXR0aW5ncy50ZWh0YXJDb2xvciA6ICd1bnNldCc7XG5cdH0pOyBcblxuXHRyZXR1cm4gc291cmNlO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0RW5jb2RpbmcgPSAoc291cmNlOiBzdHJpbmcpOiBFbmNvZGluZyA9PiB7XG5cdGNvbnN0IGlzQ1NVUiA9IFRFTkdXQVJfQ1NVUl9SRUdfRVhQLnRlc3Qoc291cmNlKTtcblx0Ly8gY29uc3QgaXMgPSBzb3VyY2Uuc3BsaXQoJycpLmZpbmQoVEVOR1dBUl9DU1VSX1JFR19FWFApXG5cdGNvbnNvbGUubG9nKCdpc0NTVVIgOj4+ICcsIGlzQ1NVUiwgc291cmNlKTtcblxuXHRpZiAoaXNDU1VSKSB7XG5cdFx0cmV0dXJuICdDU1VSJ1xuXHR9XG5cblx0cmV0dXJuICdBU0NJSSc7XG59XG5cbmV4cG9ydCBjb25zdCBhZGRCcnMgPSAoc291cmNlOiBzdHJpbmcsIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncyk6IHN0cmluZyA9PiB7XG5cdGNvbnN0IGlubmVySFRNTCA9IHNvdXJjZS5yZXBsYWNlQWxsKCdcXG4nLCAnPGJyIC8+Jyk7XG5cblx0cmV0dXJuIGlubmVySFRNTDtcbn1cblxuY29uc3QgYWRkVGVuZ3dhckZvbnRDbGFzcyA9IChlbmNvZGluZzogRW5jb2RpbmcpID0+IHtcblx0c3dpdGNoIChlbmNvZGluZykge1xuXHRcdGNhc2UgJ0NTVVInOlxuXHRcdFx0cmV0dXJuICd0ZW5nd2FyLWZvcm1hbC1jc3VyJztcblx0XHRjYXNlICdBU0NJSSc6XG5cdFx0XHRyZXR1cm4gJ3Rlbmd3YXItYW5uYXRhcic7XG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IHRlbmdQcm9jZXNzb3I6IFBsdWdpbkNvZGVCbG9ja1Byb2Nlc3NvciA9IChzZXR0aW5ncykgPT4gKHNvdXJjZSwgZWwsIF9jdHgpID0+IHtcblx0Y29uc3QgZW5jb2RpbmcgPSBnZXRFbmNvZGluZyhzb3VyY2UpO1xuXG5cdGVsLmlubmVySFRNTCA9IGFkZFRlaHRhclNwYW5zKGFkZEJycyhzb3VyY2UsIHNldHRpbmdzKSwgc2V0dGluZ3MpO1xuXHRlbC5pZCA9ICd0ZW5nJztcblx0ZWwuY2xhc3NMaXN0LmFkZChhZGRUZW5nd2FyRm9udENsYXNzKGVuY29kaW5nKSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNVTyxJQUFNLGlCQUFpQixDQUFDLE9BQWdDLENBQUMsT0FBdUI7QUFBQSxFQUN0RixxQkFBcUI7QUFBQSxFQUNyQixhQUFhO0FBQUEsRUFDYixjQUFjO0FBQUEsRUFDZCxVQUFVO0FBQUEsRUFDVixHQUFHO0FBQ0Y7OztBQ2RLLElBQU0sMEJBQTBCLGVBQWU7QUFBQSxFQUNyRCxxQkFBcUI7QUFBQSxFQUNyQixhQUFhO0FBQUEsRUFDYixVQUFVO0FBQUEsRUFDVixjQUFjO0FBQ2YsQ0FBQzs7O0FDTkQsc0JBQStDO0FBRXhDLElBQU0sY0FBTixjQUEwQixpQ0FBaUI7QUFBQSxFQUdqRCxZQUFZLEtBQVUsUUFBeUI7QUFDOUMsVUFBTSxLQUFLLE1BQU07QUFDakIsU0FBSyxTQUFTO0FBQUEsRUFDZjtBQUFBLEVBRUEsVUFBZ0I7QUFDZixVQUFNLEVBQUMsWUFBVyxJQUFJO0FBRXRCLGdCQUFZLE1BQU07QUFFbEIsUUFBSSx3QkFBUSxXQUFXLEVBQ3JCLFFBQVEsNkJBQTZCLEVBQ3JDLFFBQVEsc0VBQXNFLEVBQzlFLFVBQVUsVUFBUSxLQUNqQixTQUFTLEtBQUssT0FBTyxTQUFTLG1CQUFtQixFQUNqRCxTQUFTLE9BQU8sVUFBVTtBQUMxQixXQUFLLE9BQU8sU0FBUyxzQkFBc0I7QUFDM0MsWUFBTSxLQUFLLE9BQU8sYUFBYTtBQUMvQixXQUFLLE9BQU8sUUFBUTtBQUFBLElBQ3JCLENBQUMsQ0FBQztBQUVKLFFBQUksd0JBQVEsV0FBVyxFQUN0QixRQUFRLE9BQU8sRUFDZixRQUFRLDhCQUE4QixFQUN0QyxlQUFlLFdBQVMsTUFDdkIsU0FBUyxLQUFLLE9BQU8sU0FBUyxXQUFXLEVBQ3pDLFNBQVMsT0FBTyxVQUFVO0FBQzFCLFdBQUssT0FBTyxTQUFTLGNBQWM7QUFDbkMsWUFBTSxLQUFLLE9BQU8sYUFBYTtBQUMvQixXQUFLLE9BQU8sUUFBUTtBQUFBLElBQ3JCLENBQUMsQ0FBQztBQUVILFFBQUksd0JBQVEsV0FBVyxFQUN0QixRQUFRLG1CQUFtQixFQUMzQixRQUFRLGFBQWEsRUFDckIsWUFBWSxVQUFRLEtBQ25CLFNBQVMsS0FBSyxPQUFPLFNBQVMsUUFBUSxFQUN0QyxZQUFZLElBQUksRUFDaEIsU0FBUyxPQUFPLFVBQVU7QUFDMUIsV0FBSyxPQUFPLFNBQVMsV0FBVztBQUNoQyxZQUFNLEtBQUssT0FBTyxhQUFhO0FBQy9CLFdBQUssT0FBTyxRQUFRO0FBQUEsSUFDckIsQ0FBQyxDQUFDO0FBRUgsUUFBSSx3QkFBUSxXQUFXLEVBQ3RCLFFBQVEsY0FBYyxFQUN0QixRQUFRLGFBQWEsRUFDckIsWUFBWSxJQUFJLEVBQ2hCLFlBQVksVUFBUSxLQUNuQixTQUFTLEtBQUssT0FBTyxTQUFTLFFBQVEsRUFDdEMsU0FBUyxPQUFPLFVBQVU7QUFDMUIsV0FBSyxPQUFPLFNBQVMsV0FBVztBQUNoQyxZQUFNLEtBQUssT0FBTyxhQUFhO0FBQy9CLFdBQUssT0FBTyxRQUFRO0FBQUEsSUFDckIsQ0FBQyxDQUFDO0FBQUEsRUFDSjtBQUNEOzs7QUN2RE8sSUFBTSx1QkFBdUI7QUFRN0IsSUFBTSw4QkFBOEI7OztBQ0pwQyxJQUFNLGlCQUFpQixDQUFDLFFBQWdCLGFBQXFDO0FBQ25GLFNBQU8sT0FBTztBQUFBLElBQ2I7QUFBQSxJQUNBLENBQUMsV0FBbUIsc0NBQXNDLFNBQVMsc0JBQXNCLFNBQVMsY0FBYyxZQUFZO0FBQUEsRUFDN0g7QUFDRDtBQUtPLElBQU0sZUFBZSxDQUFDLFFBQWdCLGFBQXFDO0FBRWpGLFFBQU0sV0FBVyxTQUFTLGlCQUFpQixTQUFTO0FBRXBELFdBQVMsUUFBUSxDQUFDLFlBQVk7QUFDN0IsWUFBUSxNQUFNLFFBQVEsU0FBUyxzQkFBc0IsU0FBUyxjQUFjO0FBQUEsRUFDN0UsQ0FBQztBQUVELFNBQU87QUFDUjtBQUVPLElBQU0sY0FBYyxDQUFDLFdBQTZCO0FBQ3hELFFBQU0sU0FBUyxxQkFBcUIsS0FBSyxNQUFNO0FBRS9DLFVBQVEsSUFBSSxlQUFlLFFBQVEsTUFBTTtBQUV6QyxNQUFJLFFBQVE7QUFDWCxXQUFPO0FBQUEsRUFDUjtBQUVBLFNBQU87QUFDUjtBQUVPLElBQU0sU0FBUyxDQUFDLFFBQWdCLGFBQXFDO0FBQzNFLFFBQU0sWUFBWSxPQUFPLFdBQVcsTUFBTSxRQUFRO0FBRWxELFNBQU87QUFDUjtBQUVBLElBQU0sc0JBQXNCLENBQUMsYUFBdUI7QUFDbkQsVUFBUSxVQUFVO0FBQUEsSUFDakIsS0FBSztBQUNKLGFBQU87QUFBQSxJQUNSLEtBQUs7QUFDSixhQUFPO0FBQUEsRUFDVDtBQUNEO0FBRU8sSUFBTSxnQkFBMEMsQ0FBQyxhQUFhLENBQUMsUUFBUSxJQUFJLFNBQVM7QUFDMUYsUUFBTSxXQUFXLFlBQVksTUFBTTtBQUVuQyxLQUFHLFlBQVksZUFBZSxPQUFPLFFBQVEsUUFBUSxHQUFHLFFBQVE7QUFDaEUsS0FBRyxLQUFLO0FBQ1IsS0FBRyxVQUFVLElBQUksb0JBQW9CLFFBQVEsQ0FBQztBQUMvQzs7O0FMN0RBLElBQUFBLG1CQUF1QjtBQUV2QixJQUFxQixrQkFBckIsY0FBNkMsd0JBQU87QUFBQSxFQUduRCxVQUFVO0FBQ1QsVUFBTSxXQUFXLFNBQVMsaUJBQWlCLE9BQU87QUFFbEQsYUFBUyxRQUFRLENBQUMsWUFBWTtBQUM3QixjQUFRLFlBQVksYUFBYSxRQUFRLFdBQVcsS0FBSyxRQUFRO0FBQUEsSUFDbEUsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQU0sU0FBUztBQUNkLFVBQU0sS0FBSyxhQUFhO0FBS3hCLFNBQUssbUNBQW1DLFFBQVEsY0FBYyxLQUFLLFFBQVEsQ0FBQztBQUs1RSxTQUFLLGNBQWMsSUFBSSxZQUFZLEtBQUssS0FBSyxJQUFJLENBQUM7QUFBQSxFQUNuRDtBQUFBLEVBRUEsV0FBVztBQUFBLEVBQUM7QUFBQSxFQUVaLE1BQU0sZUFBZTtBQUNwQixTQUFLLFdBQVcsT0FBTyxPQUFPLENBQUMsR0FBRyx5QkFBeUIsTUFBTSxLQUFLLFNBQVMsQ0FBQztBQUFBLEVBQ2pGO0FBQUEsRUFFQSxNQUFNLGVBQWU7QUFDcEIsVUFBTSxLQUFLLFNBQVMsS0FBSyxRQUFRO0FBQUEsRUFDbEM7QUFDRDsiLAogICJuYW1lcyI6IFsiaW1wb3J0X29ic2lkaWFuIl0KfQo=
