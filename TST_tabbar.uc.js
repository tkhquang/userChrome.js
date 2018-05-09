//Auto hide tab bar only when Tree Style Tab sidebar is selected and visible.

(function() {
    var tabbar = document.getElementById("TabsToolbar");
    function showHideTabbar() {
        var sidebarBox = document.getElementById("sidebar-box");
        var sidebarTST = sidebarBox.getAttribute("sidebarcommand");
        if (!sidebarBox.hidden && sidebarTST === "treestyletab_piro_sakura_ne_jp-sidebar-action") {
            tabbar.style.visibility = "collapse";
        }
        else tabbar.style.visibility = "visible";
    }
    var observer = new MutationObserver(showHideTabbar);
    observer.observe(document.getElementById("sidebar-box"), { attributes: true, attributeFilter: ["sidebarcommand", "hidden"] });
})();
