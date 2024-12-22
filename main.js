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
  tengCsurFont: "tengwar-formal-csur",
  tengFont: "tengwar-annatar"
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
    new import_obsidian.Setting(containerEl).setName("Tengwar CSUR font").setDesc("In Progress").addDropdown((dropdown) => dropdown.addOption("tengwar-telcontar", "Tengwar Telcontar").addOption("tengwar-formal-csur", "Tengwar Formal CSUR").addOption("tengwar-alcarin", "Tengwar Alcarin").setValue(this.plugin.settings.tengCsurFont).setDisabled(true).onChange(async (value) => {
      this.plugin.settings.tengCsurFont = value;
      await this.plugin.saveSettings();
      this.plugin.refresh();
    }));
    new import_obsidian.Setting(containerEl).setName("Tengwar ASCII font").setDesc("In Progress").addDropdown((dropdown) => dropdown.addOption("tengwar-annatar", "Tengwar Annatar").setValue(this.plugin.settings.tengFont).setDisabled(true).onChange(async (value) => {
      this.plugin.settings.tengFont = value;
      await this.plugin.saveSettings();
      this.plugin.refresh();
    }));
  }
};

// feature/tengwar/domain/entity/csurTengwar.ts
var TENGWAR_CSUR_REG_EXP = /[\uE000-\uE06E]/;
var TENGWAR_TEHTAR_CSUR_REG_EXP = /[\uE040-\uE05D]/g;

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
      return "TengwarTelcontar";
    case "ASCII":
      return "TengwarAnnatar";
  }
};
var tengProcessor = (settings) => (source, el, _ctx) => {
  const encoding = getEncoding(source);
  el.innerHTML = addTehtarSpans(addBrs(source, settings), settings);
  el.id = "teng";
  el.classList.add("tengwarBlock");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyIsICJmZWF0dXJlL3NldHRpbmdzL2RvbWFpbi9lbnRpdHkvcGx1Z2luLXNldHRpbmdzLnRzIiwgImZlYXR1cmUvc2V0dGluZ3MvZG9tYWluL2VudGl0eS9kZWZhdWx0LXBsdWdpbi1zZXR0aW5ncy50cyIsICJmZWF0dXJlL3NldHRpbmdzL3VpL3NldHRpbmdzLXRhYi50cyIsICJmZWF0dXJlL3Rlbmd3YXIvZG9tYWluL2VudGl0eS9jc3VyVGVuZ3dhci50cyIsICJmZWF0dXJlL3Rlbmd3YXIvdWkvdGVuZy1wcm9jZXNzb3IudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IERFRkFVTFRfUExVR0lOX1NFVFRJTkdTIH0gZnJvbSAnZmVhdHVyZS9zZXR0aW5ncy9kb21haW4vZW50aXR5L2RlZmF1bHQtcGx1Z2luLXNldHRpbmdzJztcbmltcG9ydCB7IFBsdWdpblNldHRpbmdzIH0gZnJvbSAnZmVhdHVyZS9zZXR0aW5ncy9kb21haW4vZW50aXR5L3BsdWdpbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBTZXR0aW5nc1RhYiB9IGZyb20gJ2ZlYXR1cmUvc2V0dGluZ3MvdWkvc2V0dGluZ3MtdGFiJztcbmltcG9ydCB7IGFkZEJycywgY2hhbmdlVGVodGFyLCB0ZW5nUHJvY2Vzc29yIH0gZnJvbSAnZmVhdHVyZS90ZW5nd2FyL3VpL3RlbmctcHJvY2Vzc29yJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzaWRpYW5UZW5nd2FyIGV4dGVuZHMgUGx1Z2luIHtcblx0c2V0dGluZ3M6IFBsdWdpblNldHRpbmdzO1xuXG5cdHJlZnJlc2goKSB7XG5cdFx0Y29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3RlbmdcIik7XG5cblx0XHRlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IGNoYW5nZVRlaHRhcihlbGVtZW50LmlubmVySFRNTCwgdGhpcy5zZXR0aW5ncyk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBvbmxvYWQoKSB7XG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuXHRcdC8qKlxuXHRcdCAqIEFkZCBjb2RlIGJsb2NrIHByb2Nlc3NvciBmb3IgJ3RlbmcnXG5cdFx0ICovXG5cdFx0dGhpcy5yZWdpc3Rlck1hcmtkb3duQ29kZUJsb2NrUHJvY2Vzc29yKCd0ZW5nJywgdGVuZ1Byb2Nlc3Nvcih0aGlzLnNldHRpbmdzKSk7XG5cblx0XHQvKipcblx0XHQgKiBUaGlzIGFkZHMgYSBzZXR0aW5ncyB0YWIgc28gdGhlIHVzZXIgY2FuIGNvbmZpZ3VyZSB2YXJpb3VzIGFzcGVjdHMgb2YgdGhlIHBsdWdpblxuXHRcdCAqL1xuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcblx0fVxuXG5cdG9udW5sb2FkKCkge31cblxuXHRhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfUExVR0lOX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXHR9XG5cblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG5cdH1cbn1cbiIsICIvKipcbiAqIFNldHRpbmdzIG9mIHRoaXMgcGx1Z2luXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGx1Z2luU2V0dGluZ3Mge1xuXHRpc0hpZ2hsaWdodGVkVGVodGFyOiBib29sZWFuO1xuXHR0ZWh0YXJDb2xvcjogc3RyaW5nO1xuXHR0ZW5nQ3N1ckZvbnQ6IHN0cmluZztcblx0dGVuZ0ZvbnQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHBsdWdpblNldHRpbmdzID0gKGRhdGE6IFBhcnRpYWw8UGx1Z2luU2V0dGluZ3M+ID0ge30pOiBQbHVnaW5TZXR0aW5ncyA9PiAoe1xuXHRpc0hpZ2hsaWdodGVkVGVodGFyOiBmYWxzZSxcblx0dGVodGFyQ29sb3I6ICcnLFxuXHR0ZW5nQ3N1ckZvbnQ6ICcnLFxuXHR0ZW5nRm9udDogJycsXG5cdC4uLmRhdGEsXG4gIH0pO1xuICAiLCAiaW1wb3J0IHsgcGx1Z2luU2V0dGluZ3MsIFBsdWdpblNldHRpbmdzIH0gZnJvbSBcIi4vcGx1Z2luLXNldHRpbmdzXCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1BMVUdJTl9TRVRUSU5HUyA9IHBsdWdpblNldHRpbmdzKHtcblx0aXNIaWdobGlnaHRlZFRlaHRhcjogdHJ1ZSxcblx0dGVodGFyQ29sb3I6ICcjQTc4QUY5Jyxcblx0dGVuZ0NzdXJGb250OiAndGVuZ3dhci1mb3JtYWwtY3N1cicsXG5cdHRlbmdGb250OiAndGVuZ3dhci1hbm5hdGFyJyxcbn0pXG4iLCAiaW1wb3J0IE9ic2lkaWFuVGVuZ3dhciBmcm9tICdtYWluJztcbmltcG9ydCB7IEFwcCwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG5cdHBsdWdpbjogT2JzaWRpYW5UZW5nd2FyO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE9ic2lkaWFuVGVuZ3dhcikge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdGRpc3BsYXkoKTogdm9pZCB7XG5cdFx0Y29uc3Qge2NvbnRhaW5lckVsfSA9IHRoaXM7XG5cblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnVHVybiBvbiBUZWh0YXIgaGlnaGxpZ2h0aW5nJylcblx0XHRcdC5zZXREZXNjKCdTaWducyBhbmQgc3ltYm9scyB3cml0dGVuIGFib3ZlIG9yIGJlbG93IGxldHRlcnMgd2lsbCBiZSBoaWdobGlnaHRlZCcpXG5cdFx0XHQuYWRkVG9nZ2xlKHRleHQgPT4gdGV4dFxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaXNIaWdobGlnaHRlZFRlaHRhcilcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmlzSGlnaGxpZ2h0ZWRUZWh0YXIgPSB2YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG5cdFx0XHRcdH0pKTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdC5zZXROYW1lKCdDb2xvcicpXG5cdFx0LnNldERlc2MoJ0NvbG9yIG9mIGhpZ2hsaWdodGVkIFRlaHRhcnMnKVxuXHRcdC5hZGRDb2xvclBpY2tlcihjb2xvciA9PiBjb2xvclxuXHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRlaHRhckNvbG9yKVxuXHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZWh0YXJDb2xvciA9IHZhbHVlO1xuXHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0dGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuXHRcdFx0fSkpO1xuXHRcdFxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdC5zZXROYW1lKCdUZW5nd2FyIENTVVIgZm9udCcpXG5cdFx0LnNldERlc2MoJ0luIFByb2dyZXNzJylcblx0XHQuYWRkRHJvcGRvd24oZHJvcGRvd24gPT4gZHJvcGRvd25cblx0XHRcdC5hZGRPcHRpb24oJ3Rlbmd3YXItdGVsY29udGFyJywgJ1Rlbmd3YXIgVGVsY29udGFyJylcblx0XHRcdC5hZGRPcHRpb24oJ3Rlbmd3YXItZm9ybWFsLWNzdXInLCAnVGVuZ3dhciBGb3JtYWwgQ1NVUicpXG5cdFx0XHQuYWRkT3B0aW9uKCd0ZW5nd2FyLWFsY2FyaW4nLCAnVGVuZ3dhciBBbGNhcmluJylcblx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZW5nQ3N1ckZvbnQpXG5cdFx0XHQuc2V0RGlzYWJsZWQodHJ1ZSlcblx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudGVuZ0NzdXJGb250ID0gdmFsdWU7XG5cdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHR0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG5cdFx0XHR9KSk7XG5cdFx0XG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0LnNldE5hbWUoJ1Rlbmd3YXIgQVNDSUkgZm9udCcpXG5cdFx0LnNldERlc2MoJ0luIFByb2dyZXNzJylcblx0XHQuYWRkRHJvcGRvd24oZHJvcGRvd24gPT4gZHJvcGRvd25cblx0XHRcdC5hZGRPcHRpb24oJ3Rlbmd3YXItYW5uYXRhcicsICdUZW5nd2FyIEFubmF0YXInKVxuXHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbmdGb250KVxuXHRcdFx0LnNldERpc2FibGVkKHRydWUpXG5cdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbmdGb250ID0gdmFsdWU7XG5cdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHR0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG5cdFx0XHR9KSk7XG5cdH1cbn1cbiIsICIvKipcbiAqIEFsbCB0ZW5nd2FyIHN5bWJvbHMgaW4gQ1NVUlxuICogbW9yZSBpbmZvOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db25TY3JpcHRfVW5pY29kZV9SZWdpc3RyeVxuICogXG4gKiBUaGUgcmFuZ2Ugb2YgY29kZXMgaXMgdGFrZW4gZnJvbSBXaWtpcGVkaWFcbiAqIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Rlbmd3YXJcbiAqL1xuZXhwb3J0IGNvbnN0IFRFTkdXQVJfQ1NVUl9SRUdfRVhQID0gL1tcXHVFMDAwLVxcdUUwNkVdLztcblxuLyoqXG4gKiBTcGVjaWFsIHRlbmd3YXIgc3ltYm9scyAoVGVodGFyKVxuICogXG4gKiBUaGUgcmFuZ2Ugb2YgY29kZXMgaXMgdGFrZW4gZnJvbSBXaWtpcGVkaWFcbiAqIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Rlbmd3YXJcbiAqL1xuZXhwb3J0IGNvbnN0IFRFTkdXQVJfVEVIVEFSX0NTVVJfUkVHX0VYUCA9IC9bXFx1RTA0MC1cXHVFMDVEXS9nO1xuIiwgImltcG9ydCB7IFBsdWdpbkNvZGVCbG9ja1Byb2Nlc3NvciB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XG5pbXBvcnQgeyBURU5HV0FSX0NTVVJfUkVHX0VYUCwgVEVOR1dBUl9URUhUQVJfQ1NVUl9SRUdfRVhQIH0gZnJvbSBcIi4uL2RvbWFpbi9lbnRpdHkvY3N1clRlbmd3YXJcIjtcbmltcG9ydCB7IEVuY29kaW5nIH0gZnJvbSBcIi4uL2RvbWFpbi9lbnRpdHkvZW5jb2RpbmdcIjtcbmltcG9ydCB7IFBsdWdpblNldHRpbmdzIH0gZnJvbSBcImZlYXR1cmUvc2V0dGluZ3MvZG9tYWluL2VudGl0eS9wbHVnaW4tc2V0dGluZ3NcIjtcblxuZXhwb3J0IGNvbnN0IGFkZFRlaHRhclNwYW5zID0gKHNvdXJjZTogc3RyaW5nLCBzZXR0aW5nczogUGx1Z2luU2V0dGluZ3MpOiBzdHJpbmcgPT4ge1xuXHRyZXR1cm4gc291cmNlLnJlcGxhY2VBbGwoXG5cdFx0VEVOR1dBUl9URUhUQVJfQ1NVUl9SRUdfRVhQLFxuXHRcdCh0ZWh0YXI6IHN0cmluZykgPT4gYDxzcGFuIGNsYXNzPVwidGVodGFyXCIgc3R5bGU9XCJjb2xvcjogJHtzZXR0aW5ncy5pc0hpZ2hsaWdodGVkVGVodGFyID8gc2V0dGluZ3MudGVodGFyQ29sb3IgOiAndW5zZXQnfVwiPiR7dGVodGFyfTwvc3Bhbj5gLFxuXHQpXG59XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VUZWh0YXIgPSAoc291cmNlOiBzdHJpbmcsIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncyk6IHN0cmluZyA9PiB7XG5cblx0Y29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRlaHRhclwiKTtcblxuXHRlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0ZWxlbWVudC5zdHlsZS5jb2xvciA9IHNldHRpbmdzLmlzSGlnaGxpZ2h0ZWRUZWh0YXIgPyBzZXR0aW5ncy50ZWh0YXJDb2xvciA6ICd1bnNldCc7XG5cdH0pOyBcblxuXHRyZXR1cm4gc291cmNlO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0RW5jb2RpbmcgPSAoc291cmNlOiBzdHJpbmcpOiBFbmNvZGluZyA9PiB7XG5cdGNvbnN0IGlzQ1NVUiA9IFRFTkdXQVJfQ1NVUl9SRUdfRVhQLnRlc3Qoc291cmNlKTtcblxuXHRpZiAoaXNDU1VSKSB7XG5cdFx0cmV0dXJuICdDU1VSJ1xuXHR9XG5cblx0cmV0dXJuICdBU0NJSSc7XG59XG5cbmV4cG9ydCBjb25zdCBhZGRCcnMgPSAoc291cmNlOiBzdHJpbmcsIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncyk6IHN0cmluZyA9PiB7XG5cdGNvbnN0IGlubmVySFRNTCA9IHNvdXJjZS5yZXBsYWNlQWxsKCdcXG4nLCAnPGJyIC8+Jyk7XG5cblx0cmV0dXJuIGlubmVySFRNTDtcbn1cblxuY29uc3QgYWRkVGVuZ3dhckZvbnRDbGFzcyA9IChlbmNvZGluZzogRW5jb2RpbmcpID0+IHtcblx0c3dpdGNoIChlbmNvZGluZykge1xuXHRcdGNhc2UgJ0NTVVInOlxuXHRcdFx0cmV0dXJuICdUZW5nd2FyVGVsY29udGFyJztcblx0XHRjYXNlICdBU0NJSSc6XG5cdFx0XHRyZXR1cm4gJ1Rlbmd3YXJBbm5hdGFyJztcblx0fVxufVxuXG5leHBvcnQgY29uc3QgdGVuZ1Byb2Nlc3NvcjogUGx1Z2luQ29kZUJsb2NrUHJvY2Vzc29yID0gKHNldHRpbmdzKSA9PiAoc291cmNlLCBlbCwgX2N0eCkgPT4ge1xuXHRjb25zdCBlbmNvZGluZyA9IGdldEVuY29kaW5nKHNvdXJjZSk7XG5cblx0ZWwuaW5uZXJIVE1MID0gYWRkVGVodGFyU3BhbnMoYWRkQnJzKHNvdXJjZSwgc2V0dGluZ3MpLCBzZXR0aW5ncyk7XG5cdGVsLmlkID0gJ3RlbmcnO1xuXHRlbC5jbGFzc0xpc3QuYWRkKCd0ZW5nd2FyQmxvY2snKVxuXHRlbC5jbGFzc0xpc3QuYWRkKGFkZFRlbmd3YXJGb250Q2xhc3MoZW5jb2RpbmcpKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ1VPLElBQU0saUJBQWlCLENBQUMsT0FBZ0MsQ0FBQyxPQUF1QjtBQUFBLEVBQ3RGLHFCQUFxQjtBQUFBLEVBQ3JCLGFBQWE7QUFBQSxFQUNiLGNBQWM7QUFBQSxFQUNkLFVBQVU7QUFBQSxFQUNWLEdBQUc7QUFDRjs7O0FDZEssSUFBTSwwQkFBMEIsZUFBZTtBQUFBLEVBQ3JELHFCQUFxQjtBQUFBLEVBQ3JCLGFBQWE7QUFBQSxFQUNiLGNBQWM7QUFBQSxFQUNkLFVBQVU7QUFDWCxDQUFDOzs7QUNORCxzQkFBK0M7QUFFeEMsSUFBTSxjQUFOLGNBQTBCLGlDQUFpQjtBQUFBLEVBR2pELFlBQVksS0FBVSxRQUF5QjtBQUM5QyxVQUFNLEtBQUssTUFBTTtBQUNqQixTQUFLLFNBQVM7QUFBQSxFQUNmO0FBQUEsRUFFQSxVQUFnQjtBQUNmLFVBQU0sRUFBQyxZQUFXLElBQUk7QUFFdEIsZ0JBQVksTUFBTTtBQUVsQixRQUFJLHdCQUFRLFdBQVcsRUFDckIsUUFBUSw2QkFBNkIsRUFDckMsUUFBUSxz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
