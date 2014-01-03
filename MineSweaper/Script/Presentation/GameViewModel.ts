class GameViewModel {
    private _game: Game = new Game();

    public flag: (brickVm: BrickViewModel)=> void;
    public handleClick : (brickVm: BrickViewModel, event: JQueryEventObject) => void;
    public Setup: () => void;


    public BricksVms = ko.observableArray(new Array<Array<BrickViewModel>>());
    public State: KnockoutObservable<GameState> = ko.observable(GameState.Unknown);

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
            this._game.onStateChanged = (newState)=> this.State(newState);

            this.BricksVms([]);

            _.each(this._game.bricks, row=> {
                var currentRow = new Array<BrickViewModel>();
                
                _.each(row, brick=> {
                    currentRow.push(new BrickViewModel(brick));
                });
                this.BricksVms.push(currentRow);
            });
            this.State(this._game.state);
            

        };

        this.handleClick = (vm, event)=> {
            if (event.ctrlKey)
                this._game.expandCoveredArea(vm.Brick);
            else {
                this._game.flip(vm.Brick);
            }
        };

        this.flag = (currentBrickVm)=> this._game.toggleFlag(currentBrickVm.Brick);
    }
}