/**
 * @name isMac
 * @description Checks if the user is using Mac OS
 * @returns {boolean}
 */
function isMac() {
  return window.navigator.userAgent.indexOf("Mac") != -1;
}

const TIME_TO_LOAD_SPOTLIGHT = 200;

chrome.storage.sync.get("spotlight", ({ spotlight }) => {
  /**
   * @name loadSpotlightShortcut
   * @description Loads the spotlight search bar shortcut (cmd+k)
   * @param {Event} event
   */
  const loadSpotlightShortcut = (event: KeyboardEvent) => {
    const cmdOrCtrl = isMac() ? event.metaKey : event.ctrlKey;
    const cmdKPressed = event.key === "k" && cmdOrCtrl;
    const escPressed = event.key === "Escape";
    if (cmdKPressed) {
      let activeElement = document.activeElement as HTMLElement;
      if (activeElement.tagName !== "TEXTAREA") {
        const searchBar = document.getElementsByClassName("NewSearch")[0] as HTMLDivElement;
        if (searchBar.style.display === "none") {
          const searchInput =
            document.getElementsByClassName("NewSearch-input")[0] as HTMLInputElement;
          searchBar.style.display = "block";
          searchInput.focus();
        } else {
          searchBar.style.display = "none";
        }
      }
    }
    if (escPressed) {
      const searchBar = document.getElementsByClassName("NewSearch")[0] as HTMLDivElement;
      searchBar.style.display = "none";
    }
  };
  /**
   * @name loadSpotlight
   * @description Loads the spotlight search bar
   */
  function loadSpotlight() {
    const searchBar = document.getElementsByClassName("NewSearch")[0] as HTMLDivElement;
    const searchBox = document.getElementsByClassName("NewSearch-box")[0] as HTMLDivElement;
    const searchBoxContainer = document.getElementsByClassName("NewSearch-box-container")[0] as HTMLFormElement;
    const searchNavbarDropDown = document.getElementsByClassName('NewSearch-dropdown')[0] as HTMLUListElement;

    const spotlightWrapper = document.createElement("div");
    spotlightWrapper.id = "NewSearchSpotlight";
    spotlightWrapper.style.width = "100%";
    spotlightWrapper.style.display = "flex";
    spotlightWrapper.style.position = "absolute";
    spotlightWrapper.style.justifyContent = "center";
    let searchBarParent = searchBar.parentNode as HTMLElement;
    searchBarParent.insertBefore(spotlightWrapper, searchBar);
    spotlightWrapper.appendChild(searchBar);

    searchBar.style.transform = "translate(0, 16vh) scale(1.4)";
    searchBox.style.boxShadow = "0px 6px 32px 0px rgb(51 177 255 / 75%)";
    searchBox.style.width = "480px";
    searchBar.style.display = "none";
    searchBoxContainer.style.width = "480px";
    searchNavbarDropDown.style.width = "480px";

  }
  if (spotlight) {
    setTimeout(() => {
      loadSpotlight();
      window.addEventListener("keydown", loadSpotlightShortcut);
    }, TIME_TO_LOAD_SPOTLIGHT);
  }
});
