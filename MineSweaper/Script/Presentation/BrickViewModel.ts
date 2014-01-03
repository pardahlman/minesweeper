///<reference path="../../Librarys/typings/knockout/knockout.d.ts"/>

class BrickViewModel {
    public  Brick: Brick;

    public State: KnockoutObservable<BrickState> = ko.observable(BrickState.Unknown);
    public HasExploded : KnockoutComputed<boolean> = ko.computed(()=> {
        return (this.State() == BrickState.FacingUp && this.Brick.type == BrickType.Bomb);
    })

    public DisplayText: KnockoutComputed<string> = ko.computed(() => {
        if (this.State() == BrickState.FacingDown) {
            return "facingDown";
        }
        if (this.State() == BrickState.Flagged) {
            return "flagged";
        }

        if (this.State() == BrickState.FacingUp) {
            if (this.Brick.type == BrickType.Bomb) {
                return "boom";
            }

            return this.Brick.numberOfNormalNeighbours.toString();
            }
            return "";
        });

    constructor(brick: Brick) {
        this.Brick = brick;
        this.State(brick.state);
        brick.onStateChanged = newValue => this.State(newValue);
    }
} 