export default class Pixel {
    #r;
    #g;
    #b;
    #a = 1;
    #x;
    #y;
    #context;
    constructor(context, { r, g, b, a }, x, y) {
        this.#r = isNaN(Number(r)) ? 0 : Number(r);
        this.#g = isNaN(Number(g)) ? 0 : Number(g);
        this.#b = isNaN(Number(b)) ? 0 : Number(b);
        this.#a = isNaN(Number(a)) ? 1 : Number(a);
        this.#x = isNaN(Number(x)) ? 0 : Number(x);
        this.#y = isNaN(Number(y)) ? 0 : Number(y);
        this.#context = context;
    }

    setPosition(x, y) {
        this.#x = x;
        this.#y = y;
    }



    set x(newXVal) {
        this.#x = newXVal;
    }

    set y(newYVal) {
        this.#y = newYVal;
    }

    set r(newRedVal) {
        this.#r = newRedVal;
    }

    get r() {
        return this.#r;
    }

    set g(newGreenVal) {
        this.#g = newGreenVal;
    }

    get g() {
        return this.#g;
    }

    set b(newBlueVal) {
        this.#b = newBlueVal;
    }

    get b() {
        return this.#b;
    }

    set a(newAlphaVal) {
        this.#a = newAlphaVal;
    }

    get a() {
        return this.#a;
    }

    draw() {
        const prevFillStyle = this.#context.fillStyle;
        this.#context.fillStyle = `rgba(${this.#r},${this.#g},${this.#b},${this.#a})`;
        this.#context.fillRect(this.#x, this.#y, 1, 1);
        this.#context.fillStyle = prevFillStyle;
    }
}
