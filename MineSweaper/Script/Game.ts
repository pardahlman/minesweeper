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

     constructor() {
         this.state = GameState.NotStarted;
     }

    public setup(settings?: GameSettings): void {
        
        this._currentSettings = settings || Game._defaultSettings;

        BrickGenerator.createBricks(this._currentSettings.size);
        this.state = GameState.Ready;
    }
} 