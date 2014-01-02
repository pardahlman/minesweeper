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
            spyOn(GameSetupHelper, 'createBricks').andCallThrough();

            /* Test */
            game.setup(settings);

            /* Assert */
            expect(GameSetupHelper.createBricks).toHaveBeenCalledWith(settings.size);
        });

        it("Should use default settings if none supplied", ()=> {
            spyOn(GameSetupHelper, 'createBricks').andCallThrough();

            /* Test */
            game.setup();

            /* Assert */
            expect(GameSetupHelper.createBricks).toHaveBeenCalledWith(Game._defaultSettings.size);
        });

        it("Should remove all bricks from the brick repo", ()=> {
            /* Setup */
            spyOn(repo, 'removeAllBricks');

            /* Test */
            game.setup(settings);

            /* Assert */
            expect(repo.removeAllBricks).toHaveBeenCalled();

        });

        it("Should add bombs to the bricks", () => {
            /* Setup */
            spyOn(GameSetupHelper, 'addBombs');

            /* Test */
            game.setup(settings);

            /* Assert */
            expect(GameSetupHelper.addBombs).toHaveBeenCalled();
        });

        it("Should populate the neighbour array", ()=> {
            /* Setup */
            spyOn(GameSetupHelper, 'setBrickRelations').andCallThrough();

            /* Test */
            game.setup(settings);

            /* Assert */
            expect(GameSetupHelper.setBrickRelations).toHaveBeenCalled();
            expect(game.bricks[0][0].adjacentBricks.length).not.toEqual(0);
        });

        it("Should append number to all bricks", ()=> {
            /* Setup */
            var firstBrick = new Brick(1, 1);
            var secondBrick = new Brick(1, 1);
            var thirdBrick = new Brick(1, 1);
            var fourthBrick = new Brick(1, 1);

            var mockedResponse: Array<Array<Brick>> = [
                [firstBrick, secondBrick],
                [thirdBrick, fourthBrick]
            ];

            settings.size.boardHeight = 2;
            settings.size.boardWidth = 2;

            spyOn(GameSetupHelper, 'createBricks').andReturn(mockedResponse);
            spyOn(GameSetupHelper, 'setNeighbourCountFor');

            /* Test */
            game.setup(settings);

            /* Assert */
            expect(GameSetupHelper.setNeighbourCountFor).toHaveBeenCalledWith(firstBrick);
            expect(GameSetupHelper.setNeighbourCountFor).toHaveBeenCalledWith(secondBrick);
            expect(GameSetupHelper.setNeighbourCountFor).toHaveBeenCalledWith(thirdBrick);
            expect(GameSetupHelper.setNeighbourCountFor).toHaveBeenCalledWith(fourthBrick);
        });
    });
});
