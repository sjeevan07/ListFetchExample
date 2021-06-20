import Position from "/position.js";

export default class Hal extends Position {
   static #acceleration = 8;
   static #velocityX = (Math.random() - 0.5) * Hal.#acceleration;
   static #velocityY = (Math.random() - 0.5) * Hal.#acceleration;
   #radius;
   #context;
   #drawStyle;
   #userName;
   #prevFillStyle;
   #prevStrokeStyle;
   #signX = Math.floor(Math.random() * 10) % 2 ? -1 : 1;
   #signY = Math.floor(Math.random() * 10) % 2 ? -1 : 1;

   constructor(context, radius) {
      const posX = Math.random() * (context.canvas.width - (radius * 2)) + radius;
      const posY = Math.random() * (context.canvas.height - (radius * 2)) + radius;
      super(posX, posY);
      this.#context = context;
      this.#radius = Number(radius) || Math.floor(Math.random() * 80) + 40;
      this.#init()
      this.#getUsername();
   }

   async #getUsername() {
      let response;
      try {
         response = await fetch('https://randomuser.me/api/');
         const data = await response.json()
         this.#userName = data.results[0].name.first;
      } catch (error) {
         console.error('[ERROR]:FETCHING DATA', error)
      }

   }

   #getRandomColor() {
      const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
      const r = randomBetween(0, 255);
      const g = randomBetween(0, 255);
      const b = randomBetween(0, 255);
      const a = randomBetween(0, 255);
      return ({
         r, g, b, a,
         rgb: `rgba(${r},${g},${b},255)`,
         rgba: `rgba(${r},${g},${b},${a})`
      });
   }

   #setDrawStyle({ fillValue, strokeValue }) {
      this.#drawStyle = { fillValue, strokeValue }
   }

   #loadDrawStyle() {
      this.#context.fillStyle = this.#drawStyle.fillValue;
      this.#context.strokeStyle = this.#drawStyle.strokeValue;
   }

   #crawlX(velocity) {
      this.x = this.x + (this.#signX * velocity);
   }

   #crawlY(velocity) {
      this.y = this.y + (this.#signY * velocity);
   }

   #drawInit() {
      this.#prevFillStyle = this.#context.fillStyle;
      this.#prevStrokeStyle = this.#context.strokeStyle;
   }

   #drawFinish() {
      this.#context.fillStyle = this.#prevFillStyle;
      this.#context.strokeStyle = this.#prevStrokeStyle;
   }

   #drawCircle(x, y, radius) {
      const fill = !this.#userName
      this.#context.beginPath();
      this.#context.arc(x, y, radius, 0, Math.PI * 2);
      if (fill) {
         this.#context.fill();
      } else {
         this.#context.font = "15px Helvetica";
         this.#context.fillText(this.#userName, x - radius / 2, y);
      }
      this.#context.stroke();
   }

   #init() {
      this.#drawInit();
      const { rgb } = this.#getRandomColor();
      // const velX = (Math.random() - 0.5) * this.#acceleration;
      // const velY = (Math.random() - 0.5) * this.#acceleration;
      // this.#velocityY = velX;
      // this.#velocityX = velY;
      this.#setDrawStyle({ fillValue: rgb, strokeValue: rgb });
      this.#loadDrawStyle();
   }

   #flipX() {
      this.#signX = -1 * this.#signX;
   }

   #flipY() {
      this.#signY = -1 * this.#signY;
   }

   #didIHitTheWall() {
      const screenWidth = this.#context.canvas.width;
      const screenHeight = this.#context.canvas.height;

      let xAxisHit = false;
      let yAxisHit = false;

      if ((this.x + this.#radius) > screenWidth) {
         xAxisHit = true;
      }

      if ((this.x - this.#radius) < 0) {
         xAxisHit = true;
      }

      if ((this.y + this.#radius) > screenHeight) {
         yAxisHit = true;
      }

      if ((this.y - this.#radius) < 0) {
         yAxisHit = true;
      }

      return ({ xAxisHit, yAxisHit })
   }

   #moveHal() {
      this.#crawlX(Hal.#velocityX);
      this.#crawlY(Hal.#velocityY);
      this.#drawCircle(this.x, this.y, this.#radius);
      const { xAxisHit, yAxisHit } = this.#didIHitTheWall();
      if (xAxisHit) {
         this.#flipX();
      }
      if (yAxisHit) {
         this.#flipY();
      }
   }

   run() {
      this.#loadDrawStyle();
      this.#moveHal();
   }

   move() {

   }
}