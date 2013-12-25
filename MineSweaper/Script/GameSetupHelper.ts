class GameSetupHelper {
    public static createBricks(size: BoardSize): Array<Array<Brick>> {

        var bricks = new Array<Array<Brick>>();

        for (var columnIndex = 0; columnIndex < size.boardWidth; columnIndex++) {
            var currentColumn = new Array<Brick>();
            bricks.push(currentColumn);
            for (var rowIndex = 0; rowIndex < size.boardHeight; rowIndex++) {
                currentColumn.push(new Brick(rowIndex, columnIndex));
            }
        }

        return bricks;
    }
} 