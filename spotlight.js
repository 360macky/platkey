function isMac() {
  return window.navigator.userAgent.indexOf("Mac") != -1;
}

chrome.storage.sync.get("spotlight", ({ spotlight }) => {
  const loadSpotlightShortcut = (event) => {
    console.log('Shortcut loaded!');
    const cmdOrCtrl = isMac() ? event.metaKey : event.ctrlKey;
    const cmdKPressed = event.key === "k" && cmdOrCtrl;
    const escPressed = event.key === "Escape";
    if (cmdKPressed) {
      if (document.activeElement.tagName !== "TEXTAREA") {
        const searchBar = document.getElementsByClassName("NewSearch")[0];
        if (searchBar.style.display === "none") {
          const searchInput =
            document.getElementsByClassName("NewSearch-input")[0];
          searchBar.style.display = "block";
          searchInput.focus();
        } else {
          searchBar.style.display = "none";
        }
      }
    }
    if (escPressed) {
      const searchBar = document.getElementsByClassName("NewSearch")[0];
      searchBar.style.display = "none";
    }
  };
  function loadSpotlight() {
    const searchBar = document.getElementsByClassName("NewSearch")[0];
    const searchBox = document.getElementsByClassName("NewSearch-box")[0];
    const searchBoxContainer = document.getElementsByClassName("NewSearch-box-container")[0];
    const searchNavbarDropDown = document.getElementsByClassName('NewSearch-dropdown')[0];

    const spotlightWrapper = document.createElement("div");
    spotlightWrapper.id = "NewSearchSpotlight";
    spotlightWrapper.style.width = "100%";
    spotlightWrapper.style.display = "flex";
    spotlightWrapper.style.position = "absolute";
    spotlightWrapper.style.justifyContent = "center";
    searchBar.parentNode.insertBefore(spotlightWrapper, searchBar);
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
    }, 500);
  }
});
