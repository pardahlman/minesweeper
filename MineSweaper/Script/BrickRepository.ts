interface IRepo {
    tryGetBrick(coordinate: Coordinate, output : Brick): boolean;

}

class BrickRepository implements IRepo{

    width : number;
    height : number;

    constructor(size: BoardSize) {
        this.width = size.boardWidth;
        this.height = size.boardHeight;
    }

    tryGetBrick(coordinate: Coordinate, outputBrick : Brick) {
        return false;
    }


} 