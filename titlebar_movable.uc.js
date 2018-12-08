//Create a new custom toolbaritem, that has titlebar text displayed on it.
//If you're still not sure what it does check out the below.
//https://imgur.com/sXZrBMb
//https://imgur.com/a/GHvgjzu

(function () {
    if (location != "chrome://browser/content/browser.xul") {
        return;
    }
    try {
        CustomizableUI.createWidget({
            id: "pagetitle-bar",
            type: "custom",
            defaultArea: CustomizableUI.AREA_NAVBAR,
            onBuild: function(aDocument) {
                const toolbaritem = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbaritem");
                const image = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "image");
                image.setAttribute("src", "chrome://branding/content/icon16.png");
                image.id = "pagetitle-bar-image";
                const props = {
                    id: "pagetitle-bar",
                    class: "chromeclass-toolbar-additional",
                    titlepage: document.getElementById("main-window").getAttribute("title"),
                    tooltiptext: document.getElementById("main-window").getAttribute("title"),
                    pack: "center",
                    align: "center",
                    label: "Page Title Bar"
                };
                Object.entries(props).forEach(
                    ([key, value]) => toolbaritem.setAttribute(key, value)
                );
                toolbaritem.appendChild(image);
                return toolbaritem;
            }
        });
    } catch(e) {}

    function setPageTitle () {
        if (document.getElementById("pagetitle-bar") === null) {
            return;
        }
        const pageTitleBar = document.getElementById("pagetitle-bar");

        let pageTitle = document.getElementById("main-window").getAttribute("title");
        //remove the - Mozilla Firefox at the end of the title, delete the below line if you don't want it
        pageTitle = pageTitle.replace(/ - Mozilla Firefox$/, "");
        //remove the - Mozilla Firefox (Private Browsing) in the title, delete the below line if you don't want it
        pageTitle = pageTitle.replace(" - Mozilla Firefox (Private Browsing)", "");
        pageTitleBar.setAttribute("titlepage", pageTitle);
        pageTitleBar.setAttribute("tooltiptext", pageTitle);
    };
    const observer = new MutationObserver(setPageTitle);
    observer.observe(document.getElementById("main-window"), {
        attributes: true,
        attributeFilter: ["title"]
    });

    const css = `

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
-moz-window-dragging: no-drag;
content: attr(titlepage);
}

#main-window:not([customizing]) #pagetitle-bar-image {
display:none;
}

toolbarpaletteitem[place="palette"] > #pagetitle-bar {
width: 7em;
min-width: 7em;
outline: 1px solid;
outline-offset: -8px;
opacity: .6;
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
}`;

    const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    const uri = makeURI("data:text/css;charset=UTF=8," + encodeURIComponent(css));
    sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
}());
