class Game {
    public repo: BrickRepository;
    public state: GameState;

    public static _defaultSettings: GameSettings =
    {
        level: GameLevel.Medium,
        size: {
            boardWidth: 10,
            boardHeight: 10
        }
    };

    private _currentSettings : GameSettings;

     constructor(repo : BrickRepository) {
         this.state = GameState.NotStarted;
         this.repo = repo;
     }

    public setup(settings?: GameSettings): void {
        this.repo.removeAllBricks(); //TODO: remove this

        this._currentSettings = settings || Game._defaultSettings;
        var newBricks = GameSetupHelper.createBricks(this._currentSettings.size);

        // Create bombs
        var numberOfBombs = this.getBombCount(this._currentSettings);
        GameSetupHelper.addBombs(newBricks, numberOfBombs);


        newBricks.forEach(row=>
            row.forEach(brick=>
                GameSetupHelper.setNeighbourCountFor(brick)
            )
        );


        this.state = GameState.Ready;
    }

    public flip(brick: Brick): void {
        // if game state is ready, start timer and start game
        // check if brick is bomb, and if so set game state to game over
        // flip brick if not allready flipped
        // flip neighbours if brick has normal neighbours
        
    }

    private getBombCount (settings: GameSettings) : number {
        var numberOfBricks = settings.size.boardHeight * settings.size.boardWidth;
        var gameLevelFactor: number;

        switch (settings.level) {
            case GameLevel.Easy:
                gameLevelFactor = 0.1;
                break;
            case GameLevel.Medium:
                gameLevelFactor = 0.3;
                break;
            case GameLevel.Hard:
                gameLevelFactor = 0.4;
                break;
            default:
                gameLevelFactor = 0.1;
                break;
        }

        return Math.round(numberOfBricks * gameLevelFactor);
    }
} 