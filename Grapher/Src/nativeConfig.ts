const appearance = localStorage.getItem("appearance");
if (appearance == null || appearance == "light") {
    //do nothing since Native is in light mode by default
}
else {
    LoadDarkMode();
}

TAB_BAR_CONFIG = [
    { iconSrc: "/Assets/function.svg", title: "Graph", path: "/Src/Main/main.html" },
    { iconSrc: "/Assets/gear.svg", title: "Settings", path: "/Src/Settings/settings.html" },
];
InitTabBar();