const InitListenersSettings = () => {
    document.getElementById("light")!.onclick = () => {
        localStorage.setItem("appearance", "light");
        setTimeout(() => { location.reload(); }, 100); //so user still sees animation
    }
    document.getElementById("dark")!.onclick = () => {
        localStorage.setItem("appearance", "dark");
        setTimeout(() => { location.reload(); }, 100);
    }
}


const MAIN_SETTINGS = () => {
    InitListenersSettings();
}

MAIN_SETTINGS();