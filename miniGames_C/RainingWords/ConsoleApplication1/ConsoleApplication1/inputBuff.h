#ifndef _INPUT_BUFF_H_
#define _INPUT_BUFF_H_

#include "goto.h"
#include "background.h"

#include <string>
using std::string;

class inputBuff {

	public :

		string getInputFromUser() {
			return this->input_from_user;
		}

		void clearPrintedStringFromPrompt();

		void printInputFromUser() {
			gotoxy(HORIZONTAL_LENGTH / 2 - 4, VERTICAL_LENGTH - 1);
			std::cout << this->input_from_user;
		}

		void setInputFromUser(string s) {
			this->input_from_user = s;
		}

		void PushBackCharToInputFromUser(char pb) {
			this->input_from_user.push_back(pb);
		}

		void PopBackInputFromUser() {
			if( !this->input_from_user.empty() ) this->input_from_user.pop_back();
		}

		void resetInputFromUser() {
			this->input_from_user.clear();
		}

	private:
		string input_from_user;

};


#endif
