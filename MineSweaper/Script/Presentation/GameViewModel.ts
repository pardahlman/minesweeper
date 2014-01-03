class GameViewModel {
    private _game: Game = new Game();

    public flip: (brickVm: BrickViewModel)=> void;
    public Setup: ()=> void;

    public BricksVms = ko.observableArray(new Array<Array<BrickViewModel>>());
    public State: KnockoutObservable<GameState>;

    public NumberOfRows: KnockoutObservable<number> = ko.observable(Game._defaultSettings.size.boardWidth);
    public NumberOfColumn: KnockoutObservable<number> = ko.observable(Game._defaultSettings.size.boardHeight);
    public Difficulty: KnockoutObservable<GameLevel> = ko.observable(Game._defaultSettings.level);

    constructor() {
        this.Setup = ()=> {
            var settings = {
                size: {
                    boardWidth: this.NumberOfRows(),
                    boardHeight: this.NumberOfColumn(),
                },
                level: this.Difficulty()
            };

            this._game.setup(settings);

            this.BricksVms([]);
            //this._game.bricks.forEach(row=> row.forEach(brick=> this.BricksVms.push(new BrickViewModel(brick))));

            _.each(this._game.bricks, row=> {
                var currentRow = new Array<BrickViewModel>();
                
                _.each(row, brick=> {
                    currentRow.push(new BrickViewModel(brick));
                });
                this.BricksVms.push(currentRow);
            });
            this.State = ko.observable(this._game.state);


        };

        this.flip = (currentBrickVm: BrickViewModel)=> {
            this._game.flip(currentBrickVm.Brick);

            if (this.State() != this._game.state) {
                this.State(this._game.state);
            }
        };
    }
}