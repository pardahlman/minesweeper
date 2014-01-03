describe("The BrickVm", () => {
    var brick: Brick,
        model: BrickViewModel;

    describe("The 'State' property", ()=> {
        it("Should update state according to underlying brick", ()=> {
            /* Setup */
            var facingDownBrick = new Brick();
            var facingUpBrick= new Brick();
            facingDownBrick.state = BrickState.FacingDown;
            facingUpBrick.state = BrickState.FacingUp;
            
            /* Test */
            var facingDownVm = new BrickViewModel(facingDownBrick);
            var facingUpVm = new BrickViewModel(facingUpBrick);

            /* Assert */
            expect(facingUpVm.State()).toEqual(facingUpBrick.state);
            expect(facingDownVm.State()).toEqual(facingDownBrick.state);
        });
    });
    describe("The the DisplayText property", () => {
        beforeEach(() => {
            brick = new Brick();
        });

        describe("When brick is flagged", () => {

            beforeEach(()=> {
                brick.state = BrickState.Flagged;
            });

            it("Should be a Questionmark if the brick is flagged", () => {
                /* Test */
                model = new BrickViewModel(brick);

                /* Assert */
                expect(model.DisplayText()).toEqual("flagged");
            });
        });

        describe("When brick is facing down", () => {

            beforeEach(() => {
                brick.state = BrickState.FacingDown;
            });

            it("Should be a 'facingDown' if the brick is flagged", () => {
                /* Test */
                model = new BrickViewModel(brick);

                /* Assert */
                expect(model.DisplayText()).toEqual("facingDown");
            });
        });

        describe("When brick is facing up", () => {
            beforeEach(() => {
                brick.state = BrickState.FacingUp;
            });

            it("Should show neighbour count if brick is normal", ()=> {
                /* Setup */
                var numberOfNeighbourts = 3;
                brick.type = BrickType.Normal;
                brick.numberOfBombNeighbours = numberOfNeighbourts;
                
                /* Test */
                model = new BrickViewModel(brick);

                /* Assert */
                expect(model.DisplayText()).toEqual(numberOfNeighbourts.toString());
            });

            it("Should be the 'boom' for bomb", () => {
                /* Setup */
                brick.type = BrickType.Bomb;

                /* Test */
                model = new BrickViewModel(brick);

                /* Assert */
                expect(model.DisplayText()).toEqual("boom");
            });
        });
    });
});