// Auto hide tab bar only when Tree Style Tab sidebar is selected and visible.

(function () {
  "use strict";

  const tabbar = document.getElementById("TabsToolbar");
  const sidebarBox = document.getElementById("sidebar-box");
  function showHideTabbar() {
    const sidebarCommand = sidebarBox.getAttribute("sidebarcommand");
    tabbar.style.visibility = (
      (!sidebarBox.hidden && sidebarCommand === "treestyletab_piro_sakura_ne_jp-sidebar-action") ? "collapse" : "visible");
  }
  const observer = new MutationObserver(showHideTabbar);
  observer.observe(sidebarBox, {
    attributes: true,
    attributeFilter: [
      "sidebarcommand",
      "hidden"]
  });
}());
