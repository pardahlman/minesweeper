///<reference path="BrickType.ts"/>
///<reference path="Coordinate.ts"/>
///<reference path="BrickState.ts"/>

class Brick {
    public type: BrickType;
    public state: BrickState;
    public coordinate : Coordinate
    public adjacentBricks: Array<Brick>;
   
    constructor() {
        this.type = BrickType.Unknown;
        this.state = BrickState.Unknown;
        this.adjacentBricks = new Array<Brick>();
    }
}