describe("The 'Game'", () => {
    var game: Game,
        settings: GameSettings;

    beforeEach(()=> {
        game = new Game();
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

    describe("The 'flip' method", () => {
        var brick: Brick;

        beforeEach(()=> {
            game.setup();
            brick = game.bricks[1][1];
        });

        it("Should set game state to 'Ongoing' if state is 'Ready'", () => {
            /* Setup */
            game.state = GameState.Ready;
            brick.type = BrickType.Normal;

            /* Test */
            game.flip(brick);

            /* Assert */
            expect(game.state).toEqual(GameState.Ongoing);
        });

        it("Should not flip the brick if the state of the game is not correct", ()=> {
            /* Setup */
            game.state = GameState.Unknown;

            /* Test */
            game.flip(brick);

            /* Assert */
            expect(brick.state).toEqual(BrickState.FacingDown);
        });

        it("Should flip the brick if the state of the game is correct", () => {
            /* Setup */
            game.state = GameState.Ongoing;

            /* Test */
            game.flip(brick);

            /* Assert */
            expect(brick.state).toEqual(BrickState.FacingUp);
        });

        it("Should keep game state if flipped brick is not a bomb", () => {
            /* Setup */
            game.state = GameState.Ongoing;
            brick.type = BrickType.Normal;

            /* Test */
            game.flip(brick);

            /* Assert */
            expect(game.state).toEqual(GameState.Ongoing);
        });

        it("Should change game state to Finnished if flipped brick is a bomb", () => {
            /* Setup */
            game.state = GameState.Ongoing;
            brick.type = BrickType.Bomb;

            /* Test */
            game.flip(brick);

            /* Assert */
            expect(game.state).toEqual(GameState.Finnished);
        });

        it("Should not flip neighbours if brick is bomb", ()=> {
            /* Setup */
            game.state = GameState.Ongoing;
            brick.type = BrickType.Bomb;

            /* Test */
            game.flip(brick);

            /* Assert */
            var flipedNeighbours = brick.adjacentBricks.filter(neighbour=> neighbour.state == BrickState.FacingUp);
            expect(flipedNeighbours.length).toEqual(0);
        });

        it("Should not flip neighbours if brick has a bomb neighbour", () => {
            /* Setup */
            game.state = GameState.Ongoing;
            brick.type = BrickType.Normal;
            brick.adjacentBricks[0].type = BrickType.Bomb;

            /* Test */
            game.flip(brick);

            /* Assert */
            var flipedNeighbours = brick.adjacentBricks.filter(neighbour=> neighbour.state == BrickState.FacingUp);
            expect(flipedNeighbours.length).toEqual(0);
        });

        it("Should flip neighbours if brick and all neighbours are normal", () => {
            /* Setup */
            game.state = GameState.Ongoing;
            brick.type = BrickType.Normal;
            brick.adjacentBricks.forEach(b=> b.type = BrickType.Normal);

            /* Test */
            game.flip(brick);

            /* Assert */
            var flipedNeighbours = brick.adjacentBricks.filter(neighbour=> neighbour.state == BrickState.FacingUp);
            expect(flipedNeighbours.length).toEqual(brick.adjacentBricks.length);
        });


        it("Should not flip neighbours that is flagged, even if all are normal", () => {
            /* Setup */
            game.state = GameState.Ongoing;
            brick.type = BrickType.Normal;
            brick.adjacentBricks.forEach(b => b.type = BrickType.Normal);
            var flaggedBrick = brick.adjacentBricks[0];
            flaggedBrick.state = BrickState.Flagged;

            /* Test */
            game.flip(brick);

            /* Assert */
            expect(flaggedBrick.state).toEqual(BrickState.Flagged);
        });

        it("Should set game state to Finnished if all bricks are flipped", ()=> {
            /* Setup */
            // All brick facing down but 'brick'
            game.bricks.forEach(row=>
                row.forEach(b=> {
                    b.type = BrickType.Normal;
                        b.state = BrickState.FacingUp;
                    })
                );
            brick.state = BrickState.FacingDown;

            /* Test */
            game.flip(brick);

            /* Assert */
            expect(game.state).toEqual(GameState.Finnished);
        });
    });

    describe("The 'toggleFlag' method", () => {
        var brick: Brick;

        beforeEach(() => {
            game.setup();
            brick = game.bricks[1][1];
        });

        it("Should not flag if brick is not facing down", ()=> {
            /* Setup */
            brick.state = BrickState.FacingUp;

            /* Test */
            game.toggleFlag(brick);

            /* Assert */
            expect(brick.state).toEqual(BrickState.FacingUp);
        });

        it("Should flag if brick is facing down", () => {
            /* Setup */
            brick.state = BrickState.FacingDown;

            /* Test */
            game.toggleFlag(brick);

            /* Assert */
            expect(brick.state).toEqual(BrickState.Flagged);
        });

        it("Should turn flagged brick to facing Down", ()=> {
            /* Setup */
            brick.state = BrickState.Flagged;

            /* Test */
            game.toggleFlag(brick);

            /* Assert */
            expect(brick.state).toEqual(BrickState.FacingDown);
        });
    });
});
