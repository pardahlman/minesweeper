class GameSettings {
    level: GameLevel;
    size : BoardSize;
} 

enum GameLevel {
    Easy,
    Medium,
    Hard
} 

interface BoardSize {
    boardWidth: number;
    boardHeight: number;
    percentageOfBombs?: number;
} 