#include <string>
#include <ctime>
#include <cstdlib>
#include <conio.h>
#include "word.h"
#include "user.h"
#include "word_data.h"
#include "background.h"
#include "goto.h"
#include "inputBuff.h"
#include "consoleInit.h"

#define WORD_FALLING_SPEED 2    //speed bigger == slowwer
#define WORD_CREATION_SPEED 2   // speed bigger == slowwer

int main() {

    //fix console size
    CursorView(false);
    ConsoleFix();

    inputBuff IB;
    word_data wd;
    vector<word> words;
    user user1;   

    background bground;
    bground.clearBackground();
    bground.drawBackground();

    clock_t CurTime, PrevTime, PrevTime2;

    srand((unsigned int)time(nullptr));

    PrevTime2 = PrevTime = CurTime = clock();

    char key;

    while (true) {
        
        gotoxy(HORIZONTAL_LENGTH / 2 - 4, VERTICAL_LENGTH + 2);
        std::cout << "Life : " << user1.getLife();

        // moving words 
        if ((CurTime - PrevTime2) / CLOCKS_PER_SEC >= 1) {                    

            //printing all words in word vector "words"
            for (int i = 0; i < words.size(); i++) {
               
                words[i].clearNameFromConsole();
                words[i].setPosY(words[i].getPosY() + WORD_FALLING_SPEED);
                gotoxy(words[i].getPosX(), words[i].getPosY());
                std::cout << words[i].getName();
                
            }

            PrevTime2 = clock();
        }

        // word creation
        if( (CurTime - PrevTime) / CLOCKS_PER_SEC >= WORD_CREATION_SPEED) {
        //if (CurTime - PrevTime >= 100) {

            int index;
            // picking a random index that is not currently used          
            do {
                index = rand() % WORDS_SIZE;
            } while (wd.getOccupationAtIndex(index) == 1 && wd.getOccupationCounter() != WORDS_SIZE);

            // index selected -> extracting word from word_data and make a 'word' object            
            if (wd.getOccupationAtIndex(index) == 0) {

                string temp = wd.getWordAtIndex(index);                
                wd.setOccupationAtIndex(index, 1);  
                wd.setOccupationCounter(1);
                
                int x = (rand() % (HORIZONTAL_LENGTH-13)) + 1 ;
                word newWord(x, 1, temp, index);
                words.push_back(newWord);
            }

            PrevTime = clock();
        }

        // input control , press 'esc' to quit
        if (_kbhit()) {

            key = _getch();

            if (key >= 32 && key <= 126) {
                IB.PushBackCharToInputFromUser(key);
                IB.printInputFromUser();
            }
            else if ( key == 27) {    //ESC
                break;
            }
            else if ( key == 8 ) {  //BACKSPACE                
                IB.clearPrintedStringFromPrompt();
                IB.PopBackInputFromUser();
                IB.printInputFromUser();
            }
            else if (key == 13) {   // ENTER
                IB.clearPrintedStringFromPrompt();
                string find = IB.getInputFromUser();

                int found = 0;
                int i, at_index;

                for (i = 0; i < words.size(); i++) {
                    if (find == words[i].getName()) {
                        found = 1;
                        at_index = words[i].getIndex();
                        break;
                    }
                }

                if( found == 1 ) {
                    words[i].clearNameFromConsole();                    
                                        
                    words[i] = words.back();
                    words.pop_back();

                    wd.setOccupationAtIndex(at_index, 0);
                    wd.setOccupationCounter(-1);                         
                }

                IB.resetInputFromUser();
            }

        }

        //checking if any word is below VERTICAL_LENGTH
        for (int i = 0; i < words.size(); i++) {

            if (words[i].getPosY() >= VERTICAL_LENGTH - 2) {
                wd.setOccupationAtIndex(words[i].getIndex(), 0);
                wd.setOccupationCounter(-1);
                words[i].clearNameFromConsole();
                words[i] = words.back();
                words.pop_back();
                
                user1.decreaseLife();                
            }

        }

        if (user1.getLife() == 0)
            break;


        CurTime = clock();
    }

    return 0;
}
