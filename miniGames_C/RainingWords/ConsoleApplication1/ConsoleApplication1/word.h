#ifndef _WORD_H_
#define _WORD_H_

#include <iostream>
#include <string>
#include "goto.h"


using std::string;


class word
{
public:
    word() {
        this->name = "";
        this->x = x;
        this->y = y;       
    };

    word(int x, int y) {
        this->name = "";
        this->x = x;
        this->y = y;       
    };

    word(int x, int y, string name) {
        this->name = name;
        this->x = x;
        this->y = y;
    };

    word(int x, int y, string name, int index) {
        this->name = name;
        this->x = x;
        this->y = y;
        this->index = index;
    };

    void operator=(const word& p);

    int getIndex();
    int getPosX();
    int getPosY();
    string getName();

    void setIndex(int i);
    void setPosX(int x);
    void setPosY(int y);
    void setName(string newName);

    void clearNameFromConsole();

private:   
    int index;
    int x;
    int y;
    string name;
};

#endif
