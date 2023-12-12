import Character from './Character.js';
import GameEnv from './GameEnv.js';

function destroy() {
    this.destroyed = true;
}
export default class Enemy extends Character {
    // constructors sets up Character object 
    constructor(canvas, image, speedRatio, enemyData) {
        super(
            canvas,
            new Image(),
            speedRatio,
            enemyData.width,
            enemyData.height,
        );

        // Player Data is required for Animations
        this.enemyData = enemyData;

        // Initial Position of Goomba
        this.x = 0.6 * GameEnv.innerWidth;

        // Variable to track destroy state
        this.destroyed = false;
    }

    draw() {
        // Ensure image is loaded before drawing
        if (this.image.complete && !this.destroyed) {
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    update() {
        // Check if the enemy is at the left or right boundary
        if (this.x <= 0 || this.x + this.width >= GameEnv.innerWidth) {
            // Change direction by reversing the speed
            this.speed = -this.speed;
        }

        // Randomly change when the Goomba changes position
        if (Math.random() < 0.006) {
            this.speed = Math.random() < 0.5 ? -this.speed : this.speed;
        }

        // Randomly turn Goomba into God Mode
        if (Math.random() < 0.01) {
            this.performGoombaSpecial();
        }

        // Initially get the enemy moving
        this.x += this.speed;

        // Detect if the goomba is dead
        if (this.destroyed) {
            this.destroy();
            console.log("destroyed");
        }
    };

    performGoombaSpecial() {
        if (!this.specialActionActive) {
            // Temporary increase in speed
            const originalSpeed = this.speed;
            this.speed *= 4; // You can adjust the multiplier based on your game's design

            // Change the styling and scale of the enemy
            this.canvas.style.transform = 'scaleX(-1)';
            this.canvas.style.filter = 'invert(1)';
            this.canvas.style.transform = 'scale(1.5)';

            // Set a timeout to revert the speed to the original value after a certain duration
            setTimeout(() => {
                this.speed = originalSpeed;
                this.canvas.style.transform = 'scaleX(1)';
                this.canvas.style.filter = 'invert(0)';
                this.canvas.style.transform = 'scale(1)';

                this.specialActionActive = false; // Reset the flag after the timeout
            }, 3000);

            // Set the flag to indicate that the special action is active
            this.specialActionActive = true;
        }
    }
}


     /* murder() {
        let i = 1;
        let intervalId = setInterval(() => {
            if (i >= 0) {
                canvas.style.transform = `scale(1, ${i.toFixed(1)})`;
                console.log("Death " + i.toFixed(1));
                i -= 0.1;
            } else {
                clearInterval(intervalId);
            }
        }, 50);
    } */

export {destroy}
