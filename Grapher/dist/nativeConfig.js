"use strict";
const appearance = localStorage.getItem("appearance");
if (appearance == null || appearance == "light") {
    //do nothing since Native is in light mode by default
}
else {
    LoadDarkMode();
}
TAB_BAR_CONFIG = [
    { iconSrc: "function.svg", title: "Graph", path: "main.html" },
    { iconSrc: "gear.svg", title: "Settings", path: "settings.html" },
];
InitTabBar();
