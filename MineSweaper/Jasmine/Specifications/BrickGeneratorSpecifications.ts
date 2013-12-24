describe("The 'BrickGenerator'", ()=> {
    var bricks: Array<Array<Brick>>,
        size: BoardSize;

    beforeEach(()=> {
        size = {
            boardHeight: 12,
            boardWidth: 8
        };
    });

    it("Should return empty array if size is empty", () => {
        /* Setup */
        size.boardHeight = 0;
        size.boardWidth = 0;

        /* Test */
        bricks = BrickGenerator.createBricks(size);

        /* Assert */
        expect(bricks.length).toBe(0);
    });

    it("Should have an outer array with as many cells as columns", () => {
        /* Test */
        bricks = BrickGenerator.createBricks(size);

        /* Assert */
        expect(bricks.length).toBe(size.boardWidth);
    });

    it("Should have inner arrays with as many cells as columns", () => {
        /* Test */
        bricks = BrickGenerator.createBricks(size);

        /* Assert */
        expect(bricks[0].length).toBe(size.boardHeight);
    });


});