/**
 * @file Service worker script for the extension that runs when the extension is installed.
 * {@link https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/#service-workers}
 */

/**
 * @typedef {"normal" | "zen" | "ssh"} PLATZI_THEME
 */
type PLATZI_THEME = "normal" | "zen" | "ssh";

/**
 * @interface IExtensionStorage
 * @description Interface for the extension storage object.
 * @property {boolean} shortcuts - Are the shortcuts enabled?
 * @property {boolean} greenboard - Is the greenboard enabled?
 * @property {string} theme - The theme of the extension (normal, zen, or ssh).
 * @property {boolean} spotlight - Is the spotlight enabled?
 * @property {any[]} classlist - The list of highlighted classes.
 * @property {any[]} savedContributions - The saved contributions of the user.
 */
interface IExtensionStorage {
  shortcuts: boolean;
  greenboard: boolean;
  theme: PLATZI_THEME;
  spotlight: boolean;
  classlist: any[];
  savedContributions: any[];
}

const extensionStorage: IExtensionStorage = {
  shortcuts: false,
  greenboard: false,
  theme: "normal",
  spotlight: false,
  classlist: [],
  savedContributions: [],
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(extensionStorage);
});
