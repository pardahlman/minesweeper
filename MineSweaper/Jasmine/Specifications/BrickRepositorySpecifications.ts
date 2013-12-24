/// <reference path="../../Script/BrickFlipper.ts"/>
/// <reference path="../../Script/BrickRepository.ts"/>

describe("The BrickRepository", () => {
    var repo: BrickRepository,
        brick : Brick,
        size: BoardSize,
        coordinate: Coordinate;

    beforeEach(() => {
        /* Setup */
        size = {
            boardWidth: 11,
            boardHeight: 10,
        };
    });

    describe("The size of the board", ()=> {
        

        it("Should set width from size in constructor", () => {
            /* Test*/
            repo = new BrickRepository(size);
            
            /* Assert */
            expect(repo.width).toEqual(size.boardWidth);
        });


        it("Should set height from size in constructor", () => {
            /* Test*/
            repo = new BrickRepository(size);

            /* Assert */
            expect(repo.height).toEqual(size.boardHeight);
        });
    });

    describe("The 'containsBrickAt' method", () => {
        beforeEach(() => {
            /* Setup */
            size = {
                boardWidth: 11,
                boardHeight: 10,
            };

            coordinate = {
                x: 0,
                y: 0
            };

            repo = new BrickRepository(size);
        });

        it("Should return 'false' if x coordinate is negative", ()=> {
            /* Setup */
            coordinate.x = -1;

            /* Test*/
            var result = repo.containsBrickAt(coordinate);

            /* Assert */
            expect(result).toBeFalsy();
        });

        it("Should return 'false' if y coordinate is negative", () => {
            /* Setup */
            coordinate.y = -1;

            /* Test*/
            var result = repo.containsBrickAt(coordinate);

            /* Assert */
            expect(result).toBeFalsy();
        });

        it("Should return 'false' if x coordinate is out of bound", () => {
            /* Setup */
            coordinate.x = 123;

            /* Test*/
            var result = repo.containsBrickAt(coordinate);

            /* Assert */
            expect(result).toBeFalsy();
        });

        it("Should return 'false' if y coordinate is out of bound", () => {
            /* Setup */
            coordinate.y = 123;

            /* Test*/
            var result = repo.containsBrickAt(coordinate);

            /* Assert */
            expect(result).toBeFalsy();
        });

        it("Should return 'true' if Brick coordinate within span", ()=> {
          /* Test*/
            var result = repo.containsBrickAt(coordinate);

            /* Assert */
            expect(result).toBeTruthy();
        });

        
    });

    describe("The 'getBrick' method", () => {
        beforeEach(() => {
            /* Setup */
            size = {
                boardWidth: 11,
                boardHeight: 10,
            };

            coordinate = {
                x: 0,
                y: 0
            };

            repo = new BrickRepository(size);
        });

        it("Should not throw error if coordinate is out of bound", () => {
            /* Setup */
            coordinate.x = -1;

            /* Assert */
            expect(() => repo.getBrick(coordinate)).not.toThrow();
        });

        it("Should call 'containsBrickAt'", ()=> {
            /* Setup */
            spyOn(repo, 'containsBrickAt');

            /* Test */
            repo.getBrick(coordinate);

            /* Assert */
            expect(repo.containsBrickAt).toHaveBeenCalledWith(coordinate);
        });

        it("Should return the actual brick'", () => {
            /* Test */
            var result = repo.getBrick(coordinate);

            /* Assert */
            expect(result.coordinate).toEqual(coordinate);
        });
    });

    describe("The 'getRandomBrick' method", ()=> {
        it("Should use Math's 'random' to get brick", ()=> {
            /* Setup */
            repo = new BrickRepository(size);
            spyOn(Math, 'random').andCallThrough();
            
            /* Test */
            repo.getRandomBrick();

            /* Assert */
            expect(Math.random).toHaveBeenCalled();
        });

        it("Should return the first brick when random returns 0", ()=> {
            /* Setup */
            repo = new BrickRepository(size);
            spyOn(Math, 'random').andReturn(0);

            /* Test */
            var result = repo.getRandomBrick();

            /* Assert */
            expect(result.coordinate.x).toEqual(0);
            expect(result.coordinate.y).toEqual(0);
        });

        it("Should return the last brick when random returns max value", () => {
            /* Setup */
            repo = new BrickRepository(size);
            spyOn(Math, 'random').andReturn(0.99999999999999);

            /* Test */
            var result = repo.getRandomBrick();

            /* Assert */
            expect(result.coordinate.x).toEqual(size.boardWidth -1);
            expect(result.coordinate.y).toEqual(size.boardHeight -1);
        });
    });
});