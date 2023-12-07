import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

export class PlatformO extends GameObject {
    constructor(canvas, image) {
        super(canvas, image, 0);
    }

    // Required, but no update action
    update() {
    }

    // Draw position is always 0,0
    draw() {
        this.ctx.drawImage(this.image, 0, 0);
    }

    // Set platform position
    size() {
        // Formula for Height should be on constant ratio, using a proportion of 832
        const scaledHeight = GameEnv.innerHeight * (60/832);
        // Formula for Width is scaled: scaledWidth/scaledHeight == this.width/this.height
        const scaledWidth = 150;
        const platformX = .1 * GameEnv.innerWidth;
        const platformY = (GameEnv.bottom - scaledHeight) - 150;

   // set variables used in Display and Collision algorithms
   this.bottom = platformY;
   this.collisionHeight = scaledHeight;
   this.collisionWidth = scaledWidth;
   // unfinished