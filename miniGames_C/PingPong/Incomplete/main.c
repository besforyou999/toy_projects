#include <stdio.h>
#include <ncurses.h>
#include <stdlib.h>
#include <unistd.h>
#include <malloc.h>
#include "linux_kbhit.h"

#define COL_LIMIT 30
#define HOR_LIMIT 80
#define BALL_SPEED 3

typedef struct Ball {
	int x;
	int y;
	int direction;
}BALL;

void printPlayer(int y, int x);
void drawBox();
void drawBall(int y, int x);
void mod_ball_position(BALL * b);
int control();

int main() {
	return control();
}

int control() {
	
	int row  = 3, col = COL_LIMIT / 2 - 2 ;
	int e_posx = HOR_LIMIT - 2, e_posy = COL_LIMIT / 2 - 2;

	BALL *ball=malloc( sizeof(BALL) );	
	(*ball).x = HOR_LIMIT / 2 , (*ball).y = COL_LIMIT / 2;
	(*ball).direction = 0;	

	//init curses
	initscr();

	noecho();

	curs_set(FALSE);

	keypad(stdscr, TRUE);

	//init game
	drawBox();
	printPlayer(col, row);
	printPlayer(e_posy,e_posx);
	drawBall((*ball).y,(*ball).x);

	mvprintw(COL_LIMIT / 2, HOR_LIMIT / 2 - 10 ,"Press any key to start");
	
	int counter=0;

	while(1) {	
	
		int input = getch();
		clear();
		move(25,25);
		printw("%d",counter);

		//player control
		switch(input) {

			case KEY_UP:
			--col;
			break;
			case KEY_DOWN:
			++col;
			break;
			case 'q':
			break;
			default:
			break;
		}

		if(input == 'q') break;
	
		if(col > COL_LIMIT - 5 ) col = COL_LIMIT - 5;
		if(col < 3 ) col = 3; 
		
		// ball movement
		mod_ball_position(ball);
	
		drawBox();
		printPlayer(col,row);
		printPlayer(e_posy, e_posx);
		drawBall((*ball).y,(*ball).x);


		counter++;
	}

	endwin();

	free(ball);
	return 1;
}


void printPlayer(int y, int x) {

	if( y < COL_LIMIT - 5) {

		move(y,x);
		printw("|");
		move(y+1,x);
		printw("|");
		move(y+2,x);
		printw("|");
		move(y+3,x);
		printw("|");
	} else {

		y=COL_LIMIT - 5;
		move(y,x);
		printw("|");
		move(y+1,x);
		printw("|");
		move(y+2,x);
		printw("|");
		move(y+3,x);
		printw("|");
	}

	return;
}


void drawBox() {

	for(int i=1; i <= HOR_LIMIT ; i++) {
		mvprintw(1,i,"-");
	}
	for(int i=1; i <= HOR_LIMIT ; i++) {
		mvprintw(COL_LIMIT , i, "-");
	}
	for(int i=2; i < COL_LIMIT ; i++) {
		mvprintw(i,1,"|");
	}
	for(int i=2; i < COL_LIMIT; i++) {
		mvprintw(i,HOR_LIMIT,"|");
	}

	return;
}


void drawBall(int y, int x) {

	mvprintw(y, x,"@");

	return;
}

void mod_ball_position(BALL *b) {

	if( (*b).x < 3 && (*b).direction == 1 ) {
			(*b).direction = 0;
	} 
	else if( (*b).x > 75 && (*b).direction == 0 ) {
			(*b).direction = 1;
	}


	if ( (*b).direction == 0 ) {
			(*b).x += 1;

	} else if ( (*b).direction == 1 ) {
			(*b).x -= 1;
	}

	return;
}






