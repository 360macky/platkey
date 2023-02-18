/**
 * @file Common functions used in the extension.
 */

/**
 * @name isMac
 * @description Checks if the user is using Mac OS
 * @returns {boolean}
 */
export function isMac(): boolean {
  return window.navigator.userAgent.indexOf("Mac") != -1;
}

/**
 * @name getScriptOrStylesheet
 * @description Get the URL of the script or stylesheet to be injected.
 * @param {string} name
 * @returns {string}
 */
export function getScriptOrStylesheet(name: string): string {
  switch (name) {
    case "greenboard.css":
      return "https://360macky.github.io/platzikey-themes/utils/greenboard.css";
      break;

    default:
      return "";
      break;
  }
}

/**
 * Convert HTML string to HTML template.
 * @param {String} html Representing a single element.
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 */
export function htmlToElement(html: string): ChildNode | null {
  const template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}
