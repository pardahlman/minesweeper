var BrickRepository = (function () {
    function BrickRepository(size) {
        this.width = size.boardWidth;
        this.height = size.boardHeight;

        this._bricks = new Array();

        for (var currentColumnIndex = 0; currentColumnIndex < this.height; currentColumnIndex++) {
            var currentColumn = new Array();
            this._bricks.push(currentColumn);
            for (var currentRowIndex = 0; currentRowIndex < this.width; currentRowIndex++) {
                currentColumn.push(new Brick(currentRowIndex, currentColumnIndex));
            }
        }
    }
    BrickRepository.prototype.removeAllBricks = function () {
        this._bricks = new Array();
    };

    BrickRepository.prototype.containsBrickAt = function (coordinate) {
        if (coordinate.x < 0 || this.width < coordinate.x) {
            return false;
        }

        if (coordinate.y < 0 || this.height < coordinate.y) {
            return false;
        }

        return true;
    };

    BrickRepository.prototype.getBrick = function (coordinate) {
        if (!this.containsBrickAt(coordinate)) {
            return undefined;
        }

        return this._bricks[coordinate.x][coordinate.y];
    };

    BrickRepository.prototype.getRandomBrick = function () {
        var yIndex = Math.round(Math.random() * (this.width - 1));
        var xIndex = Math.round(Math.random() * (this.height - 1));

        return this.getBrick({ x: xIndex, y: yIndex });
    };

    BrickRepository.prototype.getAllBricks = function () {
        var allBricks = new Array();
        this._bricks.forEach(function (column) {
            return allBricks = allBricks.concat(column);
        });
        return allBricks;
    };
    return BrickRepository;
})();
