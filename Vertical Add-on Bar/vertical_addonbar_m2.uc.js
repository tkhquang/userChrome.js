(function() {
    if (location != "chrome://browser/content/browser.xul") return;

    var toolbar = document.createElement("toolbar");
    toolbar.id = "vertical-toolbar";
    toolbar.setAttribute("customizable", "true");
    toolbar.setAttribute("mode", "icons"); //Acceptable values: "icons", "text", "full"
    toolbar.setAttribute("context", "toolbar-context-menu");
    toolbar.setAttribute("orient", "vertical");
    toolbar.setAttribute("flex", "1");

    var toolbox  = document.createElement("toolbox");
    toolbox.id = "vertical-toolbar-toolbox";

    //Put it on the left side
    var sidebarBox = document.getElementById("sidebar-box");
    sidebarBox.parentNode.insertBefore(toolbox, sidebarBox);

    //Put it to on the right side instead
    //var borderBox = document.getElementById("browser-border-end");
    //borderBox.parentNode.insertBefore(toolbox, borderBox.nextSibling);

    toolbox.appendChild(toolbar);
    CustomizableUI.registerArea("vertical-toolbar", { legacy: true });

    var css =`
:root {
--vertical-toolbar-space: 2px;
}
#vertical-toolbar-toolbox scrollbar[orient="vertical"] {
display: none!important;
}
#vertical-toolbar toolbarbutton {
-moz-appearance: toolbarbutton;
margin: var(--vertical-toolbar-space) 0 !important;
}
#vertical-toolbar {
margin-top: var(--vertical-toolbar-space) !important;
}
#vertical-toolbar-toolbox {
background-color: var(--toolbar-bgcolor);
overflow: scroll!important;
}`;
    var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
    var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));
    sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
})();
