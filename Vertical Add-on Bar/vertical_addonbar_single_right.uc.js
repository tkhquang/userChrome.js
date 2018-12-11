//vertical_addonbar.uc.js
//Right + Single column only

(function () {
    if (location != "chrome://browser/content/browser.xul") {
        return;
    }

    const toolbar = document.createElement("toolbar");
    toolbar.id = "vertical-toolbar";
    const props = {
        customizable: true,
        mode: "icons",
        context: "toolbar-context-menu"
    };
    toolbar.id = "vertical-toolbar";
    Object.entries(props).forEach(
        ([key, value]) => toolbar.setAttribute(key, value)
    );

    const toolbox = document.createElement("toolbox");
    toolbox.id = "vertical-toolbar-toolbox";
    const navToolBox = document.getElementById("navigator-toolbox");
    navToolBox.parentNode.insertBefore(toolbox, navToolBox.nextSibling);
    toolbox.appendChild(toolbar);
    CustomizableUI.registerArea("vertical-toolbar", {
        legacy: true
    });

    const css = `
/* Change the below to the color you need,
you can find a color picker to hex code in this link:
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool */

:root {
--vertical-toolbar-width: 24px; /* REAL WIDTH = the below space width x2 + this value*/
--vertical-toolbar-space-width: 5px;
--vertical-toolbar-space-height: 10px; /* Vertical space between the buttons */
--vertical-toolbar-button-padding: 5px; /* Must be lower than space width x2 */
--vertical-toolbar-color: rgb(32, 32, 32);
--vertical-toolbar-hover-color: rgba(122, 122, 122, 0.5);
--vertical-toolbar-active-color: rgba(222, 122, 122, 0.5);
--vertical-toolbar-active-hover-color: rgba(155, 122, 122, 0.5);
}

/* If you harly see the icon,
due to its color matchs the toolbar color, try this *//*
#vertical-toolbar toolbarbutton {
filter: invert(65%) !important;
}
/*---*/

#content-deck {
border-right: calc(var(--vertical-toolbar-space-width) * 2 + var(--vertical-toolbar-width)) solid var(--vertical-toolbar-color) !important;
}

#main-window[inFullscreen="true"] #content-deck {
border-right: 0 !important;
}

#main-window[inFullscreen="true"] #vertical-toolbar-toolbox {
visibility: collapse !important;
}

#vertical-toolbar-toolbox {
direction: rtl;
position: fixed;
right: calc(var(--vertical-toolbar-space-width) * 2 + var(--vertical-toolbar-width));
height: calc(var(--vertical-toolbar-space-width) * 2 + var(--vertical-toolbar-width));
transform-origin: top right;
transform: rotate(-90deg);
background-color: var(--vertical-toolbar-color);
display: inline-flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
}

#vertical-toolbar {
position: relative;
-moz-appearance: toolbar !important;
display: inline-flex;
height: var(--vertical-toolbar-width);
width: 100%;
flex-direction: row;
justify-content: flex-start;
align-items: center;
flex: 0 0 auto;
}

#vertical-toolbar toolbarbutton {
-moz-appearance: toolbarbutton !important;
--toolbarbutton-inner-padding: var(--vertical-toolbar-button-padding) !important;
--toolbarbutton-outer-padding: 0px !important;
--toolbarbutton-hover-background: var(--vertical-toolbar-hover-color) !important;
--toolbarbutton-active-background: var(--vertical-toolbar-active-color) !important;
transform: rotate(90deg);
transform-origin: 50% 50%;
flex: 0 0 auto;
margin: 0 var(--vertical-toolbar-space-height) !important;
}

#vertical-toolbar toolbarbutton:hover {
--toolbarbutton-active-background: var(--vertical-toolbar-active-hover-color) !important;
}

#vertical-toolbar-toolbox {
overflow-x: scroll;
overflow-y: hidden;
}

#vertical-toolbar-toolbox scrollbar {
display: none !important;
}`;
    const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    const uri = makeURI("data:text/css;charset=UTF=8," + encodeURIComponent(css));
    sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);

    function scrollAlter() {
        "use strict";

        const contentDeck = document.getElementById("content-deck");

        toolbox.addEventListener("DOMMouseScroll", function (e) {
            const delta = Math.max(-1, Math.min(1, -e.detail));
            toolbox.scrollLeft += (delta * 40); //Change this value if you find the vertical scrolling is too fast or too slow
            if (toolbox.style.width != contentDeck.clientHeight + "px") {
                toolbox.style.width = contentDeck.clientHeight + "px";
            }
            e.preventDefault();
        }, false);

        window.addEventListener("resize", function () {
            toolbox.style.width = contentDeck.clientHeight + "px";
        });
    }

    scrollAlter();

})();
