class BrickViewModel {
    private _brick: Brick;

    public DisplayText: KnockoutComputed<string> = ko.computed(()=> "?");

    constructor(brick: Brick) {
    }
} 