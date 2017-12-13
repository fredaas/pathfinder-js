import Graph from './graph.js'
import { canvas, c2d, color } from './globals.js'

var _nodeSize;
var _numCols;
var _numRows;
var _offsetCol;
var _offsetRow;

export default class Canvas {

    constructor() {
        _nodeSize = Math.pow(2, 5);
        _numRows = Math.floor(canvas.height / _nodeSize);
        _numCols = Math.floor(canvas.width / _nodeSize);
        _offsetRow = (canvas.height - _numRows * _nodeSize) / 2;
        _offsetCol = (canvas.width - _numCols * _nodeSize) / 2;

        for (var i = 0; i < _numRows; i++) {
            for (var j = 0; j < _numCols; j++) {
                this.setColor(i, j, color.clear);
            }
        }

        Graph.init(_numRows, _numCols);

        this.initPair();

        document.addEventListener('mousemove', (e) => {
            var pos = this.getPos(e.x, e.y);
            var node = Graph.getNode(pos.row, pos.col);
            var selected = Graph.getSavedNode();

            if (node == null) {
                return;
            }

            if (node.type == 'source' || node.type == 'sink') {
                return;
            }

            if (selected != null && node.w == -1) {
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

            switch (e.buttons) {
                case 1:
                    node.w = -1;
                    this.setColor(node.row, node.col, color.block);
                    break;
                case 2:
                    node.w = 1;
                    this.setColor(node.row, node.col, color.clear);
            }
        });

        document.addEventListener('mousedown', (e) => {
            var pos = this.getPos(e.x, e.y);
            var node = Graph.getNode(pos.row, pos.col);

            if (node == null) {
                return;
            }

            if (node.type == 'source' || node.type == 'sink') {
                Graph.setSavedNode(node);

                return;
            }

            switch (e.buttons) {
                case 1:
                    node.w = -1;
                    this.setColor(node.row, node.col, color.block);
                    break;
                case 2:
                    node.w = 1;
                    this.setColor(node.row, node.col, color.clear);
            }
        });

        document.addEventListener('mouseup', (e) => {
            Graph.setSavedNode(null);
        });
    }

    initPair() {
        var centerRow = Math.floor(_numRows / 2);
        var centerCol = Math.floor(_numCols / 2);

        this.setColor(centerRow, centerCol - 1, color.source);
        this.setColor(centerRow, centerCol + 1, color.sink);

        Graph.getNode(centerRow, centerCol - 1).type = 'source';
        Graph.getNode(centerRow, centerCol + 1).type = 'sink';
    }

    getPos(x, y) {
        var row = Math.floor((y - _offsetRow) / _nodeSize);
        var col = Math.floor((x - _offsetCol) / _nodeSize);

        if (row < 0) {
            row = 0;
        }
        if (col < 0) {
            col = 0;
        }
        if (row >= _numRows) {
            row = _numRows;
        }
        if (col >= _numCols) {
            col = _numCols;
        }

        return { row, col };
    }

    setStroke(row, col) {
        c2d.beginPath();
        c2d.strokeRect(_offsetCol + _nodeSize * col,
            _offsetRow + _nodeSize * row, _nodeSize, _nodeSize);
    }

    setFill(row, col) {
        c2d.beginPath();
        c2d.fillRect(_offsetCol + _nodeSize * col, _offsetRow + _nodeSize * row,
            _nodeSize, _nodeSize);
    }

    setColor(row, col, hex) {
        c2d.fillStyle = hex;
        this.setFill(row, col);
        c2d.strokeStyle = color.stroke;
        this.setStroke(row, col);
    }

}
