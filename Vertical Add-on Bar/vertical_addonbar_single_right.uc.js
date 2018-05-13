//vertical_addonbar.uc.js
//Right + Single column only
(function() {
    if (location != "chrome://browser/content/browser.xul") return;

    var toolbar = document.createElement("toolbar");
    toolbar.id = "vertical-toolbar";
    toolbar.setAttribute("customizable", "true");
    toolbar.setAttribute("mode", "icons");
    toolbar.setAttribute("context", "toolbar-context-menu");

    var toolbox = document.createElement("toolbox");
    toolbox.id = "vertical-toolbar-toolbox";
    var navToolBox = document.getElementById("navigator-toolbox");
    navToolBox.parentNode.insertBefore(toolbox, navToolBox.nextSibling);
    toolbox.appendChild(toolbar);
    CustomizableUI.registerArea("vertical-toolbar", {
        legacy: true
    });

    var css = `
:root {
--vertical-toolbar-width: 34px;
/* Change the below to the color you need,
you can find a color picker to hex code in this link:
https://www.w3schools.com/colors/colors_picker.asp */
--vertical-toolbar-color: #202020;
--vertical-toolbar-space-height: 10px;
--vertical-toolbar-icon-max-width: 24px; /* Should always be smaller than the toolbar width */
}

/* If you harly see the icon,
due to its color matchs the toolbar color, try this *//*
#vertical-toolbar toolbarbutton {
filter: invert(65%) !important;
}
/*---*/

#content-deck {
border-right: var(--vertical-toolbar-width) solid var(--vertical-toolbar-color) !important;
}
#main-window[inFullscreen="true"] #content-deck {
border-right: 0 !important;
}
#main-window[inFullscreen="true"] #vertical-toolbar-toolbox {
visibility: collapse !important;
}
#vertical-toolbar-toolbox  {
direction: rtl !important;
position: fixed !important;
right: var(--vertical-toolbar-width) !important;
height: var(--vertical-toolbar-width)!important;
transform-origin: top right !important;
transform: rotate(-90deg) !important;
background-color: var(--vertical-toolbar-color) !important;
}
#vertical-toolbar {
-moz-appearance: toolbar!important;
display: inline-flex;
padding-inline-start: var(--vertical-toolbar-space-height);
height: var(--vertical-toolbar-width) !important;
}
#vertical-toolbar toolbarbutton {
-moz-appearance: toolbarbutton!important;
/* When have problems with icons on hover,
try another value, or disable this */
--toolbarbutton-inner-padding: 2px !important;
/*---*/
transform: rotate(90deg) !important;
transform-origin: 50% 50% !important;
width: var(--vertical-toolbar-width) !important;
margin-left: var(--vertical-toolbar-space-height) !important;
}
#vertical-toolbar toolbarbutton .toolbarbutton-icon {
width: var(--vertical-toolbar-icon-max-width) !important;
height: var(--vertical-toolbar-icon-max-width) !important;
background-color: transparent !important;
}
/* This transforms flexiple spaces to seperators
when put into the vertical bar, but I don't recommend this,
since that means you can't use flexiple spaces on ver bar anymore
FYI, you can create seperators quite easily:
http://forums.mozillazine.org/viewtopic.php?f=38&t=3037911 *//*
#vertical-toolbar toolbarspring {
background: transparent !important;
max-width: 0px !important;
min-width: 0px !important;
width: 0px !important;
border-left: 1px solid white !important;
border-right: 1px solid black !important;
margin-top: 4px !important;
margin-bottom: 4px !important;
margin-left: 3px !important;
margin-right: 3px !important;
}
/* This edit the width of the flexiple spaces when put into vertical bar,
choose between this and the above one,
or nothing at all */
#vertical-toolbar toolbarspring {
background: transparent !important;
width: 20px !important;
}

#vertical-toolbar-toolbox {
overflow: scroll!important;
}

#vertical-toolbar-toolbox scrollbar {
display: none!important;
}`;
    var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
    var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));
    sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);

    var contentDeck = document.getElementById("content-deck");

    toolbox.addEventListener("DOMMouseScroll", function(e) {
        var delta = Math.max(-1, Math.min(1, e.detail));
        toolbox.scrollLeft -= (delta*20); //Change this value if you find the vertical scrolling is too fast or too slow
        if (toolbox.style.width != contentDeck.clientHeight + "px") {
            toolbox.style.width = contentDeck.clientHeight + "px";
        }
        e.preventDefault();
    }, false);

    window.addEventListener("resize", function() {
        toolbox.style.width = contentDeck.clientHeight + "px";
    });

})();
