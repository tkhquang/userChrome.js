gBrowser.tabContainer.addEventListener("dblclick", function(event) {
    if (event.target.localName == "tab" && event.button == 0) {
        // 1.Duplicate tab then move to that new tab directly
        gBrowser.selectedTab = gBrowser.duplicateTab(event.target);

        // 2.Duplicate tab and load it in background
        //var dupTab = gBrowser.duplicateTab(event.target);
        //gBrowser.reloadTab(dupTab);
    }
});
