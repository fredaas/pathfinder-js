import Pathfinder from './pathfinder';
import Graph from './graph.js';
import { manhattan, euclidean, chebyshev } from './heuristics.js';

export default class AStar extends Pathfinder {

    constructor(canvas) {
        super(canvas);
    }

    extract() {
        var u = this.open[0];

        this.open.forEach((v) => {
            if (v.f < u.f) {
                u = v;
            }
        });

        var index = this.open.indexOf(u);

        return this.open.splice(index, 1)[0];
    }

    relax(u, v) {
        if (u.g + v.w < v.g) {
            v.g = u.g + v.w;
            v.f = v.g + v.h;
            v.parent = u;

            return true;
        }

        return false;
    }

    expand(u) {
        var neighbors = Graph.getNeighbors(u);

        for (var i = 0; i < neighbors.length; i++) {
            var v = neighbors[i];

            if (v.w == -1 || this.contains(this.closed, v)) {
                continue;
            }

            if (v.type == 'source' || v.type == 'sink') {
                continue;
            }

            var relaxed = this.relax(u, v);

            if (!relaxed) {
                continue;
            }

            if (this.contains(this.open, v)) {
                continue;
            }

            this.canvas.setColor(v.row, v.col, '#ffb75f');
            this.open.push(v);
        }
    }

    start() {
        this.initSingleSource();

        Graph.setHeuristic(this.sink, euclidean);

        var source = this.extract();
        this.expand(source);
        this.closed.push(source)

        var id = setInterval(() => {
            if (this.open.length != 0) {
                var u = this.extract();
                this.closed.push(u)
                this.canvas.setColor(u.row, u.col, '#a7ceff');
                this.expand(u);
            } else {
                clearInterval(id);
            }
        }, 0);
    }

}
