var BrickFlipper = (function () {
    function BrickFlipper() {
    }
    BrickFlipper.prototype.flip = function (brick) {
        var _this = this;
        brick.state = 2 /* FacingUp */;
        if (brick.type == 1 /* Normal */) {
            brick.adjacentBricks.forEach(function (neighbour) {
                return _this.flip(neighbour);
            });
        }
    };
    return BrickFlipper;
})();
