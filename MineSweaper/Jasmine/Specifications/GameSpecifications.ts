describe("The 'Game'", () => {
    var game: Game,
        settings: GameSettings;

    describe("The 'state' of the Game", ()=> {
        it("Should be 'NotStarted' upon instansiating", ()=> {
            /* Setup */
            game = new Game();

            /* Test */
            var result = game.state;

            /* Assert */
            expect(result).toEqual(GameState.NotStarted);
        });

        it("Should be 'Ready' after setup is performed", () => {
            /* Setup */
            game = new Game();

            /* Test */
            game.setup();

            /* Assert */
            expect(game.state).toEqual(GameState.Ready);
        });
    });

    describe("The 'setup' method", () => {

        beforeEach(()=> {

            settings = {
                level: GameLevel.Easy,
                size: {
                    boardWidth: 10,
                    boardHeight: 10
                }
            };
        });

        it("Should create new bricks from BrickGenerator with the size-settings", ()=> {
            /* Setup */
            game = new Game();
            spyOn(BrickGenerator, 'createBricks');

            /* Test */
            game.setup(settings);

            /* Assert */
            expect(BrickGenerator.createBricks).toHaveBeenCalledWith(settings.size);
        });

        it("Should use default settings if none supplied", ()=> {
            game = new Game();
            spyOn(BrickGenerator, 'createBricks');

            /* Test */
            game.setup();

            /* Assert */
            expect(BrickGenerator.createBricks).toHaveBeenCalledWith(Game._defaultSettings.size);
        });
    });
});
