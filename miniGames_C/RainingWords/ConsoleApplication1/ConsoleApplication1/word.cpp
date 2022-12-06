#include "word.h"

int word::getIndex() {
    return this->index;
}

int word::getPosX() {
    return this->x;
}

int word::getPosY() {
    return this->y;
}

string word::getName() {
    return this->name;
}

void word::setIndex(int i) {
    this->index = i;
}

void word::setPosX(int x) {
    this->x = x;
}

void word::setPosY(int y) {
    this->y = y;
}

void word::setName(string newName) {
    this->name = newName;
}

void word::operator=(const word& p) {
    this->x = p.x;
    this->y = p.y;
    this->name = p.name;
    this->index = p.index;
}

void word::clearNameFromConsole() {

    gotoxy(this->x, this->y);

    for (int i = 0; i < name.size(); i++) {
        std::cout << ' ';
    }


}