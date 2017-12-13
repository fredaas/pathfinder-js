import { manhattan } from './heuristics.js';
import { inf } from './globals.js';

var _graph;
var _saved;
var _length;
var _numRows;
var _numCols;

export default class Graph {

    static init(numRows, numCols) {
        _numRows = numRows;
        _numCols = numCols;

        _graph = new Array(_numRows);
        for (var i = 0; i < _numRows; i++) {
            _graph[i] = new Array(_numCols);
            for (var j = 0; j < _numCols; j++) {
                _graph[i][j] = { row: i, col: j, w: 1, f: inf, g: inf, h: 0,
                    parent: null
                };
            }
        }
    }

    static getNode(row, col) {
        if (row < 0 || col < 0 || row >= _numRows || col >= _numCols) {
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

        for (var i = 0; i < 9; i++) {
            if (i == 4) {
                continue;
            }
            var dr = Math.floor(i / 3) - 1;
            var dc = (i % 3) - 1;
            var neighbor = this.getNode(node.row + dr, node.col + dc);
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

    static setHeuristic(sink, heuristic) {
        for (var i = 0; i < _numRows; i++) {
            for (var j = 0; j < _numCols; j++) {
                var node = _graph[i][j];
                node.h = heuristic(sink.row - node.row, sink.col - node.col);
            }
        }
    }

}
