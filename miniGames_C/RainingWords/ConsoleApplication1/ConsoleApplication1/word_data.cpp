#include "word_data.h"

string word_data::getWordAtIndex(int i) {
    return words[i];
}

int word_data::getOccupationAtIndex(int i) {
    return occupation[i];
}

void word_data::setWordAtIndex(int i, string s) {

    if (i > WORDS_SIZE - 1) {
        return;
    }

    words[i] = s;

    return;
}

void word_data::setOccupationAtIndex(int index, int i) {

    if (i != 1 && i != 0)
        return;

    occupation[index] = i;

    return;
}
