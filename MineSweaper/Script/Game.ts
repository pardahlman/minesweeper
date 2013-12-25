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
        
        this._currentSettings = settings || Game._defaultSettings;

        this.repo.removeAllBricks();
        GameSetupHelper.createBricks(this._currentSettings.size);
        this.state = GameState.Ready;
    }
} 