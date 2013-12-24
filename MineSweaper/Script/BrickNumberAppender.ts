class BrickNumberAppender {
    append(brick: Brick): void {

        var normalNeighbours = brick.adjacentBricks
            .filter(b => b.type == BrickType.Normal)
            .length;

        brick.numberOfNormalNeighbours = normalNeighbours;
    }
} 