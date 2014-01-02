var Game = (function () {
    function Game(repo) {
        this.state = 0 /* NotStarted */;
        this.repo = repo;
    }
    Game.prototype.setup = function (settings) {
        this._currentSettings = settings || Game._defaultSettings;

        this.repo.removeAllBricks();

        var newBricks = GameSetupHelper.createBricks(this._currentSettings.size);

        // Create bombs
        var numberOfBombs = this.getBombCount(this._currentSettings);
        GameSetupHelper.addBombs(newBricks, numberOfBombs);

        newBricks.forEach(function (row) {
            return row.forEach(function (brick) {
                return GameSetupHelper.setNeighbourCountFor(brick);
            });
        });

        this.state = 1 /* Ready */;
    };

    Game.prototype.getBombCount = function (settings) {
        var numberOfBricks = settings.size.boardHeight * settings.size.boardWidth;
        var gameLevelFactor;

        switch (settings.level) {
            case 0 /* Easy */:
                gameLevelFactor = 0.1;
                break;
            case 1 /* Medium */:
                gameLevelFactor = 0.3;
                break;
            case 2 /* Hard */:
                gameLevelFactor = 0.4;
                break;
            default:
                gameLevelFactor = 0.1;
                break;
        }

        return Math.round(numberOfBricks * gameLevelFactor);
    };
    Game._defaultSettings = {
        level: 1 /* Medium */,
        size: {
            boardWidth: 10,
            boardHeight: 10
        }
    };
    return Game;
})();
