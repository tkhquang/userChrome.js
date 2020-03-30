// Create a new custom toolbaritem, that has titlebar text displayed on it.
// If you're still not sure what it does check out the below.
// https://imgur.com/sXZrBMb
// https://imgur.com/a/GHvgjzu

(function () {

  const initTitle = "Mozilla Firefox";
  try {
    Components.utils.import("resource:///modules/CustomizableUI.jsm");
    const { Services } = Components.utils.import(
      "resource://gre/modules/Services.jsm",
      {}
    );
    const sss = Components.classes[
      "@mozilla.org/content/style-sheet-service;1"
    ].getService(Components.interfaces.nsIStyleSheetService);

    CustomizableUI.createWidget({
      id: "pagetitle-bar",
      type: "custom",
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function (aDocument) {
        const toolbaritem = aDocument.createElementNS(
          "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
          "toolbaritem"
        );
        const image = aDocument.createElementNS(
          "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
          "image"
        );
        image.setAttribute("src", "chrome://branding/content/icon16.png");
        image.id = "pagetitle-bar-image";
        const props = {
          id: "pagetitle-bar",
          class: "chromeclass-toolbar-additional",
          titlepage: initTitle,
          tooltiptext: initTitle,
          pack: "center",
          align: "center",
          label: "Page Title Bar",
        };
        for (var p in props) {
          toolbaritem.setAttribute(p, props[p]);
        }
        toolbaritem.appendChild(image);
        return toolbaritem;
      },
    });

    const styles = `
      /* Movable titlebar */

      :root {
        --pagetitle-bar-width: 350px;
      }

      #main-window:not([customizing]) #pagetitle-bar {
        -moz-window-dragging: drag;
        background: transparent;
        width: var(--pagetitle-bar-width);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0 10px;
      }

      #main-window:not([customizing]) #pagetitle-bar::after {
        content: attr(titlepage);
      }

      #main-window:not([customizing]) #pagetitle-bar-image {
        display:none;
      }

      toolbarpaletteitem[place="palette"] > #pagetitle-bar {
        width: 7em;
        min-width: 7em;
        height: 37px;
      }

      #main-window[customizing] #nav-bar #pagetitle-bar {
        width: var(--pagetitle-bar-width);
        margin: 0 10px;
      }

      #main-window[customizing] #nav-bar #pagetitle-bar-image {
        display:none;
      }

      #main-window[customizing] #nav-bar #pagetitle-bar::after {
        content: "Page Title Bar";
      }
    `;

    const uri = Services.io.newURI(
      "data:text/css;charset=utf-8," + encodeURIComponent(styles),
      null,
      null
    );
    sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
  } catch (e) {
    Components.utils.reportError(e);
  }

  function setPageTitle() {
    const pageTitleBar = document.getElementById("pagetitle-bar");
    if (!pageTitleBar) {
      return;
    }

    let pageTitle = document.title;
    // remove the - Mozilla Firefox *** at the end of the title, comment out the lines below if you don't want it
    const index = pageTitle.lastIndexOf(" - ");
    if (index !== -1) {
      pageTitle = pageTitle.substr(0, index);
    }
    // -End

    pageTitleBar.setAttribute("titlepage", pageTitle);
    pageTitleBar.setAttribute("tooltiptext", pageTitle);
  }

  const targetNode = document.querySelector("head > title");
  const observer = new MutationObserver(setPageTitle);

  /*
    textContent changes the child text node of the target.
    According to MDN: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    We only need to listen to childList changes
  */
  observer.observe(targetNode, {
    attributes: false,
    attributeOldValue: false,
    characterData: false,
    characterDataOldValue: false,
    childList: true,
    subtree: false,
  });
})();
