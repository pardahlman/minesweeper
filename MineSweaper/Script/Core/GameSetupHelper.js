var GameSetupHelper = (function () {
    function GameSetupHelper() {
    }
    GameSetupHelper.createBricks = function (size) {
        var bricks = new Array();

        for (var columnIndex = 0; columnIndex < size.boardWidth; columnIndex++) {
            var currentColumn = new Array();
            bricks.push(currentColumn);
            for (var rowIndex = 0; rowIndex < size.boardHeight; rowIndex++) {
                currentColumn.push(new Brick(rowIndex, columnIndex));
            }
        }

        return bricks;
    };

    GameSetupHelper.setNeighbourCountFor = function (brick) {
        var neighbourCount = brick.adjacentBricks.filter(function (b) {
            return b.type == 1 /* Normal */;
        }).length;

        brick.numberOfNormalNeighbours = neighbourCount;
    };

    GameSetupHelper.addBombs = function (bricks, numberOfBombs) {
        if (bricks == undefined) {
            throw new Error();
        }

        var totalNumberOfBricks = bricks.length * bricks[0].length;

        if (numberOfBombs < 0 || totalNumberOfBricks < numberOfBombs) {
            throw new Error("Cannot create bombs, number of desired bombs is to big or small.");
        }

        var flatList = new Array();
        bricks.forEach(function (row) {
            return row.forEach(function (brick) {
                return flatList.push(brick);
            });
        });

        flatList.shuffle();

        var bombList = flatList.slice(0, numberOfBombs);
        bombList.forEach(function (bomb) {
            return bomb.type = 2 /* Bomb */;
        });
    };
    return GameSetupHelper;
})();
