import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

export class Door extends GameObject {
    constructor(canvas, image) {
        super(canvas, image, 0, 0.5, 0.5);
    }
    
    // Required, but no update action
    update() {
    }

    // Draw position is always 0,0
    draw() {
        this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }

    // Set Door position
    size() {
        // Formula for Height should be on constant ratio, using a proportion of 832
        const scaledHeight = GameEnv.innerHeight * (125/832);
        // Formula for Width is scaled: scaledWidth/scaledHeight == this.width/this.height
        const scaledWidth = scaledHeight * this.aspect_ratio;
        const doorX = .82 * GameEnv.innerWidth;
        const doorY = (GameEnv.bottom - (.99 * scaledHeight));

        // set variables used in Display and Collision algorithms
        this.bottom = doorY;
        this.collisionHeight = scaledHeight;
        this.collisionWidth = scaledWidth;
    
        //this.canvas.width = this.width; 
        //this.canvas.height = this.height;
        this.canvas.style.width = `${scaledWidth}px`;
        this.canvas.style.height = `${scaledHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${doorX}px`;
        this.canvas.style.top = `${doorY}px`; 

    }
}

export default Door;