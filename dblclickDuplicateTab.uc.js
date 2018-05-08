(function() {
    gBrowser.tabContainer.addEventListener("dblclick", function(event) {
        if (event.target.localName != "tab" && event.button != 0) {
            return;
        }
        //Duplicate tab then move to that new tab directly
        gBrowser.selectedTab = gBrowser.duplicateTab(event.target);

        //Duplicate tab and load it in background
        //gBrowser.duplicateTab(event.target).reload();
    });
})();
