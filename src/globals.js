var canvas = document.createElement("canvas");
var c2d = canvas.getContext("2d");

document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var color = {
    source: '#ff644a',
    sink:   '#65e363',
    block:  '#676767',
    clear:  '#ffffff',
    stroke: '#bcbcbc'
};

var inf = 1000000;

document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
});

export { canvas, c2d, color, inf }
