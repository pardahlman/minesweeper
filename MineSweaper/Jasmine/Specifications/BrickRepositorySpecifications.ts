/// <reference path="../../Script/BrickFlipper.ts"/>
/// <reference path="../../Script/BrickRepository.ts"/>

describe("The BrickRepository", () => {
    var repo: BrickRepository,
        brick : Brick,
        size: BoardSize,
        coordinate: Coordinate;

    describe("The size of the board", ()=> {
        beforeEach(()=> {
            /* Setup */
            size = {
                boardWidth: 11,
                boardHeight: 10,
            };
        });

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

    describe("The 'tryGetBrick' method", () => {
        beforeEach(() => {
            /* Setup */
            size = {
                boardWidth: 11,
                boardHeight: 10,
            };

            repo = new BrickRepository(size);
        });

        it("Should return 'false' if no Brick on that coordinate", ()=> {
            /* Setup */
            coordinate = {
                x: 123,
                y: 123
            };
            /* Test*/
            var result = repo.tryGetBrick(coordinate, brick);

            /* Assert */
            expect(result).toBeFalsy();
        });
    });
});