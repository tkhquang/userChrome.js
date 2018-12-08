//Auto hide tab bar only when Tab Center Redux sidebar is selected and visible.

(function () {
    "use strict";

    const tabbar = document.getElementById("TabsToolbar");
    function showHideTabbar() {
        const sidebarBox = document.getElementById("sidebar-box");
        const sidebarCommand = sidebarBox.getAttribute("sidebarcommand");
        tabbar.style.visibility = (
            (!sidebarBox.hidden && sidebarCommand === "treestyletab_piro_sakura_ne_jp-sidebar-action") ? "collapse" : "visible");
    }
    const observer = new MutationObserver(showHideTabbar);
    observer.observe(document.getElementById("sidebar-box"), {
        attributes: true,
        attributeFilter: [
            "sidebarcommand",
            "hidden"]
    });
}());
