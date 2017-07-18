import Graph from './graph.js'
import { canvas, c2d, color } from './globals.js'

export default class Canvas {

    constructor() {
        this.size = Math.pow(2, 5);
        this.cols = Math.floor(canvas.width / this.size);
        this.rows = Math.floor(canvas.height / this.size);

        // Set x and y offsets to center the tiles as a group on the canvas.
        this.xOffset = (canvas.width - this.cols * this.size) / 2;
        this.yOffset = (canvas.height - this.rows * this.size) / 2;

        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.setColor(i, j, color.clear);
            }
        }

        Graph.init(this.rows, this.cols);

        this.initPair();

        document.addEventListener('mousemove', (e) => {
            var pos = this.getPos(e.x, e.y);
            var node = Graph.getNode(pos.row, pos.col);
            var selected = Graph.getSavedNode();

            if (node.type == 'source' || node.type == 'sink') {
                return;
            }

            if (selected != null && node.w == 1) {
                return;
            }

            if (selected != null) {
                node.type = selected.type;
                selected.type = null;
                this.setColor(selected.row, selected.col, color.clear);
                this.setColor(node.row, node.col, color[node.type]);
                Graph.setSavedNode(node);

                return;
            }

            switch (e.which) {
                case 1:
                    node.w = 1;
                    this.setColor(node.row, node.col, color.block);
                    break;
                case 3:
                    node.w = 0;
                    this.setColor(node.row, node.col, color.clear);
            }
        });

        document.addEventListener('mousedown', (e) => {
            var pos = this.getPos(e.x, e.y);
            var node = Graph.getNode(pos.row, pos.col);

            if (node.type == 'source' || node.type == 'sink') {
                Graph.setSavedNode(node);

                return;
            }

            switch (e.which) {
                case 1:
                    node.w = 1;
                    this.setColor(node.row, node.col, color.block);
                    break;
                case 3:
                    node.w = 0;
                    this.setColor(node.row, node.col, color.clear);
            }
        });

        document.addEventListener('mouseup', (e) => {
            Graph.setSavedNode(null);
        });
    }

    initPair() {
        var centerRow = Math.floor(this.rows / 2);
        var centerCol = Math.floor(this.cols / 2);

        this.setColor(centerRow, centerCol - 1, color.source);
        this.setColor(centerRow, centerCol + 1, color.sink);

        Graph.getNode(centerRow, centerCol - 1).type = 'source';
        Graph.getNode(centerRow, centerCol + 1).type = 'sink';
    }

    getPos(x, y) {
        var row = Math.floor((y - this.yOffset) / this.size);
        var col = Math.floor((x - this.xOffset) / this.size);

        if (row < 0) {
            row = 0;
        }

        if (col < 0) {
            col = 0;
        }

        if (row > this.rows - 1) {
            row = this.rows - 1;
        }

        if (col > this.cols - 1) {
            col = this.cols - 1;
        }

        return { row, col };
    }

    setStroke(row, col) {
        c2d.beginPath();
        c2d.strokeRect(this.xOffset + this.size * col,
                    this.yOffset + this.size * row, this.size, this.size);
    }

    setFill(row, col) {
        c2d.beginPath();
        c2d.fillRect(this.xOffset + this.size * col,
            this.yOffset + this.size * row, this.size, this.size);
    }

    setColor(row, col, hex) {
        c2d.fillStyle = hex;
        this.setFill(row, col);
        c2d.strokeStyle = color.stroke;
        this.setStroke(row, col);
    }

}
