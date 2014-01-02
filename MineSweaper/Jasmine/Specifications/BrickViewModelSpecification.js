describe("The BrickVm", function () {
    describe("The the DisplayText property", function () {
        var brick, model;

        beforeEach(function () {
            brick = new Brick();
        });

        it("Should be a Questionmark if the brick is flagged", function () {
            /* Setup */
            brick.state = 1 /* Flagged */;

            /* Test */
            model = new BrickViewModel(brick);

            /* Assert */
            expect(model.DisplayText()).toEqual("?");
        });
    });
});
//# sourceMappingURL=BrickViewModelSpecification.js.map
