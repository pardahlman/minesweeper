///<reference path="BrickType.ts"/>
///<reference path="Coordinate.ts"/>
///<reference path="BrickState.ts"/>

class Brick {
    private _state: BrickState;

    public type: BrickType;
    public coordinate : Coordinate
    public adjacentBricks: Array<Brick>;
    public numberOfBombNeighbours : number;
    public onStateChanged : (newValue : BrickState) => void;
   
    public set state(newValue: BrickState) {
        this._state = newValue;
        if (this.onStateChanged != undefined)
            this.onStateChanged(newValue);
    }
    public get state() {
        return this._state;
    }

    constructor(x?: number, y?: number) {
        this.type = BrickType.Unknown;
        this._state = BrickState.FacingDown;
        this.adjacentBricks = new Array<Brick>();
        this.numberOfBombNeighbours = 0;

        if (x != undefined && y != undefined) {
            this.coordinate =
            {
                x: x,
                y: y
            };
        }
    }
}