import Graph from './graph.js';

export default class Pathfinder {

    constructor(canvas) {
        this.canvas = canvas;
        this.open = [];
        this.closed = [];
        this.source = null;
        this.sink = null;
    }

    initSingleSource() {
        this.source = Graph.getTypeNode('source');
        this.sink = Graph.getTypeNode('sink');
        this.source.g = 0;
        this.open.push(this.source);
    }

    contains(list, u) {
        return list.indexOf(u) != -1;
    }

}
