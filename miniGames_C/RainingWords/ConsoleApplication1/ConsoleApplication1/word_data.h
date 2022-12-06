#ifndef _WORDDATA_H_
#define _WORDDATA_H_

#define WORDS_SIZE 50

#include <vector>
#include <string>

using std::string;
using std::vector;

const string names[] = { "One", "Two" ,"Three" ,"Four" ,"Five" , "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
"Fourteen", "Fifteen" , "Sixteen", "Seventeen", "Eightteen" , "Nineteen","Twenty","Twenty one", "Twenty two", "Twenty three","Twenty four",
"Twenty five", "Twenty six","Twenty seven", "Twenty eight", "Twenty nine", "Thirty", "Thirty one","Thirty two", "Thirty three", "Thirty four",
 "Thirty five", "Thirty six", "Thirty seven", "Thirty eight", "Thirty nine", "Fourty", "Fourty one", "Fourty two", "Fourty three", "Fourty four",
 "Fourty five", "Fourty six", "Fourty seven", "Fourty eight", "Fourty nine" };

class word_data
{
public:

    word_data() : occupation(WORDS_SIZE, 0), words(WORDS_SIZE), occupation_counter(0) {       
        for (int i = 0; i < WORDS_SIZE; i++) {
            words[i] = names[i];
        }
    };

    string getWordAtIndex(int i);
    int getOccupationAtIndex(int i);
    int getOccupationCounter() {
        return this->occupation_counter;
    }

    void setOccupationCounter(int num) {
        this->occupation_counter += num;
    }
    void setOccupationAtIndex(int index, int i);
    void setWordAtIndex(int i, string s);


private:
    int occupation_counter;
    vector<int> occupation;
    vector<string> words;
};

#endif