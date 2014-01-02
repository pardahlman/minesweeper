///<reference path="../../Librarys/typings/knockout/knockout.d.ts"/>

class BrickViewModel {
    private _brick: Brick;

    public State: KnockoutObservable<BrickState> = ko.observable(BrickState.Unknown);
    public DisplayText: KnockoutComputed<string> = ko.computed(() => {

        if (this.State() == BrickState.Flagged) {
            return "?";
        }

        if (this.State() == BrickState.FacingUp) {
            if (this._brick.type == BrickType.Bomb) {
                return "B";
            }

            return this._brick.numberOfNormalNeighbours.toString();
            }
            return "";
        });

    constructor(brick: Brick) {
        this._brick = brick;
        this.State(brick.state);
    }
} 