import AStar from './astar';
import Canvas from './canvas.js';

(() => {
    var canvas = new Canvas();

    document.addEventListener('keydown', function(event) {
        if (event.key == 's') {
            (new AStar(canvas)).start();
        }
    });

})();
