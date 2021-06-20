export default class Position {
    #x = 0
    #y = 0
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    setPosition(x, y) {
        this.#x = x;
        this.#y = y;
    }



    set x(newXVal) {
        this.#x = newXVal;
    }

    get x() {
        return this.#x;
    }

    set y(newYVal) {
        this.#y = newYVal;
    }

    get y() {
        return this.#y;
    }
    

}
