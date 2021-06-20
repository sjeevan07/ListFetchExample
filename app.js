import CanvasElement from "/canvas.js";
import Hal from "/hal.js";
import Filler from "/filler.js";

const canvas = new CanvasElement(); // CanvasElement --> Class
canvas.fullScreen(); // CanvasElement has fullScreen method inside it.

const context = canvas.get2Dcontext();
const screenWidth = canvas.getWidth();
const screenHeight = canvas.getHeight();



const filler = new Filler(context, 0, 0);
// filler.fillWithSquares(40);
// filler.fillWithPixels();
// filler.fillWithFrame();
// let isPlaying = true;
// window.addEventListener('click', () => { isPlaying = !isPlaying })
// const random = () => {
//     if (isPlaying) {
//         filler.fillWithFrame();
//     }
//     requestAnimationFrame(() => {
//         random()
//     })
// }

// random();


const hals = [];
for (let index = 0; index < 5; index++) { 
    const RADIUS = 50;
    const hal = new Hal(context, RADIUS);
    hals.push(hal);
}


const animate = () => {
    context.clearRect(0,0, screenWidth, screenHeight)
    hals.forEach(hal => {
        hal.run();
    });
    requestAnimationFrame(animate);
}

animate();

