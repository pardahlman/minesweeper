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
        if (this.state == GameState.Ready) {
            this.state = GameState.Ongoing;
        }

        if (this.state != GameState.Ongoing) {
            return;
        }

        // flip brick if not allready flipped or flagged
        if (brick.state == BrickState.FacingUp || brick.state == BrickState.Flagged)  {
            return;
        }
        brick.state = BrickState.FacingUp;
        
        // check if brick is bomb, and if so set game state to game over
        if (brick.type == BrickType.Bomb) {
            this.state = GameState.Finnished;
        }

        // flip neighbours if brick has only normal neighbours
        var hasBombNeighbour = brick.adjacentBricks
                                        .filter(neighbour=> neighbour.type == BrickType.Bomb)
                                        .length != 0;
        if (!hasBombNeighbour) {
            brick.adjacentBricks.forEach(neighbour => this.flip(neighbour));
        }

        // check if victory conditions are met, and if so change game state
        var hasUnflippedBricks = _.any(this.bricks, row=> _.any(row, b=> b.state == BrickState.FacingDown));
        if (!hasUnflippedBricks) {
            this.state = GameState.Finnished;
        }
    }
} 