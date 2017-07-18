var graph = null;
var saved = null;

export default class Graph {

    static init(rows, cols) {
        graph = new Array(rows);
        for (var i = 0; i < rows; i++) {
            graph[i] = new Array(cols);
            for (var j = 0; j < cols; j++) {
                graph[i][j] = { row: i, col: j, w: 0, f: 0, type: null };
            }
        }
    }

    static getNode(row, col) {
        return graph[row][col];
    }

    static getSavedNode() {
        return saved;
    }

    static setSavedNode(node) {
        saved = node;
    }

}
