class BrickFlipper implements IFlipper {
    
    flip(brick: Brick): void {
        brick.state = BrickState.FacingUp;
        if (brick.type == BrickType.Normal) {
            brick.adjacentBricks.forEach(neighbour => this.flip(neighbour) );
        }

    }
} 

interface IFlipper {
    flip(brick : Brick) : void;
}