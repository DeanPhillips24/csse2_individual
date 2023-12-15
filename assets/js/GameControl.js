import GameEnv from './GameEnv.js';
import GameLevel from './GameLevel.js';

const GameControl = {

    // Level transition method (destroy then newlevel)
    async transitionToLevel(newLevel) {
        this.inTransition = true;

        // Destroy existing game objects
        GameEnv.destroy();

        // Ensure newLevel is an instance of GameLevel
        if (!(newLevel instanceof GameLevel)) {
            console.error('Invalid level object:', newLevel);
            this.inTransition = false;
            return;
        }

        // Load GameLevel objects
        await newLevel.load();
        GameEnv.currentLevel = newLevel;

        // Trigger a resize to redraw canvas elements
        window.dispatchEvent(new Event('resize'));
        // Update invert property, twice means same as before
        toggleCanvasEffect.dispatchEvent(new Event('click'));
        toggleCanvasEffect.dispatchEvent(new Event('click'));

        this.inTransition = false;
    },

    // Game control loop
    gameLoop() {
        // Turn game loop off during transitions
        if (!this.inTransition) {

            // Get current level
            GameEnv.update();
            const currentLevel = GameEnv.currentLevel;

            // currentLevel is defined
            if (currentLevel) {
                // run the isComplete callback function
                if (currentLevel.isComplete && currentLevel.isComplete()) {
                    const currentIndex = GameEnv.levels.indexOf(currentLevel);
                    // next index is in bounds
                    if (currentIndex !== -1 && currentIndex + 1 < GameEnv.levels.length) {
                        // transition to the next level
                        this.transitionToLevel(GameEnv.levels[currentIndex + 1]);
                    } 
                }
            // currentLevel is null, (ie start or restart game)
            } else {
                // transition to beginning of game
                this.transitionToLevel(GameEnv.levels[0]);
            }
        }

        // recycle gameLoop, aka recursion
        setTimeout(requestAnimationFrame(this.gameLoop.bind(this)),1000/GameEnv.frameRate);  
    },
};

export default GameControl;