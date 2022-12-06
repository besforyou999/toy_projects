#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>
#include <Windows.h>
#include <time.h>

#define COL_LIMIT 30
#define HOR_LIMIT 80
#define LEFT 75
#define RIGHT 77
#define UP 72
#define DOWN 80

typedef struct player {
	int x;
	int y;	
}Player;

void gotoxy(int x, int y);
void CursorView(char show);

void drawPlayer(int x, int y); 
void drawBox();
void drawFly(int x, int y);

Player arrowkey_ascii_return(int input, Player p);
Player fly_move(Player f);
int crashCheck(Player p, Player f);
int control();

int main() {
	return control();
}

int control() {
	
	clock_t CurrentTime, PreviousTime;

	Player player;
	player.x = HOR_LIMIT / 4, player.y = COL_LIMIT / 2;

	srand((unsigned int)time(NULL));

	Player fly;
	fly.x = rand() % (HOR_LIMIT / 2) + ( (HOR_LIMIT / 2));
	fly.y = rand() % (COL_LIMIT - 2) + 1;

	//init game
	drawBox();
	drawPlayer(player.x, player.y);
	drawFly(fly.x, fly.y);

	CursorView(0);

	gotoxy(HOR_LIMIT / 2 - 10, COL_LIMIT / 2);
	printf("Press any key to start");
	
	int input;

	while (1) {
		if(kbhit()) {
			input = getch();
			break;
		}
	}

	CurrentTime = clock();
	PreviousTime = clock();
	
	while(1) {
		
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
					break;
				default:
					break;
			}
		}

		if(input == 'q' || crashCheck(player, fly) )
			break;
		
		input = NULL;

		CurrentTime = clock();

		if (CurrentTime - PreviousTime > 300000) {
			//change fly position
			//fly = fly_move(fly);

			PreviousTime = clock();
		}

		system("cls");
		drawPlayer(player.x, player.y);
		drawBox();
		drawFly(fly.x, fly.y);
		
	}
		
	return 1;
}


void drawPlayer(int x, int y) {

	gotoxy(x, y);
	printf("@");

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


void drawFly(int x, int y) {

	gotoxy(x, y);
	printf("*");

	return;
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

Player fly_move(Player f) {
	
	Player a = f;
	
	int key = rand() % 4;

	switch (key) {
		case 0 : {
			if (a.x > 2) {
				a.x -= 1;
			}
			break;
		}
		case 1: {
			if (a.x < HOR_LIMIT - 2) {
				a.x += 1;
			}
			break;
		}
		case 2: {
			if (a.y > 2) {
				a.y -= 1;
			}
			break;
		}
		case 3: {
			if (a.y < COL_LIMIT - 1) {
				a.y += 1;
			}
			break;
		}
	}

	return a;
}

Player arrowkey_ascii_return(int input, Player p) {
	
	Player a;
	a.x = p.x;
	a.y = p.y;

	switch (input) {
		case LEFT: {
			if (a.x > 2) {
				a.x -= 1;
			}
			break;
		}
		case RIGHT: {
			if (a.x < HOR_LIMIT - 2) {
				a.x += 1;
			}
			break;
		}
		case UP: {
			if (a.y > 2) {
				a.y -= 1;
			}
			break;
		}
		case DOWN: {
			if (a.y < COL_LIMIT - 1) {
				a.y += 1;
			}
			break;
		}
	}

	return a;
}

int crashCheck(Player p, Player f) {
	if ((p.x == f.x) && (p.y == f.y)) {
		return 1;
	}
	else
		return 0;
}