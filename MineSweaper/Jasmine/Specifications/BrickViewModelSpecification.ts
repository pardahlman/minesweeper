describe("The BrickVm", ()=> {
    describe("The the DisplayText property", () => {
        var brick: Brick,
            model: BrickViewModel;

        beforeEach(()=> {
            brick = new Brick();
        });

        it("Should be a Questionmark if the brick is flagged", ()=> {
            /* Setup */
            brick.state = BrickState.Flagged;

            /* Test */
            model = new BrickViewModel(brick);

            /* Assert */
            expect(model.DisplayText()).toEqual("?");
        });
    });    
});