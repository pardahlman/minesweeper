describe("The BrickFlipper", ()=> {
    it("Should be defined", ()=> {
        expect(BrickFlipper).toBeDefined();
    });

    describe("The 'flipBrick' method", () => {
        var brick: Brick,
            neighbour: Brick,
            flipper: BrickFlipper;

        beforeEach(()=> {
            flipper = new BrickFlipper();
            brick = new Brick();
            neighbour = new Brick();

            brick.adjacentBricks.push(neighbour);
        });

        it("Should set state to 'facaingUp' on brick being flipped", ()=> {
            /* Test */
            flipper.flip(brick);

            /* Assert */
            expect(brick.state).toEqual(BrickState.FacingUp);
        });

        it("Should not flip neighbour if brick is of type 'Bomb'", ()=> {
            /* Setup */
            brick.type = BrickType.Bomb;
            spyOn(flipper, 'flip').andCallThrough();

            /* Test */
            flipper.flip(brick);

            /* Assert */
            expect(flipper.flip).not.toHaveBeenCalledWith(neighbour);
        });

        it("Should call 'flip' in neighbours if type is 'Normal'", () => {
            /* Setup */
            brick.type = BrickType.Normal;
            spyOn(flipper, 'flip').andCallThrough();

            /* Test */
            flipper.flip(brick);

            /* Assert */
            expect(flipper.flip).toHaveBeenCalledWith(neighbour);

        });
    });
}) 

