describe("The 'GameSetupHelper'", ()=> {
    var brick: Brick,
        bricks: Array<Array<Brick>>,
        size: BoardSize;

    beforeEach(()=> {
        size = {
            boardHeight: 12,
            boardWidth: 8
        };
    });


    describe("The 'createBricks' method", ()=> {
        it("Should return empty array if size is empty", ()=> {
            /* Setup */
            size.boardHeight = 0;
            size.boardWidth = 0;

            /* Test */
            bricks = GameSetupHelper.createBricks(size);

            /* Assert */
            expect(bricks.length).toBe(0);
        });

        it("Should have an outer array with as many cells as columns", ()=> {
            /* Test */
            bricks = GameSetupHelper.createBricks(size);

            /* Assert */
            expect(bricks.length).toBe(size.boardWidth);
        });

        it("Should have inner arrays with as many cells as columns", ()=> {
            /* Test */
            bricks = GameSetupHelper.createBricks(size);

            /* Assert */
            expect(bricks[0].length).toBe(size.boardHeight);
        });
    });

    describe("The 'getNeighbourCount' method", () => {

        beforeEach(()=> {
            brick = new Brick();
        });

        it("Should set 'setNeighbourCountFor(Brick)' to zero if no neighours'", () => {
            /* Setup */
            brick.adjacentBricks = new Array<Brick>();

            /* Test */
            GameSetupHelper.setNeighbourCountFor(brick);

            /* Assert */
            expect(brick.numberOfNormalNeighbours).toEqual(0);
        });

        it("Should set 'numberOfNormalNeighbours' to zero if all neighbours are bombs", () => {
            /* Setup */
            var bomb = new Brick();
            bomb.type = BrickType.Bomb;

            brick.adjacentBricks.push(bomb);
            brick.adjacentBricks.push(bomb);
            brick.adjacentBricks.push(bomb);

            /* Test */
            GameSetupHelper.setNeighbourCountFor(brick);

            /* Assert */
            expect(brick.numberOfNormalNeighbours).toEqual(0);
        });

        it("Should return correct amount when neighbours are both bombs and normal bricks", () => {
            /* Setup */
            var bomb = new Brick();
            bomb.type = BrickType.Bomb;

            var normal = new Brick();
            normal.type = BrickType.Normal;

            brick.adjacentBricks.push(bomb);
            brick.adjacentBricks.push(normal);
            brick.adjacentBricks.push(normal);

            /* Test */
            GameSetupHelper.setNeighbourCountFor(brick);

            /* Assert */
            expect(brick.numberOfNormalNeighbours).toEqual(2);
        });
    });

    describe("The 'addBombs' method", ()=> {
        it("Should throw error if argument is undefined", ()=> {
            /* Assert */
            expect(()=> GameSetupHelper.addBombs(undefined , 0 )).toThrow();
        });

        it("Should throw error if argument is null", () => {
            /* Assert */
            expect(() => GameSetupHelper.addBombs(null, 0)).toThrow();
        });

        it("Should throw error if total number of bricks is less than desired number of bombs", ()=> {
            /* Setup */
            bricks = [
                [new Brick(), new Brick(), new Brick()],
                [new Brick(), new Brick(), new Brick()]
            ];

            var numberOfBombs = 10;

            /* Assert */
            expect(() => GameSetupHelper.addBombs(bricks, numberOfBombs)).toThrow();
        });

        it("Shoud convert right amount of bricks to bombs", ()=> {
            /* Setup */
            bricks = [
                [new Brick(), new Brick(), new Brick()]
            ];
            
            /* Test */
            GameSetupHelper.addBombs(bricks, 2);

            /* Assert */
            expect(bricks[0].filter(b=> b.type == BrickType.Bomb).length).toBe(2);
        });
    });
});
