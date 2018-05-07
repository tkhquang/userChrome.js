//Create a new custom toolbaritem, that has titlebar text displayed on it.

(function() {
    if(location != 'chrome://browser/content/browser.xul') return;
    try {
        CustomizableUI.createWidget({
            id: 'pagetitle-bar',
            type: 'custom',
            defaultArea: CustomizableUI.AREA_NAVBAR,
            onBuild: function(aDocument) {
                var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbaritem');
                var props = {
                    id: 'pagetitle-bar',
                    class: 'chromeclass-toolbar-additional',
                    titlepage: document.getElementById('main-window').getAttribute('title'),
                    //flex: '1',
                    pack: 'center', //remove this line if you dont want the text to be centered by default
                    align: 'center'
                };
                for (var p in props) {
                    toolbaritem.setAttribute(p, props[p]);
                }
                return toolbaritem;
            }
        });
    } catch(e) {}

    function setPageTitle() {
        var pageTitle = document.getElementById('main-window').getAttribute('title');
        //remove the - Mozilla Firefox at the end of the title, delete the below line if you don't want it
        pageTitle = pageTitle.replace(/ - Mozilla Firefox$/, "");
        //remove the - Mozilla Firefox (Private Browsing) in the title, delete the below line if you don't want it
        pageTitle = pageTitle.replace(" - Mozilla Firefox (Private Browsing)", "");
        document.getElementById('pagetitle-bar').setAttribute('titlepage', pageTitle);
    }
    var observer = new MutationObserver(setPageTitle);
    observer.observe(document.getElementById('main-window'), { attributes: true, attributeFilter: ["title"] });

    Cu.import('resource://gre/modules/Services.jsm');
    var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
    var css = '';
    css += '@-moz-document url("chrome://browser/content/browser.xul") {';
    css += '#pagetitle-bar {';
    css += '  -moz-window-dragging: drag;'; //Remove this line if you dont want it to be dragable
    css += '  width: 250px;'; //Change this value if you want shorter/longer bar
    css += '  margin-bottom: 2px;'; //Change this value if you find the text appears too low or too high
    css += '  overflow: hidden;';
    css += '  text-overflow: "..";';
    css += '  white-space: nowrap;';
    css += '}';
    css += '#pagetitle-bar::after {';
    css += '  content: attr(titlepage);';
    css += '  margin-left: 10px;';
    css += '  margin-right: 10px;';
    css += '}';
    var cssEnc = encodeURIComponent(css);
    var newURIParam = {
        aURL: 'data:text/css,' + cssEnc,
        aOriginCharset: null,
        aBaseURI: null
    };
    var cssUri = Services.io.newURI(newURIParam.aURL, newURIParam.aOriginCharset, newURIParam.aBaseURI);
    sss.loadAndRegisterSheet(cssUri, sss.AUTHOR_SHEET);
})();
