
#ifndef TESTPROJECT1_USER_H
#define TESTPROJECT1_USER_H

class user {
public:

    user() : life(3) {}

    void setLife(int life) {
        this->life = life;
    }
    void decreaseLife() {
        this->life -= 1;
    }
    int getLife();

private:
    int life;
};

#endif //TESTPROJECT1_USER_H
