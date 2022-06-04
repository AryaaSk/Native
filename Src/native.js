"use strict";
let TAB_BAR_CONFIG = [];
const InitTabBar = () => {
    const tabBar = document.getElementsByClassName("tab-bar")[0];
    for (const item of TAB_BAR_CONFIG) {
        const element = document.createElement("div");
        element.className = "item";
        element.innerHTML = `
        <img src="${item.iconSrc}" alt="Icon">
        <label>${item.title}</label>
        `;
        tabBar.append(element);
        element.onclick = () => { location.href = item.path; };
    }
};
