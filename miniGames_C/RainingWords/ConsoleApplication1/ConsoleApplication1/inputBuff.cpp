#include "inputBuff.h"

void inputBuff::clearPrintedStringFromPrompt() {

	gotoxy(HORIZONTAL_LENGTH / 2 - 4, VERTICAL_LENGTH - 1);

	for (int i = 0; i < this->input_from_user.size(); i++) {
		std::cout << " ";
	}
	
}