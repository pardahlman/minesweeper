/// <reference path="../../Script/BrickFlipper.ts"/>
/// <reference path="../../Script/Board.ts"/>

describe("The Board", () => {
    var board: Board,
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
            board = new Board(size);
            
            /* Assert */
            expect(board.width).toEqual(size.boardWidth);
        });


        it("Should set height from size in constructor", () => {
            /* Test*/
            board = new Board(size);

            /* Assert */
            expect(board.height).toEqual(size.boardHeight);
        });
    });

    describe("The 'tryGetBrick' method", () => {
        beforeEach(() => {
            /* Setup */
            size = {
                boardWidth: 11,
                boardHeight: 10,
            };

            board = new Board(size);
        });

        it("Should return 'false' if no Brick on that coordinate", ()=> {
            /* Setup */
            coordinate = {
                x: 123,
                y: 123
            };
            /* Test*/
            var result = board.tryGetBrick(coordinate, brick);

            /* Assert */
            expect(result).toBeFalsy();
        });
    });
});