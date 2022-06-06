"use strict";
let SCALE = 1;
let X_OFFSET = 0;
let Y_OFFSET = 0;
let X_INTERPOLATION_STEP = 1;
const DrawAxis = () => {
    const axisLength = 5000;
    clearCanvas();
    drawLine([(-axisLength + X_OFFSET) * SCALE, (0 + Y_OFFSET) * SCALE], [(axisLength + X_OFFSET) * SCALE, (0 + Y_OFFSET) * SCALE], "rgb(135, 135, 135)"); //x-axis
    drawLine([(0 + X_OFFSET) * SCALE, (-axisLength + Y_OFFSET) * SCALE], [(0 + X_OFFSET) * SCALE, (axisLength + Y_OFFSET) * SCALE], "rgb(135, 135, 135)"); //y-axis
};
function evalSafe(string) {
    return new Function('return ' + string)();
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
const calculateY = (equation, x) => {
    let modifiedEquation = equation.slice(4); //we know that "y = " is always at the start, so we can just remove that
    modifiedEquation = replaceAll(modifiedEquation, "^", "**");
    //check if there is a coefficient before "x"
    const xIndex = modifiedEquation.indexOf("x");
    const xCoefficient = modifiedEquation[xIndex - 1];
    const replaceX = (xCoefficient == undefined || xCoefficient == "") ? `(${String(x)})` : `*(${x})`;
    modifiedEquation = replaceAll(modifiedEquation, "x", replaceX); //now we can replace all the "x" with the x value, and then eval the entire statement
    modifiedEquation = modifiedEquation.replace(/[^-()\d/*+.]/g, ''); //sanitizing to try and protect against eval
    const answer = evalSafe(modifiedEquation);
    return answer;
};
const PlotGraph = () => {
    //since y is the subject, we can basically just interpolate through values of x, and get y as well
    const equation = document.getElementById("equationTextfield").value;
    const points = [];
    for (let x = -canvasWidth / 2; x <= canvasWidth / 2; x += X_INTERPOLATION_STEP) {
        const point = [x + X_OFFSET, calculateY(equation, x) + Y_OFFSET];
        point[0] *= SCALE; //scale point around (0, 0), by scale factor SCALE
        point[1] *= SCALE;
        points.push(point);
    }
    const appearance = localStorage.getItem("appearance");
    const lineColour = (appearance == null || appearance == "light") ? "#000000" : "#ffffff";
    let i = 0;
    while (i != (points.length - 1)) {
        const point1 = points[i];
        const point2 = points[i + 1];
        drawLine(point1, point2, lineColour, 5);
        i += 1;
    }
};
const InitListeners = () => {
    document.getElementById("equationTextfield").oninput = () => {
        const text = document.getElementById("equationTextfield").value;
        if (text.startsWith("y = ") == false) {
            document.getElementById("equationTextfield").value = "y = ";
        }
    };
    document.getElementById("plotGraph").onclick = () => {
        DrawAxis();
        PlotGraph();
    };
    //Graph Transformations
    const graph = document.getElementById("graph");
    let pinching = false;
    let previousScale = 1;
    graph.addEventListener('gesturechange', function ($e) {
        pinching = true;
        const deltaScale = $e.scale - previousScale;
        previousScale = $e.scale;
        SCALE *= 1 + deltaScale;
        if (SCALE >= 100) {
            SCALE = 100;
        }
        else if (SCALE <= 0.1) {
            SCALE = 0.1;
        }
        if (SCALE >= 4) {
            X_INTERPOLATION_STEP = 0.25;
        }
        else if (SCALE >= 2) {
            X_INTERPOLATION_STEP = 0.5;
        }
        else if (SCALE >= 1) {
            X_INTERPOLATION_STEP = 1;
        }
        else {
            X_INTERPOLATION_STEP = 2;
        }
        DrawAxis();
        PlotGraph();
    });
    graph.addEventListener('gestureend', function () {
        previousScale = 1;
        pinching = false;
    });
    let pointerDown = false;
    let previousLocation = [0, 0];
    graph.onpointerup = () => {
        pointerDown = false;
    };
    graph.onpointerdown = ($e) => {
        pointerDown = true;
        previousLocation = [$e.clientX, $e.clientY];
    };
    graph.onpointermove = ($e) => {
        if (pointerDown == false || pinching == true) {
            return;
        }
        const [deltaX, deltaY] = [$e.clientX - previousLocation[0], previousLocation[1] - $e.clientY];
        previousLocation = [$e.clientX, $e.clientY];
        X_OFFSET += deltaX / SCALE;
        Y_OFFSET += deltaY / SCALE;
        DrawAxis();
        PlotGraph();
    };
};
const MAIN = () => {
    linkCanvas("graph");
    DrawAxis();
    document.getElementById("equationTextfield").value = "y = x^2 - 100";
    InitListeners();
    PlotGraph();
};
MAIN();
