const reportContainer = document.getElementsByClassName(
  "Header-class-report"
)[0];

/**
 * Convert HTML string to HTML template.
 * @param {String} HTML representing a single element.
 * @return {Element}
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 */
function htmlToElement(html) {
  const template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * Convert HTML string to HTML template.
 * @param {String} HTML representing a single element.
 * @return {Element}
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 */
function htmlToElement(html) {
  const template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * Generate an unique identifier for each contribution
 * @param {string} author
 * @param {string} url
 * @param {string} textPreview
 */
function getContributionId(author, url, textPreview = "") {
  return `${author.replace(/\s/g, "")}${url}${textPreview.replace(/\s/g, "")}`;
}

/**
 * Returns true if the contributions array will be empty
 * @param {string} contributionId 
 * @param {function} callback 
 */
function deleteContributionById(contributionId, callback = () => {}) {
  chrome.storage.sync.get(
    "savedContributions",
    ({ savedContributions }) => {
      let updatedSavedContributions = savedContributions.filter(
        (saveContribution) => saveContribution.id !== contributionId
      );
      chrome.storage.sync.set({
        savedContributions: updatedSavedContributions,
      });
      callback();
      if (updatedSavedContributions.length === 0) {
        return true;
      }
      return false;
    }
  );
}

if (window.location.href.startsWith("https://platzi.com/clases/")) {
  function saveClass() {
    const saveClassButton = document.getElementById("save-class-button");
    const platziClass = {
      title: document.title.slice(0, -9),
      url: window.location.href,
    };
    chrome.storage.sync.get("classlist", ({ classlist }) => {
      let isClassHighlighted = classlist.some(
        (classitem) => classitem.url === window.location.href
      );
      if (isClassHighlighted) {
        // Delete highlighted Platzi class.
        let updatedClassList = classlist.filter(
          (classitem) => classitem.url !== window.location.href
        );
        chrome.storage.sync.set({ classlist: updatedClassList });
        saveClassButton.style.filter = "";
      } else {
        // Highlight Platzi class.
        let updatedClassList = classlist;
        classlist[classlist.length] = platziClass;
        chrome.storage.sync.set({ classlist: updatedClassList });
        saveClassButton.style.filter = "sepia(1)";
      }
    });
  }

  /**
   * @name saveContribution
   * @description Save or delete a contribution based on the button text.
   * @param {Event} event
   */
  function saveContribution(event) {
    const saveContributionButton = event.target;
    const contributionId = getContributionId(
      saveContributionButton.getAttribute("data-author"),
      saveContributionButton.getAttribute("data-link"),
      saveContributionButton.getAttribute("data-textpreview")
    );
    const platziContribution = {
      id: contributionId,
      title: document.title.slice(0, -9),
      author: saveContributionButton.getAttribute("data-author"),
      textPreview: saveContributionButton.getAttribute("data-textpreview"),
      url: saveContributionButton.getAttribute("data-link"),
      course: saveContributionButton.getAttribute("data-course"),
    };
    if (saveContributionButton.textContent === "Guardar") {
      // Save contribution
      chrome.storage.sync.get(
        "savedContributions",
        ({ savedContributions }) => {
          let updatedSavedContributions = savedContributions;
          savedContributions[savedContributions.length] = platziContribution;
          chrome.storage.sync.set({
            savedContributions: updatedSavedContributions,
          });
          saveContributionButton.textContent = "Guardado";
        }
      );
    } else {
      // Delete contribution
      deleteContributionById(contributionId, () => {saveContributionButton.textContent = "Guardar"})
    }
  }

  /**
   * @name loadSaveClassButton
   * @description Load the "Save class" button.
   */
  const loadSaveContributionButtons = () => {
    const contributionsQuantity = Array.from(
      document.getElementsByClassName("Content-author")
    ).length;
    for (let index = 0; index < contributionsQuantity; index++) {
      const saveContributionButton = document.createElement("button");
      saveContributionButton.id = `save-${index}`;
      saveContributionButton.classList.add("save-contribution-button");

      const contributionLink = Array.from(
        document.getElementsByClassName("Content-author")
      )[index].children[1].children[1].href;
      const contributionTextPreview = Array.from(
        document.getElementsByClassName("Content-author")
      )[
        index
      ].parentNode.children[1].children[1].children[0].textContent.substring(
        0,
        82
      );
      const contributionAuthor = Array.from(
        document.getElementsByClassName("Content-author")
      )[index].children[1].children[0].textContent;

      saveContributionButton.setAttribute("data-link", contributionLink);
      saveContributionButton.setAttribute(
        "data-textpreview",
        contributionTextPreview
      );
      saveContributionButton.setAttribute("data-author", contributionAuthor);
      saveContributionButton.setAttribute(
        "data-course",
        document.getElementsByClassName("Header-course-info-content")[0]
          .children[0].textContent
      );

      // Check if contribution is saved
      const currentContributionId = getContributionId(
        contributionAuthor,
        contributionLink,
        contributionTextPreview
      );

      chrome.storage.sync.get(
        "savedContributions",
        ({ savedContributions }) => {
          let isSavedContribution = savedContributions.some(
            (savedContribution) =>
              savedContribution.id === currentContributionId
          );
          if (isSavedContribution) {
            saveContributionButton.textContent = "Guardado";
          } else {
            saveContributionButton.textContent = "Guardar";
          }
        }
      );

      saveContributionButton.onclick = saveContribution;
      Array.from(document.getElementsByClassName("Content-author"))[
        index
      ].children[1].appendChild(saveContributionButton);
    }
  }

  /**
   * @name addContributionsButtonListener
   * @description Add a listener to the contributions section to load the "Save contribution" buttons for each contribution.
   */
  const addContributionsButtonListener = () => {
    const contributionsTab = document.getElementsByClassName('CommunityTabs-content-tabs')[0].children[0];
    contributionsTab.addEventListener("click", () => {
      setTimeout(() => {
        loadSaveContributionButtons();
      }, 2000);
    })
  }

  setTimeout(loadSaveContributionButtons, 2000);
  setTimeout(addContributionsButtonListener, 2000);

  chrome.storage.sync.get("classlist", ({ classlist }) => {
    let isClassHighlighted = classlist.some(
      (classitem) => classitem.url === window.location.href
    );

    const highlightClassButton = document.createElement("button");
    highlightClassButton.id = "save-class-button";
    if (isClassHighlighted) {
      highlightClassButton.style.filter = "sepia(1)";
    }
    highlightClassButton.classList.add("save-class-button");
    const saveClassIconSVG = htmlToElement(
      `<svg xmlns="http://www.w3.org/2000/svg" class="save-class-svg" height="24" width="24"><path fill="currentColor" d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425Zm3.15.45-4.15 2.5q-.275.175-.575.15-.3-.025-.525-.2-.225-.175-.35-.437-.125-.263-.05-.588l1.1-4.725L3.775 11.8q-.25-.225-.312-.513Q3.4 11 3.5 10.725q.1-.275.3-.45.2-.175.55-.225l4.85-.425 1.875-4.45q.125-.3.388-.45.262-.15.537-.15t.538.15q.262.15.387.45l1.875 4.45 4.85.425q.35.05.55.225.2.175.3.45.1.275.038.562-.063.288-.313.513l-3.675 3.175 1.1 4.725q.075.325-.05.588-.125.262-.35.437-.225.175-.525.2-.3.025-.575-.15Zm0-5.025Z"/></svg>`
    );
    highlightClassButton.appendChild(saveClassIconSVG);
    highlightClassButton.onclick = saveClass;

    reportContainer.appendChild(highlightClassButton);
  });
}

if (window.location.href === "https://platzi.com/home") {
  /**
   * @name loadPlatziHighlights
   * @description Load the Platzi highlights (or saved classes) section.
   */
  const loadPlatziHighlights = () => {
    const studentHomeWrapper = document.getElementsByClassName(
      "StudentsHome u-wrapper"
    )[0];
    const learningPathsList =
      document.getElementsByClassName("LearningPathsList")[0];
    const platziList = document.createElement("div");
    platziList.id = "PlatziList";
    const platziListTitleContainer = document.createElement("div");
    const platziTitleLeft = document.createElement("div");
    const platziTitleParagraph = document.createElement("p");
    platziListTitleContainer.classList.add("Title");
    platziTitleLeft.classList.add("Title-left");
    platziTitleParagraph.textContent = "Clases destacadas";
    platziTitleLeft.appendChild(platziTitleParagraph);
    platziListTitleContainer.appendChild(platziTitleLeft);
    platziList.appendChild(platziListTitleContainer);

    const classItems = document.createElement("div");
    classItems.style.display = "flex";
    classItems.style.flexDirection = "row";
    classItems.style.flexWrap = "wrap";
    classItems.style.columnGap = "1rem";
    classItems.style.rowGap = "0.5rem";

    chrome.storage.sync.get("classlist", ({ classlist }) => {
      classlist.forEach((classelement) => {
        const classItem = `<div class="ContentClass"><a href="${classelement.url}"><div class="ContentClass-content test-courseOpenClass ContentClassHighlighted"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg><span class="ContentClass-content-title">${classelement.title}</span></div></a></div>`;

        classItems.appendChild(htmlToElement(classItem));
        platziList.insertAdjacentElement("beforeend", classItems);
        studentHomeWrapper.insertBefore(platziList, learningPathsList);
      });
    });

    // Saved contributions
    const studentHomeWrapperContributions = document.getElementsByClassName(
      "StudentsHome u-wrapper"
    )[0];
    const learningPathsListContributions =
      document.getElementsByClassName("LearningPathsList")[0];
    const platziListContributions = document.createElement("div");
    platziListContributions.id = "SavedContributions";
    const platziListTitleContainerContributions = document.createElement("div");
    const platziTitleLeftContributions = document.createElement("div");
    const platziTitleParagraphContributions = document.createElement("p");
    platziListTitleContainerContributions.classList.add("Title");
    platziTitleLeftContributions.classList.add("Title-left");
    platziTitleParagraphContributions.textContent = "Aportes guardados";
    platziTitleLeftContributions.appendChild(platziTitleParagraphContributions);
    platziListTitleContainerContributions.appendChild(platziTitleLeftContributions);
    platziListContributions.appendChild(platziListTitleContainerContributions);

    const classItemsContributions = document.createElement("div");
    classItemsContributions.style.display = "flex";
    classItemsContributions.style.flexDirection = "row";
    classItemsContributions.style.flexWrap = "wrap";
    classItemsContributions.style.columnGap = "1rem";
    classItemsContributions.style.rowGap = "1rem";
    classItemsContributions.style.alignItems = "stretch";

    /**
     * @name deleteContribution
     * @description Delete a contribution based on its id.
     */
    function deleteContribution(event) {
      event.preventDefault();
      const contributionId = event.target.getAttribute("data-id");
      let confirm = window.confirm("¿Deseas eliminar este aporte de tus aportes guardados?");
      if (confirm) {
        deleteContributionById(contributionId);
        const contributionCard = document.getElementById(`ContributionCard-${contributionId}`);
        contributionCard.style.opacity = "0";
        contributionCard.style.transform = "scale(0.8)";
        contributionCard.setAttribute("href", "");
        contributionCard.style.cursor = "normal";
      }
    }

    chrome.storage.sync.get("savedContributions", ({ savedContributions }) => {
      savedContributions.forEach((savedContribution) => {
        const contribution = htmlToElement(`
          <a href="${savedContribution.url}" id="ContributionCard-${savedContribution.id}" style="transition: all 0.3s ease"><div class="learningPathCard" style="justify-content: flex-start;">
            <div style="color: #ffffff; margin-bottom: 0.9rem; font-weight: 600; font-size: 1.1rem; width: 12rem">
              <span>${savedContribution.title}</span>
            </div>
            <div style="color: #ffffff; margin-bottom: 1rem; width: 12rem">${savedContribution.textPreview}...</div>
            <div class="learningPathCard-bottom" style="width: 12rem"><span>${savedContribution.course}</span></div>
            <button type="button" class="closeNote" id="delete-contribution" data-id="${savedContribution.id}" style="align-self: end; background-color: #121f3d; border-radius: 0.4rem; border: 0; height: 1.6rem; width: 1.6rem; cursor: pointer; opacity: 0;">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" class="svg-inline--fa fa-xmark " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-id="${savedContribution.id}"><path data-id="${savedContribution.id}" fill="#33b1ff" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path></svg></button>
          </div></a>`);

        contribution.children[0].children[3].onclick = deleteContribution;

        classItemsContributions.appendChild(contribution);
        platziListContributions.insertAdjacentElement("beforeend", classItemsContributions);
        studentHomeWrapperContributions.insertBefore(platziListContributions, learningPathsListContributions);
      });
    });
  };

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadPlatziHighlights();
    }, 2000);
  });
}
