import Pixel from '/pixel.js';

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default class Filler extends Pixel {
    #xLimit
    #yLimit
    #context
    #shouldStop = false;
    #frame = [];
    constructor(context, x, y, limitX, limitY) {
        super(context,{ r: 0, g: 0, b: 0 }, x, y);
        this.#xLimit = Number(limitX) || Number(context.canvas.width);
        this.#yLimit = Number(limitY) || Number(context.canvas.height);
        this.#context = context;
        window.addEventListener('click', () => { this.#shouldStop = !this.#shouldStop });
    }
    
    #getRandomColor() {
        const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
        return ({
            r: randomBetween(0,255),
            g: randomBetween(0,255),
            b: randomBetween(0,255),
            a: randomBetween(0,255)
        });
    }

    #setRandomColor(){
        const randomColor = this.#getRandomColor();
        this.r = randomColor.r;
        this.g = randomColor.g;
        this.b = randomColor.b;
    }

    async fillWithSquares(boxSize) {
        const SQUARE = boxSize || 50;
        const xBoxes = this.#xLimit / SQUARE;
        const yBoxes = this.#yLimit / SQUARE;
        for (let yPos = 0; yPos < yBoxes; yPos++) {
            this.#shouldStop = false;
            for (let xPos = 0; xPos < xBoxes; xPos++) {
                await sleep(0);
                const {r,g,b,a} = this.#getRandomColor();
                this.#context.fillStyle = `rgba(${r},${g},${b},${a})`;
                this.#context.fillRect(xPos * SQUARE, yPos * SQUARE, SQUARE, SQUARE);
                if(this.#shouldStop) break;
            }
            if(this.#shouldStop) break;
        }
    }

    async fillWithPixels() {
        for (let yPos = 0; yPos < this.#yLimit; yPos++) {
            this.#shouldStop = false;
            for (let xPos = 0; xPos < this.#xLimit; xPos++) {
                await sleep(0);
                this.setPosition(xPos,yPos);
                this.#setRandomColor();
                this.draw();
                if(this.#shouldStop) break;
            }
            if(this.#shouldStop) break;
        }
    }

    fillWithFrame() {
        const currentFrame = this.#context.getImageData(0, 0, this.#xLimit, this.#yLimit);
        const length = currentFrame.data.length;
        for (let i = 0; i < length; i += 4) {
            const { r, g, b } = this.#getRandomColor();
            currentFrame.data[i + 0] = r;
            currentFrame.data[i + 1] = g;
            currentFrame.data[i + 2] = b;
            currentFrame.data[i + 3] = 255;
        }
        this.#context.putImageData(currentFrame, 0, 0);
    }
    
}
