interface IRepo {
    containsBrickAt(coordinate: Coordinate, output : Brick): boolean;

}

class BrickRepository implements IRepo{

    width : number;
    height: number;
    
    private _bricks : Array<Array<Brick>>;

    constructor(size: BoardSize) {
        this.width = size.boardWidth;
        this.height = size.boardHeight;

        this._bricks = new Array<Array<Brick>>();

        for (var currentColumnIndex = 0; currentColumnIndex < this.height; currentColumnIndex++) {
            var currentColumn = new Array<Brick>();
            this._bricks.push(currentColumn);
            for (var currentRowIndex = 0; currentRowIndex < this.width; currentRowIndex++) {
                currentColumn.push(new Brick(currentRowIndex, currentColumnIndex));
            }    
        }
    }

    containsBrickAt(coordinate: Coordinate) : boolean {

        if (coordinate.x < 0 || this.width < coordinate.x) {
            return false;
        }

        if (coordinate.y < 0 || this.height < coordinate.y) {
            return false;
        }

        return true;
    }

    getBrick(coordinate: Coordinate): Brick {
        if (!this.containsBrickAt(coordinate)) {
            return undefined; 
        }

        return this._bricks[coordinate.x][coordinate.y];
    }


} 