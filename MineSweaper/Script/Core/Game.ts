class Game {
    public repo: BrickRepository;
    public state: GameState;
    public bricks : Array<Array<Brick>>;

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
        
        // Create Bricks
        var newBricks = GameSetupHelper.createBricks(this._currentSettings.size);
        this.bricks = newBricks;

        // Convert some of them to bombs
        var numberOfBombs = GameSetupHelper.getNumberOfBombs(this._currentSettings);
        GameSetupHelper.addBombs(newBricks, numberOfBombs);

        // Connect bricks so that they get neighbours
        GameSetupHelper.setBrickRelations(newBricks);

        // Set "normal neghbour" count for bricks
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
} 