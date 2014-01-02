///<reference path="BrickType.ts"/>
///<reference path="Coordinate.ts"/>
///<reference path="BrickState.ts"/>
var Brick = (function () {
    function Brick(x, y) {
        this.type = 0 /* Unknown */;
        this.state = 0 /* Unknown */;
        this.adjacentBricks = new Array();

        if (x != undefined && y != undefined) {
            this.coordinate = {
                x: x,
                y: y
            };
        }
    }
    return Brick;
})();
