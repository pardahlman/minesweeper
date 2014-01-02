interface IRepo {
    containsBrickAt(coordinate: Coordinate): boolean;
    getBrick(coordinate: Coordinate): Brick;
    getAllBricks() : Array<Brick>;
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

    public removeAllBricks(): void {

        this._bricks = new Array<Array<Brick>>();
    }

    public containsBrickAt(coordinate: Coordinate) : boolean {

        if (coordinate.x < 0 || this.width < coordinate.x) {
            return false;
        }

        if (coordinate.y < 0 || this.height < coordinate.y) {
            return false;
        }

        return true;
    }

    public getBrick(coordinate: Coordinate): Brick {
        if (!this.containsBrickAt(coordinate)) {
            return undefined; 
        }

        return this._bricks[coordinate.x][coordinate.y];
    }
    
    public getRandomBrick(): Brick {
        var yIndex = Math.round(Math.random() * (this.width -1));
        var xIndex = Math.round(Math.random() * (this.height -1));

        return this.getBrick({x: xIndex, y: yIndex});
    }

    public getAllBricks(): Array<Brick> {
        var allBricks = new Array<Brick>();
        this._bricks.forEach(column=> allBricks = allBricks.concat(column));
        return allBricks;
    }


} 