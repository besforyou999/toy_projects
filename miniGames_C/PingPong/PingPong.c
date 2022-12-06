#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>
#include <Windows.h>
#include <time.h>

#define COL_LIMIT 30
#define HOR_LIMIT 80

#define UP 72
#define DOWN 80

#define RIGHT_UP 1
#define RIGHT_DOWN = 2
#define LEFT_UP = 3
#define LEFT_DOWN 4

typedef struct player {
	int x;
	int y;	
}Player;

typedef struct Ball {
	int x;
	int y;
	int direction;
	int x_speed;
	int y_speed;
}BALL;

void gotoxy(int x, int y);
void CursorView(char show);

void drawPlayer(int x, int y); 
void drawBall(int x, int y);
void drawBox();
int SetBallDirection();
int SetBallXSpeed(int dir);
int SetBallYSpeed(int dir);

Player arrowkey_ascii_return(int input, Player p);
BALL moveBall(BALL b);
int crashCheck(Player p, BALL b);

int control();

int main() {
	return control();
}

int control() {
	
	clock_t CurTime, PrevTime;

	srand((unsigned int)time(NULL));

	Player player;
	player.x = 10, player.y = COL_LIMIT / 2 - 2;
	
	BALL ball;
	ball.x = HOR_LIMIT / 2, ball.y = COL_LIMIT / 2, ball.direction = rand() % 4 + 1;
	ball.x_speed = 2;//SetBallXSpeed(ball.direction);
	ball.y_speed = SetBallYSpeed(ball.direction);

	//init game
	drawBox();
	drawPlayer(player.x, player.y);
	drawBall(ball.x, ball.y);
	CursorView(0);

	gotoxy( HOR_LIMIT / 2 - 10, COL_LIMIT / 2);
	printf("Press any key to start");
	
	while (1) {
		if(kbhit()) 			
			break;
	}

	CurTime = clock();
	PrevTime = clock();

	while (1) {

		int input = NULL;

		if (kbhit()) {
			input = getch();
			//player control
			switch (input) {
			case 224: {
				input = getch();
				Player a = arrowkey_ascii_return(input, player);
				player.x = a.x;
				player.y = a.y;
				break;
			}
			case 'q':
				return 1;
			default:
				break;
			}
		}
		
		CurTime = clock();

		if (CurTime - PrevTime > 100) {

			ball = moveBall(ball);

			system("cls");
			drawPlayer(player.x, player.y);
			drawBall(ball.x, ball.y);
			drawBox();

			PrevTime = clock();
		}

		if (crashCheck(player, ball)) {
			ball.x_speed *= -1;
		}
	}
		
	return 1;
}

void drawPlayer(int x, int y) {

	gotoxy(x,y);
	printf("|");
	gotoxy(x,y+1);
	printf("|");
	gotoxy(x,y+2);
	printf("|");
	gotoxy(x,y+3);
	printf("|");

	return;
}

void drawBox() {

	for(int i=1; i <= HOR_LIMIT ; i++) {
		gotoxy(i, 1);
		printf("-");
	}
	for(int i=1; i <= HOR_LIMIT ; i++) {
		gotoxy(i,COL_LIMIT);
		printf("-");
	}
	for(int i=2; i < COL_LIMIT ; i++) {
		gotoxy(1,i);
		printf("|");
	}
	for(int i=2; i < COL_LIMIT; i++) {
		gotoxy(HOR_LIMIT, i);
		printf("|");
	}

	return;
}

void drawBall(int x, int y) {

	gotoxy(x, y);
	printf("@");

	return;
}

int SetBallXSpeed(int dir) {
	
	int speed = rand() % 3 + 1;

	if (dir == 1 || dir == 2) {
		return speed;
	}
	else {
		return speed *= -1;
	}
}

int SetBallYSpeed(int dir) {

	int speed = rand() % 3 + 1;

	if (dir == 2 || dir == 4) {
		return speed;
	}
	else {
		return speed *= -1;
	}
}

void gotoxy(int x, int y) {
	COORD pos = { x, y };
	SetConsoleCursorPosition( GetStdHandle(STD_OUTPUT_HANDLE), pos);
}

void CursorView(char show) {
	HANDLE hConsole;
	CONSOLE_CURSOR_INFO ConsoleCursor;
	hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
	ConsoleCursor.bVisible = show;
	ConsoleCursor.dwSize = 1;
	SetConsoleCursorInfo(hConsole, &ConsoleCursor);
}

BALL moveBall(BALL b) {

	if (b.y < 4) {
		b.y_speed *= -1;
	}
	else if (b.x > 76) {		
		b.x_speed *= -1;		
	}
	else if (b.y > 26) {
		b.y_speed *= -1;	
	}
	else if (b.x < 4) {
		exit(0);
		//b.x_speed *= -1;	
	}

	b.x += b.x_speed;
	b.y += b.y_speed;

	return b;
}

Player arrowkey_ascii_return(int input, Player p) {
	
	Player a;
	a.x = p.x;
	a.y = p.y;

	switch (input) {
		
		case UP: {
			if (a.y > 3) {
				a.y -= 2;
			}
			break;
		}
		case DOWN: {
			if (a.y < COL_LIMIT - 5) {
				a.y += 2;
			}
			break;
		}
	}

	return a;
}


int crashCheck(Player p, BALL b) {
	
	if ( ((p.x - 2 <= b.x)&&(p.x + 2 >= b.x)) ) {
		if (b.y >= p.y -1 && b.y <= p.y + 3) {		
			return 1;
		}
	}
	else {
		return 0;
	}
}
