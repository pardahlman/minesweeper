describe("The 'Game'", () => {
    var game: Game,
        settings: GameSettings,
        repo: BrickRepository;

    beforeEach(()=> {
        repo = new BrickRepository({ boardWidth: 10, boardHeight: 10 });
        game = new Game(repo);
    });

    describe("The 'state' of the Game", ()=> {
        it("Should be 'NotStarted' upon instansiating", ()=> {
            /* Test */
            var result = game.state;

            /* Assert */
            expect(result).toEqual(GameState.NotStarted);
        });

        it("Should be 'Ready' after setup is performed", () => {
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
            spyOn(BrickGenerator, 'createBricks');

            /* Test */
            game.setup(settings);

            /* Assert */
            expect(BrickGenerator.createBricks).toHaveBeenCalledWith(settings.size);
        });

        it("Should use default settings if none supplied", ()=> {
            spyOn(BrickGenerator, 'createBricks');

            /* Test */
            game.setup();

            /* Assert */
            expect(BrickGenerator.createBricks).toHaveBeenCalledWith(Game._defaultSettings.size);
        });

        it("Should remove all bricks from the brick repo", ()=> {
            /* Setup */
            spyOn(repo, 'removeAllBricks');

            /* Test */
            game.setup(settings);

            /* Assert */
            expect(repo.removeAllBricks).toHaveBeenCalled();

        });
    });
});
