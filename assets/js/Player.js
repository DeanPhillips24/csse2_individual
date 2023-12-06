import GameEnv from './GameEnv.js';
import Character from './Character.js';

const PlayerAnimation = {
    // Sprite properties
    scale: 1,
    width: 46,
    height: 52.5,
    w: { row: 3, frames: 4, idleFrame: { column: 1, frames: 0 } }, // Lopez faces away from user
	a: { row: 1, frames: 4, idleFrame: { column: 1, frames: 0 } }, // Walk left key
    s: { }, // no action
	d: { row: 2, frames: 4, idleFrame: { column: 1, frames: 0 } }, // Walk right key
}

export class Player extends Character{
    // Speed control consts
    static initialSpeed = 0.25;
    static maxSpeed = 0.50;
    static acceleration = 0.00000005;
    // constructors sets up Character object 
    constructor(canvas, image, speedRatio, speed = 0.25, speedMultiplier = 1) {
        super(
            canvas, 
            image, 
            speedRatio,
            PlayerAnimation.width, 
            PlayerAnimation.height, 
            PlayerAnimation.scale
        );
        this.sceneStarted = false;
        this.isIdle = true;
        this.yVelocity = 0;
        this.stashFrame = PlayerAnimation.d;
        this.pressedDirections = {};
        this.speedMultiplier = speedMultiplier;
        this.speed = speed;
    }

    setAnimation(animation) {
        this.setFrameY(animation.row);
        this.setMaxFrame(animation.frames);
        if (this.isIdle && animation.idleFrame) {
            this.setFrameX(animation.idleFrame.column)
            this.setMinFrame(animation.idleFrame.frames);
        }
    }
    
    // check for matching animation
    isAnimation(key) {
        var result = false;
        for (let direction in this.pressedDirections) {
            if (this.pressedDirections[direction] === key.row) {
                result = !this.isIdle;
                break; // Exit the loop if there's a match
            }
        }
        //result = (result && !this.isIdle);
        if (result) {
                this.stashFrame = key;
        }
        return result;
    }

    // check for gravity based animation
    isGravityAnimation(key) {
        var result = false;
        for (let direction in this.pressedDirections) {
            if (this.pressedDirections[direction] === key.row) {
                result = (!this.isIdle && GameEnv.bottom <= this.y);
                break; // Exit the loop if there's a match
            }
        }
        //result = (result && !this.isIdle && GameEnv.bottom <= this.y);
        //var result = (this.frameY === key.row && !this.isIdle && GameEnv.bottom <= this.y);
        if (result) {
            return true;
        }
        if (GameEnv.bottom <= this.y) {
            this.setAnimation(this.stashFrame);
        }
        return false;
    }

    // Player perform a unique update
    update() {
        let isMoving = false;

        if (this.isAnimation(PlayerAnimation.a)) {
            this.x -= this.speed * this.speedMultiplier;  // Move to the left
            isMoving = true;
        }
        if (this.isAnimation(PlayerAnimation.d)) {
            this.x += this.speed * this.speedMultiplier;  // Move to the right
            isMoving = true;
        }
        if (this.isGravityAnimation(PlayerAnimation.w)) {
            this.y -= (GameEnv.bottom * 0.1);  // Jump 10% higher than the floor
        }   

        // Gradual speed increase
        if (isMoving && this.speed < Player.maxSpeed) {
            this.speed += Player.acceleration;
            // Ensure speed doesn't exceed maxSpeed
            if (this.speed > Player.maxSpeed) {
                this.speed = Player.maxSpeed;
            }

        } else if (!isMoving && this.speed > Player.initialSpeed) {
            // If not moving, gradually decrease speed to initial value
            this.speed -= Player.acceleration;
            // Ensure speed does not go below initialSpeed
            if (this.speed < Player.initialSpeed) {
                this.speed = Player.initialSpeed;
            }
        }

        // Idle frame set if no movement detected
        if (!isMoving) {
            this.isIdle = true;
            this.setAnimation(this.stashFrame);
        }

        // Perform super update actions
        super.update();

        // Next frame update
        requestAnimationFrame(() => this.update());
    }

}

// Can add specific initialization parameters for the player here
// In this case the player is following the default character initialization
export function initPlayer(canvas, image, gameSpeed, speedRatio){
    // Create the Player with an initial speed of 0.5 and speed multiplier of 0.5
    var player = new Player(canvas, image, gameSpeed, speedRatio, 0.5, 0.5);

    /* Player Control 
    * changes FrameY value (selected row in sprite)
    * change MaxFrame according to value in selected animation
    */
    document.addEventListener('keydown', function (event) {
        if (PlayerAnimation.hasOwnProperty(event.key)) {
            // Set variables based on the key that is pressed
            const key = event.key;
            if (!(event.key in player.pressedDirections)){
                player.pressedDirections[event.key] = PlayerAnimation[key].row;
            }
            player.isIdle = false;
            player.setAnimation(PlayerAnimation[key]);
        }
    });

    document.addEventListener('keyup', function (event) {
        if (PlayerAnimation.hasOwnProperty(event.key)) {
            // If no button is pressed then idle
            const key = event.key;
            if (event.key in player.pressedDirections){
                delete player.pressedDirections[event.key];
            }
            player.isIdle = true;
            player.setAnimation(PlayerAnimation.s);
            // Check for buttons being pressed
            const isAnyDirectionPressed = Object.keys(player.pressedDirections).length > 0;
            player.isIdle = !isAnyDirectionPressed;
            if (!isAnyDirectionPressed) {
                player.setAnimation(PlayerAnimation.s);
            } 
        }
    });

    // Changing player's speed
    player.speedMultiplier = 0.05;

    // Initial frame update
    requestAnimationFrame(() => player.update());

    // FPS
    const fps = 60; // Target FPS
    const frameInterval = 1000 / fps;
    let lastTime = performance.now();

    // Player Object
    return player;
}

export default Player;