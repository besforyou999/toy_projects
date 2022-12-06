#define _CRT_SECURE_NO_WARNINGS
#define GAME_MAX_WIDTH 56
#include<stdio.h>
#include<time.h>
#include<conio.h>
#include"object_data.h"
#include"Screen.h"
#include"fps.h"


int score = 0;

FPSData* fpsData;
Player g_Player;
Ball g_Ball;
GoalPost g_Post;

void Init()
{
    InitFPSData(&fpsData);

    g_Player.position.y = 30;
    g_Player.position.x = 28;

    g_Player.center.x = 2;
    g_Player.center.y = 0;

    g_Player.nLength = strlen(PLAYER_STR);  

    g_Player.strPlayer = (char*)malloc( sizeof(char) * g_Player.nLength );
    strcpy(g_Player.strPlayer, PLAYER_STR);

    //ball init
    g_Ball.isReady = 1;
    g_Ball.position.x = g_Player.position.x+2;
    g_Ball.position.y = g_Player.position.y - 1;
    g_Ball.moveTime = 100;

    //Goal-Post init
    g_Post.position.x = 20;
    g_Post.position.y = 6;
    g_Post.nLength = 1;
    g_Post.moveTime = 100;
    g_Post.oldTime = clock();
    g_Post.nDist = 1;

    int nLength = g_Post.nLength * 2 + 1;
    for (int i = 0; i < nLength; i++)
    {
        g_Post.nLineX[i] = g_Post.position.x + 2 * (i + 1);
    }
}

void ResetBall()
{
    g_Ball.isReady = 1;
    g_Ball.position.x = g_Player.position.x+2;
    g_Ball.position.y = g_Player.position.y - 1;
}


void Update()
{
    /***                       Ball movement                            ***/
    clock_t CurTime = clock();
    if (g_Ball.isReady == 0)
    {
        if ((CurTime - g_Ball.oldTime) > g_Ball.moveTime)
        {
            if (g_Ball.position.y > 0)
            {
                g_Ball.position.y--;
                g_Ball.oldTime = CurTime;

                
                if (g_Ball.position.x >= g_Post.nLineX[0] && g_Ball.position.x + 1 <= g_Post.nLineX[g_Post.nLength - 1])
                {
                    if (g_Ball.position.y <= g_Post.position.y)
                    {
                        score++;
                        ResetBall();
                    }
                }
                else if ((g_Ball.position.x >= g_Post.nLineX[0] - 2 && g_Ball.position.x <= g_Post.nLineX[0] - 1) ||
                    (g_Ball.position.x + 1 >= g_Post.nLineX[0] - 2 && g_Ball.position.x + 1 <= g_Post.nLineX[0] - 1) ||
                    (g_Ball.position.x >= g_Post.nLineX[g_Post.nLength - 1] + 2 && g_Ball.position.x <= g_Post.nLineX[g_Post.nLength - 1] + 3) ||
                    (g_Ball.position.x + 1 >= g_Post.nLineX[g_Post.nLength - 1] + 2 && g_Ball.position.x + 1 <= g_Post.nLineX[g_Post.nLength - 1] + 3))
                {
                    if (g_Ball.position.y <= g_Post.position.y)
                    {
                        score++;
                        ResetBall();
                    }
                }

            }
            else
            {
                g_Ball.isReady = 1;
                g_Ball.position.x = g_Player.position.x+2;
                g_Ball.position.y = g_Player.position.y - 1;
            }

        }
    }


    /***                        Goal Post                               ***/
    clock_t CurTime2 = clock();
    if (CurTime2 - g_Post.oldTime > g_Post.moveTime)
    {
        int nLength = g_Post.nLength * 2 + 1;
        g_Post.oldTime = CurTime2;
        if (g_Post.position.x + g_Post.nDist >= 0 && ((g_Post.nLineX[nLength - 1] + 3) + g_Post.nDist) <= GAME_MAX_WIDTH)
        {
            g_Post.position.x += g_Post.nDist;
            for (int i = 0; i < nLength; i++)
            {
                g_Post.nLineX[i] = g_Post.position.x + 2 * (i + 1);
            }
        }
        else
        {
            g_Post.nDist *= (-1);
        }
    }

}

void Render()
{
    ScreenClear();


    //FPS
    DrawFPS(&fpsData);


    //character
    char string[100];
    int printX = g_Player.position.x + g_Player.center.x;     
    
    if (g_Player.position.x <= -1) {
        g_Player.position.x++;
        ScreenPrint(0, g_Player.position.y, g_Player.strPlayer);        
    }
    else if (g_Player.position.x >= 56) {
        g_Player.position.x--;
        ScreenPrint(g_Player.position.x, g_Player.position.y, g_Player.strPlayer);
    }
    else {
        ScreenPrint(g_Player.position.x, g_Player.position.y, g_Player.strPlayer );
    }
    


    //character coordinates
    sprintf(string, "주인공 이동좌표 : %d, %d", printX, g_Player.position.y);
    ScreenPrint(0, 3, string);




    //Ball
    ScreenPrint(g_Ball.position.x, g_Ball.position.y, "@");



    //Goal Post
    ScreenPrint(g_Post.position.x, g_Post.position.y, "|");
    int nLength = g_Post.nLength * 2 + 1;
    for (int i = 0; i < nLength; i++)
        ScreenPrint(g_Post.nLineX[i], g_Post.position.y, "-");
    ScreenPrint(g_Post.nLineX[nLength - 1] + 2, g_Post.position.y, "|");


    char string2[100];
    sprintf(string2, "Score: %d", score);
    ScreenPrint(0, 2, string2);


    ScreenFlipping();
}

void Release()
{
    DestroyFPSData(&fpsData);
}

void WaitRender(clock_t OldTime)
{
    clock_t CurTime;
    while (1)
    {
        CurTime = clock();
        if (CurTime - OldTime > 33)
            break;
    }
}

int GetKeyEvent()
{
    if (_kbhit())
        return _getch();

    return -1;
}

void KeyProcess(int Key)
{
  
    switch (Key)
    {
        case 'j': {
            g_Player.position.x--;
            if (g_Ball.isReady)
            {
                g_Ball.position.x = g_Player.position.x+2;
                g_Ball.position.y = g_Player.position.y - 1;
            }
            break;
        }    
        case 'l': {
            g_Player.position.x++;
            if (g_Ball.isReady)
            {
                g_Ball.position.x = g_Player.position.x+2;
                g_Ball.position.y = g_Player.position.y - 1;
            }
            break;
        }
        case 'k': {
            if (g_Ball.isReady)
            {
                g_Ball.position.x = g_Player.position.x+2;
                g_Ball.position.y = g_Player.position.y - 1;
                g_Ball.oldTime = clock();
                g_Ball.isReady = 0;
            }
            break;
        }


    }
}



int main()
{
    ScreenInit();
    Init();//초기화

    while (1)
    {
        int nKey = GetKeyEvent();
        if (nKey == 'q')
            break;
        KeyProcess(nKey);

        Update();//데이터 갱신

        Render();//화면 출력
        WaitRender(clock());

    }

    Release();//해제
    ScreenRelease();
    return 0;
}


