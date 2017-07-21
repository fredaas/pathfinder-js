import Pathfinder from './pathfinder.js'
import Canvas from './canvas.js'

(() => {

    var canvas = new Canvas();

    document.addEventListener('keydown', function(event) {
        if (event.key == 's') {
            new Pathfinder(canvas);
        }
    });

})();
