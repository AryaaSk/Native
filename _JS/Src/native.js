"use strict";
//This is called in the html file with a defer tag
//Goes and replaces all the custom elements with the actual HTML elements, after all the other script tags
//There are _ main elements: NavigationBar, TabBar, TableView, CollectionView, Button, Label, Textfield, and View (all other elements)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let NATIVE_DOCUMENT;
const ParseNativeHTML = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("/Src/native.html");
    const html = yield response.text();
    const parser = new DOMParser();
    return parser.parseFromString(html, 'text/html');
});
const GetElements = (tagName) => {
    return document.getElementsByTagName(tagName);
};
const ModifyLabel = (id, text) => {
    NATIVE_DOCUMENT.getElementById(id).innerText = text;
};
const GetData = (element, keys) => {
    const dataset = element.dataset;
    const data = [];
    for (const key of keys) {
        data.push(dataset[key]);
    }
    return data;
};
const FormatNavigationBars = () => {
    const navBars = GetElements("navigation-bar");
    for (const navBar of navBars) {
        const [title] = GetData(navBar, ["title"]);
        //format the navBarElement
        ModifyLabel("navigation-bar-title", title);
        const navBarElement = NATIVE_DOCUMENT.getElementById("navigation-bar");
        navBar.outerHTML = navBarElement.outerHTML; //now just replace this navBar with the navigation-bar template from our native.html file
    }
};
const FormatTabBars = () => {
    const tabBars = GetElements("tab-bar");
    for (const tabBar of tabBars) {
        const [pathsJSON] = GetData(tabBar, ["paths"]);
        const paths = JSON.parse(pathsJSON);
        //generate the path elements
        const pathElements = [];
        for (const path of paths) {
            ModifyLabel("tab-bar-path-title", path.title);
            NATIVE_DOCUMENT.getElementById("tab-bar-path-icon").src = path.iconSrc;
            const element = NATIVE_DOCUMENT.getElementById("tab-bar-path");
            pathElements.push(element);
        }
        console.log(pathElements);
    }
};
const MAIN = () => __awaiter(void 0, void 0, void 0, function* () {
    NATIVE_DOCUMENT = yield ParseNativeHTML();
    FormatNavigationBars();
    FormatTabBars();
});
MAIN();
