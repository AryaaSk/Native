"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let TAB_BAR_CONFIG = [];
const InitTabBar = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentPage = location.href.split("/").pop(); //find the current page which we are on to change the icon's colour
    const tabBar = document.getElementsByClassName("tab-bar")[0];
    for (const item of TAB_BAR_CONFIG) {
        const element = document.createElement("div");
        element.className = "item";
        const fillColour = (item.path.endsWith(currentPage) == true) ? "#0a84ff" : "#878787";
        const svg = yield ChangeSVGFill(item.iconSrc, fillColour);
        element.innerHTML = `
        ${svg}
        <label style="color: ${fillColour}">${item.title}</label>
        `;
        tabBar.append(element);
        element.onclick = () => { location.href = item.path; };
    }
});
const ChangeSVGFill = (src, colourHex) => __awaiter(void 0, void 0, void 0, function* () {
    const hex = colourHex.replace("#", "");
    const response = yield fetch(src);
    const text = yield response.text();
    const lines = text.split("\n");
    let i = 0; //remove code injected by live-server
    while (i != lines.length) {
        if (lines[i] == "<!-- Code injected by live-server -->") {
            while (lines[i] != "</script>") {
                lines.splice(i, 1);
            }
            lines.splice(i, 1); //to remove the "</script>"
        }
        else {
            //find a '#', since it is only used in hex codes, and change the next 6 digits to the colour requested to change fill
            const hastagIndex = lines[i].indexOf("#");
            if (hastagIndex != -1) {
                //convert lines[i] to a list so we can modify substrings
                const svgLineList = [...lines[i]];
                svgLineList[hastagIndex + 1] = hex[0];
                svgLineList[hastagIndex + 2] = hex[1];
                svgLineList[hastagIndex + 3] = hex[2];
                svgLineList[hastagIndex + 4] = hex[3];
                svgLineList[hastagIndex + 5] = hex[4];
                svgLineList[hastagIndex + 6] = hex[5];
                const svgLine = svgLineList.join(""); //merge back into original lines array
                lines[i] = svgLine;
            }
            i += 1;
        }
    }
    const svg = lines.join("\n"); //change the image from <img> to an <svg> element
    return svg;
});
