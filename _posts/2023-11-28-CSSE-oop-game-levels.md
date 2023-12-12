---
layout: base
title: Dynamic Game Levels
description: Early steps in adding levels to an OOP Game.  This includes basic animations left-right-jump, multiple background, and simple callback to terminate each level.
type: ccc
courses: { csse: {week: 14} }
image: /images/mario/hills.png
---

<style>
    #gameBegin, #controls, #gameOver {
        position: relative;
        z-index: 2; /*Ensure the controls are on top*/
    }
</style>

<!-- Prepare DOM elements -->
<!-- Wrap both the canvas and controls in a container div -->
<div id="canvasContainer">
    <div id="gameBegin" hidden>
        <button id="startGame">Start Game</button>
    </div>
    <div id="controls"> <!-- Controls -->
        <!-- Background controls -->
        <button id="toggleCanvasEffect">Invert</button>
    </div>
    <div id="gameOver" hidden>
        <button id="restartGame">Restart</button>
    </div>
</div>

<script type="module">
    // Imports
    import GameEnv from '{{site.baseurl}}/assets/js/GameEnv.js';
    import GameLevel from '{{site.baseurl}}/assets/js/GameLevel.js';
    import GameControl from '{{site.baseurl}}/assets/js/GameControl.js';
    import Enemy, { destroy } from '{{ site.baseurl }}/assets/js/Enemy.js';
    console.log(destroy);

    // Define goombaEnemy
    let goombaEnemy;

    /*  ==========================================
     *  ======= Data Definitions =================
     *  ==========================================
    */

    // Define assets for the game
    var assets = {
      enemies: {
        goomba: {
          src: "/images/mario/goomba.png",
          width: 448,
          height: 452,
        }
      },
      obstacles: {
        tube: { src: "/images/mario/tube.png" },
      },
      platforms: {
        grass: { src: "/images/mario/grass.png" },
        alien: { src: "/images/mario/alien.png" },
      },
      platformO: {
        grass: {src: "/images/mario/brick_wall.png"},
      },
      backgrounds: {
        start: { src: "/images/gameimages/antoine.jpg" },
        hills: { src: "/images/mario/hills.png" },
        planet: { src: "/images/gameimages/AvenidaTown_87.png" },
        castles: { src: "/images/mario/castles.png" },
        end: { src: "/images/mario/game_over.png" }
      },
      players: {
        mario: {
          src: "/images/gameimages/lopezanimation.png",
          width: 46,
          height: 52.5,
          w: { row: 3, frames: 4 },
          wa: { idleFrame: {column: 1, frames: 0} }, // no action
          wd: {}, // no action
          a: { row: 1, frames: 4, idleFrame: { column: 1, frames: 0 } },
          s: {  },
          d: { row: 2, frames: 4, idleFrame: { column: 1, frames: 0 } }
        }
      },
      things: {
        coin: {src: "/images/mario/Coin.png"},
      },
    };

    // add File to assets, ensure valid site.baseurl
    Object.keys(assets).forEach(category => {
      Object.keys(assets[category]).forEach(assetName => {
        assets[category][assetName]['file'] = "{{site.baseurl}}" + assets[category][assetName].src;
      });
    });

    /*  ==========================================
     *  ===== Game Level Call Backs ==============
     *  ==========================================
    */

    // Level completion tester
    function testerCallBack() {
        // console.log(GameEnv.player?.x)
        if (GameEnv.player?.x > GameEnv.innerWidth) {
            return true;
        } else {
            return false;
        }
    }

    // Helper function for button click
    function waitForButton(buttonName) {
      // resolve the button click
      return new Promise((resolve) => {
          const waitButton = document.getElementById(buttonName);
          const waitButtonListener = () => {
              resolve(true);
          };
          waitButton.addEventListener('click', waitButtonListener);
      });
    }

    // Start button callback
    async function startGameCallback() {
      const id = document.getElementById("gameBegin");
      id.hidden = false;
      
      // Use waitForRestart to wait for the restart button click
      await waitForButton('startGame');
      id.hidden = true;

      // Check if currentLevel is defined before adding goomba
      if (GameEnv.currentLevel && GameEnv.currentLevel.enemies) {

      
      // Create instance of Enemy class
      goombaEnemy = new Enemy(document.createElement('canvas'), assets.enemies.goomba, 1, assets.enemies.goomba);

      // Initial position of Goomba
      goombaEnemy.x = 100; // Change value for x-coordinate

      // Add Goomba to current game level
      GameEnv.currentLevel.enemies.push(goombaEnemy);
      }
    
    return true;
    }

    // Home screen exits on Game Begin button
    function homeScreenCallback() {
      // gameBegin hidden means game has started
      const id = document.getElementById("gameBegin");
      return id.hidden;
    }

    // Game Over callback
    async function gameOverCallBack() {
      const id = document.getElementById("gameOver");
      id.hidden = false;
      
      // Use waitForRestart to wait for the restart button click
      await waitForButton('restartGame');
      id.hidden = true;
      
      // Change currentLevel to start/restart value of null
      GameEnv.currentLevel = null;

      return true;
    }

    /*  ==========================================
     *  ========== Game Level setup ==============
     *  ==========================================
     * Start/Homme sequence
     * a.) the start level awaits for button selection
     * b.) the start level automatically cycles to home level
     * c.) the home advances to 1st game level when button selection is made
    */
    // Start/Home screens
    new GameLevel( {tag: "start", callback: startGameCallback } );
    new GameLevel( {tag: "home", background: assets.backgrounds.start, callback: homeScreenCallback } );
    // Game screens
    new GameLevel( {tag: "hills", background: assets.backgrounds.hills, platform: assets.platforms.grass, platformO: assets.platformO.grass, player: assets.players.mario, tube: assets.obstacles.tube, callback: testerCallBack, thing: assets.things.coin, } );
    new GameLevel( {tag: "alien", background: assets.backgrounds.planet, platform: assets.platforms.alien, player: assets.players.monkey, callback: testerCallBack } );
    // Game Over screen
    new GameLevel( {tag: "end", background: assets.backgrounds.end, callback: gameOverCallBack } );


    /*  ==========================================
     *  ========== Game Control ==================
     *  ==========================================
    */

    // create listeners
    toggleCanvasEffect.addEventListener('click', GameEnv.toggleInvert);
    window.addEventListener('resize', GameEnv.resize);

    // Check if buttons are pressed
    function checkButtonsPressed() {
      const keysPressed = Object.keys(GameEnv.player.pressedKeys);
      return keysPressed.length > 0;
    }

    // Modification to game loop
    function gameLoop() {
      // Check if any buttons are pressed
      const buttonsPressed = checkButtonsPressed();

      // Determine the frame based on button state
      let frame;
      if(buttonsPressed) {
        // Logic to determine the frame when button is being pressed
        const currentKey = Object.keys(GameEnv.player.pressedKeys)[0];

        // Use animation frame based on key pressed
        frame = GameEnv.currentLevel.player.playerData[currentKey].idleFrame || GameEnv.currentLevel.player.playerData[currentKey].frames[0];
      } else {
        frame = GameEnv.currentLevel.player.wa.idleFrame;
      }
      
      // Update player frame
      GameEnv.currentLevel.player.currentFrame = frame;

      // Update Goomba
      if (GameEnv.currentLevel.enemies.length > 0) {
        for (const enemy of GameEnv.currentLevel.enemies) {
          enemy.update();
          enemy.draw(); // Draw goomba
        }
      }

      // Repeat game loop
      requestAnimationFrame(gameLoop);
      }

    // start game
    GameControl.gameLoop();
    
</script>

