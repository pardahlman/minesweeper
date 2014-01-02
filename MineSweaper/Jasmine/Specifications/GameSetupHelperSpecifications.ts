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

        it("Should set right coordinate values on Bricks", ()=> {
            /* Setup */
            var xCoordinate = 7;
            var yCoordinate = 9;
            /* Test */
            bricks = GameSetupHelper.createBricks(size);

            /* Assert */
            expect(bricks[xCoordinate][yCoordinate].coordinate.x).toBe(xCoordinate);
            expect(bricks[xCoordinate][yCoordinate].coordinate.y).toBe(yCoordinate);
        });
    });

    describe("The 'setBrickRelations' method", ()=> {
        beforeEach(()=> {
            bricks = GameSetupHelper.createBricks(size);
            GameSetupHelper.setBrickRelations(bricks);
        });

        it("Should set correct neighbours for bottom-left corner brick", ()=> {
            /* Assert */
            var bottomLeft = bricks[0][0];

            var leftNeighbour = bricks[1][0];
            var verticalNeighbour = bricks[1][1];
            var aboveNeighbour = bricks[0][1];

            // hack to get the toContain to work -- we get a circular reference otherwise
            leftNeighbour.adjacentBricks = new Array<Brick>();
            verticalNeighbour.adjacentBricks = new Array<Brick>();
            aboveNeighbour.adjacentBricks = new Array<Brick>();

            expect(bottomLeft.adjacentBricks.length).toEqual(3);
            expect(bottomLeft.adjacentBricks).toContain(leftNeighbour);
            expect(bottomLeft.adjacentBricks).toContain(verticalNeighbour);
            expect(bottomLeft.adjacentBricks).toContain(aboveNeighbour);
        });

        it("Should set correct neighbours for top-left corner brick", () => {
            /* Assert */
            var topLeft = bricks[0][size.boardHeight - 1];

            var rightNeighbour = bricks[1][size.boardHeight - 1];
            var verticalNeighbour = bricks[1][size.boardHeight - 2];
            var belowNeighbour = bricks[0][size.boardHeight - 2];

            // hack to get the toContain to work -- we get a circular reference otherwise
            rightNeighbour.adjacentBricks = new Array<Brick>();
            verticalNeighbour.adjacentBricks = new Array<Brick>();
            belowNeighbour.adjacentBricks = new Array<Brick>();

            expect(topLeft.adjacentBricks.length).toEqual(3);
            expect(topLeft.adjacentBricks).toContain(rightNeighbour);
            expect(topLeft.adjacentBricks).toContain(verticalNeighbour);
            expect(topLeft.adjacentBricks).toContain(belowNeighbour);
        });

        it("Should set correct neighbours for top-right corner brick", () => {
            /* Assert */
            var topRight = bricks[size.boardWidth - 1][size.boardHeight - 1];

            var leftNeighbour = bricks[size.boardWidth - 2][size.boardHeight - 1];
            var verticalNeighbour = bricks[size.boardWidth - 2][size.boardHeight - 2];
            var belowNeighbour = bricks[size.boardWidth - 1][size.boardHeight - 2];

            // hack to get the toContain to work -- we get a circular reference otherwise
            leftNeighbour.adjacentBricks = new Array<Brick>();
            verticalNeighbour.adjacentBricks = new Array<Brick>();
            belowNeighbour.adjacentBricks = new Array<Brick>();

            expect(topRight.adjacentBricks.length).toEqual(3);
            expect(topRight.adjacentBricks).toContain(leftNeighbour);
            expect(topRight.adjacentBricks).toContain(verticalNeighbour);
            expect(topRight.adjacentBricks).toContain(belowNeighbour);
        });

        it("Should set correct neighbours for bottom-right corner brick", () => {
            /* Assert */
            var bottomRight = bricks[size.boardWidth - 1][0];

            var leftNeighbour = bricks[size.boardWidth - 2][0];
            var verticalNeighbour = bricks[size.boardWidth - 2][1];
            var aboveNeighbour = bricks[size.boardWidth - 1][1];

            // hack to get the toContain to work -- we get a circular reference otherwise
            leftNeighbour.adjacentBricks = new Array<Brick>();
            verticalNeighbour.adjacentBricks = new Array<Brick>();
            aboveNeighbour.adjacentBricks = new Array<Brick>();

            expect(bottomRight.adjacentBricks.length).toEqual(3);
            expect(bottomRight.adjacentBricks).toContain(leftNeighbour);
            expect(bottomRight.adjacentBricks).toContain(verticalNeighbour);
            expect(bottomRight.adjacentBricks).toContain(aboveNeighbour);
        });

        it("Should set correct neighbours for top-edge brick", () => {
            /* Assert */
            var topEdge = bricks[1][size.boardHeight -1];

            var leftNeighbour = bricks[0][size.boardHeight - 1];
            var rightBrick = bricks[2][size.boardHeight - 1];
            var belowRight = bricks[2][size.boardHeight - 2];
            var belowNeighbour = bricks[1][size.boardHeight - 2];
            var belowLeft = bricks[0][size.boardHeight - 2];

            // hack to get the toContain to work -- we get a circular reference otherwise
            leftNeighbour.adjacentBricks = new Array<Brick>();
            belowRight.adjacentBricks = new Array<Brick>();
            belowNeighbour.adjacentBricks = new Array<Brick>();
            belowLeft.adjacentBricks = new Array<Brick>();
            rightBrick.adjacentBricks = new Array<Brick>();

            expect(topEdge.adjacentBricks.length).toEqual(5);
            expect(topEdge.adjacentBricks).toContain(leftNeighbour);
            expect(topEdge.adjacentBricks).toContain(belowRight);
            expect(topEdge.adjacentBricks).toContain(belowNeighbour);
            expect(topEdge.adjacentBricks).toContain(rightBrick);
            expect(topEdge.adjacentBricks).toContain(belowLeft);
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
