export default class CanvasElement {
    #canvas
    #context2D
    constructor() {
        this.#canvas = document.createElement('canvas'); // Creating DOM Node
        this.#context2D = this.#canvas.getContext('2d');
        document.body.appendChild(this.#canvas);
    }

    get2Dcontext(){
        return this.#context2D;
    }

    setHeight(heightVal) {
        this.#canvas.height = heightVal;
    }

    setWidth(widthVal) {
        this.#canvas.width = widthVal;
    }

    getHeight(){
        return this.#canvas.height;
    }

    getWidth(){
        return this.#canvas.width;
    }

    fullScreen() {
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
    }

    getFullImageData() {
        return this.#context2D.getImageData(0, 0, this.#canvas.width, this.#canvas.height)
    }

    drawImageData(imageFrame) {
        this.#context2D.putImageData(imageFrame);
    }

}
