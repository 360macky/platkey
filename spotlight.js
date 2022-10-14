chrome.storage.sync.get("spotlight", ({ spotlight }) => {
  const shortcuts = (event) => {
    const cmdKPressed = event.key === "k" && event.metaKey;
    const ctrlKPressed = event.key === "k" && event.ctrlKey;
    const escPressed = event.key === "Escape";
    if (cmdKPressed || ctrlKPressed) {
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
    if (escPressed) {
      const searchBar = document.getElementsByClassName("NewSearch")[0];
      searchBar.style.display = "none";
    }
  };
  function loadSpotlight() {
    const searchBar = document.getElementsByClassName("NewSearch")[0];
    const searchBox = document.getElementsByClassName("NewSearch-box")[0];

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
    searchBar.style.display = "none";
  }
  if (spotlight) {
    loadSpotlight();
    window.addEventListener("keydown", shortcuts);
  }
});
