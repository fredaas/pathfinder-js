import Canvas from './canvas.js'
import Graph from './graph.js'

var _canvas;
var _open;
var _closed;
var _source;
var _sink;

export default class Pathfinder {

    constructor(canvas) {
        _canvas = canvas;
        _open = [];
        _closed = [];
        this.start();
    }

    extract() {
        var u = _open[0];

        _open.forEach((v) => {
            if (v.f < u.f) {
                u = v;
            }
        })

        var index = _open.indexOf(u);

        return _open.splice(index, index + 1)[0];
    }

    relax(u, v) {
        if (u.g + v.w < v.g) {
            v.g = u.g + v.w;
            v.f = v.g + v.h;
            v.parent = u;
        }
    }

    contains(list, u) {
        return list.indexOf(u) != -1;
    }

    expand(u) {
        var neighbors = Graph.getNeighbors(u);

        for (var i = 0; i < neighbors.length; i++) {
            var v = neighbors[i];

            if (v.w == -1 || this.contains(_closed, v)) {
                continue;
            }

            if (!this.contains(_open, v)) {
                _open.push(v);
                _canvas.setColor(v.row, v.col, '#ffb75f');
            }

            this.relax(u, v);
        }
    }

    start() {
        _source = Graph.getTypeNode('source');
        _sink = Graph.getTypeNode('sink');
        _source.g = 0;
        _open.push(_source);

        Graph.setHeuristic(_sink);

        setInterval(() => {
            if (_open.length != 0) {
                var u = this.extract();
                _closed.push(u)
                _canvas.setColor(u.row, u.col, '#a7ceff');
                this.expand(u);
            }
        }, 0);
    }

}
