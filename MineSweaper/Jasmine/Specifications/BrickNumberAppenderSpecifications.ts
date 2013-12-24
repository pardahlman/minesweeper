/// <reference path="../../Script/BrickFlipper.ts"/>
/// <reference path="../../Script/BrickRepository.ts"/>

describe("The 'BrickNumberAppender'", () => {
    var brick: Brick,
        appender: BrickNumberAppender;

    beforeEach(()=> {
        brick = new Brick();
        appender = new BrickNumberAppender();
    });

    it("Should set 'numberOfNormalNeighbours' to zero if no neighours'", () => {
        /* Setup */
        brick.adjacentBricks = new Array<Brick>();

        /* Test */
        appender.append(brick);

        /* Assert */
        expect(brick.numberOfNormalNeighbours).toEqual(0);
    });

    it("Should set 'numberOfNormalNeighbours' to zero if all neighbours are bombs", ()=> {
        /* Setup */
        var bomb = new Brick();
        bomb.type = BrickType.Bomb;

        brick.adjacentBricks.push(bomb);
        brick.adjacentBricks.push(bomb);
        brick.adjacentBricks.push(bomb);

        /* Test */
        appender.append(brick);

        /* Assert */
        expect(brick.numberOfNormalNeighbours).toEqual(0);
    });

    it("Should return correct amount when neighbours are both bombs and normal bricks", () => {
        /* Setup */
        var bomb = new Brick();
        bomb.type = BrickType.Bomb;

        var normal = new Brick();
        normal.type = BrickType.Normal;

        brick.adjacentBricks.push(bomb);
        brick.adjacentBricks.push(normal);
        brick.adjacentBricks.push(normal);

        /* Test */
        appender.append(brick);

        /* Assert */
        expect(brick.numberOfNormalNeighbours).toEqual(2);
    });
});