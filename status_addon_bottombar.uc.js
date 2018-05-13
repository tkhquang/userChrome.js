//Original code is from 
//https://github.com/Endor8/userChrome.js/blob/master/Firefox-57/RevertAddonBarStatusBar.uc.js
//All credit goes to Endor8

(function() {
    if (location != "chrome://browser/content/browser.xul") return;

    var toolbar = document.createElement("toolbar");
    toolbar.id = "bottom-toolbar";
    toolbar.setAttribute("customizable", "true");
    toolbar.setAttribute("mode", "icons");
    toolbar.setAttribute("context", "toolbar-context-menu");

    var vbox = document.createElement("vbox");
    vbox.id = "bottom-toolbar-vbox";
    var browserBottombox = document.getElementById("browser-bottombox");
    browserBottombox.parentNode.insertBefore(vbox, browserBottombox);
    vbox.appendChild(toolbar);
    CustomizableUI.registerArea("bottom-toolbar", {legacy: true});

//STYLING SECTION
//You can put the css tweaks here inside your userChrome.css
//then remove everthing leftof inside the section
    
    var css = `
:root {
--bottom-toolbar-text-color: white;
--bottom-toolbar-background-color: #202020;
--bottom-toolbar-height: 24px; /* The value should be between 22px - 34px if you ever want to change it */
}

#bottom-toolbar-vbox {
background-color: var(--bottom-toolbar-background-color);
}

#bottom-toolbar toolbarbutton {
-moz-appearance: toolbarbutton !important;
--toolbarbutton-inner-padding: 2px !important; /* Try increase this if you ever change the toolbar height 2px - 10px */
margin: 0 2px !important; /* The space between each toolbarbutton */
}

/* If you can harly see the icon due to its color,
try this */
#bottom-toolbar toolbarbutton {
filter: invert(65%) !important;
}
/*---*/

#bottom-toolbar {
-moz-appearance: toolbar !important;
height: var(--bottom-toolbar-height);
/* Makes the buttons auto stick to the right side */
direction: rtl;
/*--*/
}

.browserContainer > statuspanel {
background-color: transparent !important;
left: 5px !important;
bottom: 2px !important; /* Change this if you find the text too high or too low */
border: none !important;
max-width: 50% !important; /* This is the max length of the status text on the toolbar */
transition: none !important;
}

.browserContainer > statuspanel > .statuspanel-inner > .statuspanel-label {
background-color: transparent !important;
margin-left: 0 !important;
border: none !important;
padding: 0 !important;
color: var(--bottom-toolbar-text-color) !important;
}

statuspanel[inactive] {
opacity: 1 !important;
}

statuspanel[inactive] .statuspanel-inner::before {
content: "Done" !important;
background-color:transparent !important;
color: var(--bottom-toolbar-text-color) !important;
}

statuspanel[inactive] .statuspanel-label {
opacity: 0 !important;
}

#main-window[inFullscreen="true"] statuspanel {
display:none !important;
}`;
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var uri = makeURI("data:text/css;charset=UTF=8," + encodeURIComponent(css));
    sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);

//END OF STYLING SECTION

})();
