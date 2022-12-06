char PLAYER_STR[] = "--*--";
typedef struct Position
{
    int x, y;
}Position;

typedef struct
{
    Position position;
    Position center;
    char* strPlayer;
    int nLength;
}Player;

typedef struct Ball
{
    int isReady;
    Position position;
    clock_t moveTime;
    clock_t oldTime;
}Ball;

typedef struct GoalPost
{
    Position position;
    int nLength;
    int nLineX[7];
    int nDist;
    clock_t moveTime;
    clock_t oldTime;
}GoalPost;
