(function () {
  gBrowser.tabContainer.addEventListener("dblclick", function (event) {
    if (event.target.localName !== "tab" && event.button !== 0) {
      return;
    }
    const tab = document.evaluate(
      'ancestor-or-self::*[local-name()="tab"]',
      event.originalTarget,
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
})();
