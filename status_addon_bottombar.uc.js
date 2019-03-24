//Original code is from
//https://github.com/Endor8/userChrome.js/blob/master/Firefox-57/RevertAddonBarStatusBar.uc.js
//All credit goes to Endor8

(function() {
    if (location != "chrome://browser/content/browser.xul") {
        return;
    }

    const toolbar = document.createElement("toolbar");
    const props = {
        customizable: true,
        mode: "icons",
        context: "toolbar-context-menu"
    };
    toolbar.id = "bottom-toolbar";
    Object.entries(props).forEach(
        ([key, value]) => toolbar.setAttribute(key, value)
    );

    const vbox = document.createElement("vbox");
    vbox.id = "bottom-toolbar-vbox";
    const browserBottombox = document.getElementById("browser-bottombox");
    browserBottombox.parentNode.insertBefore(vbox, browserBottombox);
    vbox.appendChild(toolbar);
    CustomizableUI.registerArea("bottom-toolbar", {
        legacy: true
    });
    CustomizableUI.registerToolbarNode(toolbar);
    const css = `
:root {
--bottom-toolbar-text-color: 220, 220, 220; /* Color in decimal RGB */
--bottom-toolbar-background-color: 0, 0, 0; /* Color in decimal RGB */
--button-padding: 2px; /* increase this value for bigger icon space, note that the toolbar height increases as well */
--button-space-vertial: 1px; /* margin top, bottom of the buttons*/
--button-space-horizontal: 5px; /* margin left, right of the buttons*/
}

#bottom-toolbar-vbox {
background-color: rgb(var(--bottom-toolbar-background-color));
height: auto;
display: inline-flex;
align-items: center;
justify-content: flex-end;
}

#bottom-toolbar {
-moz-appearance: toolbar;
flex: 0 0 auto;
position: relative;
display: inline-flex;
height: auto;
width: 100%;
min-height: 100%;
align-items: center;
justify-content: flex-end;
}

#bottom-toolbar toolbarbutton {
-moz-appearance: toolbarbutton !important;
--toolbarbutton-inner-padding: var(--button-padding) !important;
--toolbarbutton-outer-padding: 0px !important;
margin: var(--button-space-vertial) var(--button-space-horizontal) !important;
flex: 0 0 auto;
}

#bottom-toolbar toolbarbutton:hover {
--toolbarbutton-hover-background: rgba(var(--bottom-toolbar-text-color), 0.2) !important;
--toolbarbutton-active-background: rgba(var(--bottom-toolbar-text-color), 0.4) !important;
}

#main-window[inFullscreen="true"] #bottom-toolbar-vbox {
display: none;
}

/* If you can harly see the icon due to its color,
try this *//*
#bottom-toolbar toolbarbutton {
filter: invert(65%) !important;
}
/*---*/

#statuspanel #statuspanel-label,
statuspanel .statuspanel-label {
-moz-appearance: none !important;
background-color: rgba(var(--bottom-toolbar-background-color), 0.8) !important;
color: rgb(var(--bottom-toolbar-text-color)) !important;
border: 1px solid rgba(var(--bottom-toolbar-text-color), 0.3) !important;
}

#main-window[sizemode="maximized"] .browserContainer > #statuspanel,
#main-window[sizemode="maximized"] .browserContainer > statuspanel {
left: 0.4em !important;
bottom: calc( (var(--button-padding) + var(--button-space-vertial)) * 2 / 3 ) !important; /* Set this manually in case the text fails to align center the bar*/
max-width: 50% !important; /* This is the max length of the status text on the toolbar */
}

#main-window[sizemode="maximized"] #statuspanel #statuspanel-label,
#main-window[sizemode="maximized"] statuspanel .statuspanel-label {
background: transparent !important;
border: none !important;
}

#statuspanel[inactive],
statuspanel[inactive] {
opacity: 1 !important;
}

#main-window[sizemode="maximized"] #statuspanel[inactive] #statuspanel-inner::before,
#main-window[sizemode="maximized"] statuspanel[inactive] .statuspanel-inner::before {
content: "Done";
margin-left: 0.3em;
background-color: transparent;
color: rgb(var(--bottom-toolbar-text-color));
}

#statuspanel[inactive] #statuspanel-label,
statuspanel[inactive] .statuspanel-label {
opacity: 0 !important;
}

#main-window[inFullscreen="true"] #statuspanel,
#main-window[inFullscreen="true"] statuspanel {
display:none !important;
}
`;

    const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    const uri = makeURI("data:text/css;charset=UTF=8," + encodeURIComponent(css));
    sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
}());
