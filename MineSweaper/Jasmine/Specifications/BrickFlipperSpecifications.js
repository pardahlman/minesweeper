describe("The BrickFlipper", function () {
    it("Should be defined", function () {
        expect(BrickFlipper).toBeDefined();
    });

    describe("The 'flipBrick' method", function () {
        var brick, neighbour, flipper;

        beforeEach(function () {
            flipper = new BrickFlipper();
            brick = new Brick();
            neighbour = new Brick();

            brick.adjacentBricks.push(neighbour);
        });

        it("Should set state to 'facaingUp' on brick being flipped", function () {
            /* Test */
            flipper.flip(brick);

            /* Assert */
            expect(brick.state).toEqual(2 /* FacingUp */);
        });

        it("Should not flip neighbour if brick is of type 'Bomb'", function () {
            /* Setup */
            brick.type = 2 /* Bomb */;
            spyOn(flipper, 'flip').andCallThrough();

            /* Test */
            flipper.flip(brick);

            /* Assert */
            expect(flipper.flip).not.toHaveBeenCalledWith(neighbour);
        });

        it("Should call 'flip' in neighbours if type is 'Normal'", function () {
            /* Setup */
            brick.type = 1 /* Normal */;
            spyOn(flipper, 'flip').andCallThrough();

            /* Test */
            flipper.flip(brick);

            /* Assert */
            expect(flipper.flip).toHaveBeenCalledWith(neighbour);
        });
    });
});
//# sourceMappingURL=BrickFlipperSpecifications.js.map
