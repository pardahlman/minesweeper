/// <reference path="../../Librarys/typings/underscore/underscore.d.ts"/>
class GameSetupHelper {
    public static createBricks(size: BoardSize): Array<Array<Brick>> {

        var bricks = new Array<Array<Brick>>();

        for (var columnIndex = 0; columnIndex < size.boardWidth; columnIndex++) {
            var currentColumn = new Array<Brick>();
            bricks.push(currentColumn);
            for (var rowIndex = 0; rowIndex < size.boardHeight; rowIndex++) {
                currentColumn.push(new Brick(columnIndex,rowIndex));
            }
        }

        return bricks;
    }

    public static setBrickRelations(bricks: Array<Array<Brick>>) {
        var flatList = new Array<Brick>();
        bricks.forEach(row=>
            row.forEach(brick=>
                flatList.push(brick)
                )
            );

        var minX = 0;
        var minY = 0;
        var maxX = bricks.length - 1 ;
        var maxY = bricks[0].length - 1;

        for (var i = 0; i < flatList.length; i++) {
            var currentBrick = flatList[i];

            var potentialXCoordinates = [currentBrick.coordinate.x - 1, currentBrick.coordinate.x, currentBrick.coordinate.x + 1];
            var potentialYCoordinates = [currentBrick.coordinate.y - 1, currentBrick.coordinate.y, currentBrick.coordinate.y + 1];

            _.forEach(potentialXCoordinates, xCoordinate=> {

                if (xCoordinate < minX || maxX < xCoordinate) {
                    // The x coordinate is out of bound
                    console.log("Bailing out on x " + xCoordinate);
                    return;
                }

                _.forEach(potentialYCoordinates, yCoordinate=> {
                    if (yCoordinate < minY || maxY < yCoordinate) {
                        // The y coordinate are out of bound
                        console.log("Bailing out on y " + yCoordinate);
                        return;
                    }

                    if (yCoordinate == currentBrick.coordinate.y && xCoordinate == currentBrick.coordinate.x) {
                        // These coordinates are for the current brick
                        return;
                    }

                    var neighbour = bricks[xCoordinate][yCoordinate];
                    currentBrick.adjacentBricks.push(neighbour);
                    
                });
            });

        }
    }

    public static setNeighbourCountFor(brick: Brick): void {
        var neighbourCount = brick.adjacentBricks
            .filter(b => b.type == BrickType.Normal)
            .length;

        brick.numberOfNormalNeighbours = neighbourCount;
    }

    public static getNumberOfBombs(settings: GameSettings): number {
        var numberOfBricks = settings.size.boardHeight * settings.size.boardWidth;
        var gameLevelFactor: number;

        switch (settings.level) {
            case GameLevel.Easy:
                gameLevelFactor = 0.1;
                break;
            case GameLevel.Medium:
                gameLevelFactor = 0.3;
                break;
            case GameLevel.Hard:
                gameLevelFactor = 0.4;
                break;
            default:
                gameLevelFactor = 0.1;
                break;
        }

        return Math.round(numberOfBricks * gameLevelFactor);
    }

    public static addBombs(bricks: Array<Array<Brick>>, numberOfBombs: number): void {
        if (bricks == undefined) {
            throw new Error();
        }

        var totalNumberOfBricks = bricks.length * bricks[0].length;

        if (numberOfBombs < 0 || totalNumberOfBricks < numberOfBombs) {
            throw new Error("Cannot create bombs, number of desired bombs is to big or small.");
        }

        var flatList = new Array <Brick>();
        bricks.forEach(row=>
            row.forEach(brick=>
                flatList.push(brick)
            )
        );

        flatList.shuffle();
        
        var bombList = flatList.slice(0, numberOfBombs);
        bombList.forEach(bomb=>
            bomb.type = BrickType.Bomb
        );

        
    }
  
    
}

