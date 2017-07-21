import { manhattan } from './heuristics.js';

var _graph;
var _saved;
var _length;
var _delta;
var _numRows;
var _numCols;

export default class Graph {

    static init(numRows, numCols) {
        _numRows = numRows;
        _numCols = numCols;
        _delta = [ -1, -1, -1, 0, -1, 1, 0, -1, 0, 1, 1, -1, 1, 0, 1, 1 ];

        _graph = new Array(_numRows);
        for (var i = 0; i < _numRows; i++) {
            _graph[i] = new Array(_numCols);
            for (var j = 0; j < _numCols; j++) {
                _graph[i][j] = { row: i, col: j, w: 1, f: 0, g: 100,
                    h: 0, parent: null, type: null };
            }
        }
    }

    static getNode(row, col) {
        if (row < 0 || col < 0 || row > _numRows - 1 || col > _numCols - 1) {
            return null;
        }

        return _graph[row][col];
    }

    static getTypeNode(type) {
        for (var i = 0; i < _numRows; i++) {
            for (var j = 0; j < _numCols; j++) {
                if (_graph[i][j].type == type) {
                    return _graph[i][j];
                }
            }
        }

        return null;
    }

    static getNeighbors(node) {
        var neighbors = [];

        for (var i = 0, j = 1; j < _delta.length; i += 2, j += 2) {
            var neighbor = this.getNode(node.row + _delta[i],
                node.col + _delta[j]);
            if (neighbor != null) {
                neighbors.push(neighbor);
            }
        }

        return neighbors;
    }

    static getSavedNode() {
        return _saved;
    }

    static setSavedNode(node) {
        _saved = node;
    }

    static setHeuristic(sink) {
        for (var i = 0; i < _numRows; i++) {
            for (var j = 0; j < _numCols; j++) {
                var node = _graph[i][j];
                node.h = manhattan(sink.row - node.row, sink.col - node.col);
            }
        }
    }

}
