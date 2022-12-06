#include "background.h"
#include "goto.h"

void background::drawBackground() {

	for (int i = 0; i <= HORIZONTAL_LENGTH; i++) {
		gotoxy(i, 0);
		std::cout<<'_';
		gotoxy(i, VERTICAL_LENGTH);
		std::cout << '_';
	}

	for (int i = 0; i < VERTICAL_LENGTH; i++) {
		gotoxy(0, i+1);
		std::cout << '|';
		gotoxy(HORIZONTAL_LENGTH, i+1);
		std::cout << '|';
	}

	return;
}

void background::clearBackground() {
	system("cls");
}