(function () {
  const initilize = () => {
    try {
      gBrowser.tabContainer.addEventListener("dblclick", function ({
        target: { localName },
        button,
        originalTarget,
      }) {

        if (localName !== "tab" && button !== 0) {
          return;
        }

        const tab = document.evaluate(
          'ancestor-or-self::*[local-name()="tab"]',
          originalTarget,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        if (!tab) {
          return;
        }

        // Duplicate tab then move to that new tab directly
        gBrowser.selectedTab = gBrowser.duplicateTab(tab);

        // Duplicate tab and load it in background
        // gBrowser.duplicateTab(tab);
      });
    } catch (e) {}
  };

  setTimeout(() => {
    initilize();
  }, 500);
})();
