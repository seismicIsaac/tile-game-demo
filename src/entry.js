import { playerInput, handleKeyPressed, handleKeyUp } from "./input/input.js";

document.addEventListener("DOMContentLoaded", gameLauncher)

function gameLauncher() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext("2d");
  
  // Map 
  var levelCols = 11;
  var levelRows = 9;
  var tileSize = 32;
  
  //Player
  var playerCol = 5;
  var playerRow = 4;
  var movementSpeed = 3;
  var playerXSpeed = 0;
  var playerYSpeed = 0; 

  var level = [
    [1,1,1,1,1,1,1,1,1,1,1],
		[1,1,0,0,0,0,0,0,0,1,1],
		[1,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,1,0,1,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,1,0,1,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,1],
		[1,1,0,0,0,0,0,0,0,1,1],
		[1,1,1,1,1,1,1,1,1,1,1]
  ]

  var playerYPos = playerRow * tileSize;
  var playerXPos = playerCol * tileSize;

  canvas.width = tileSize * levelCols;
  canvas.height = tileSize * levelRows;

  document.addEventListener("keydown", handleKeyPressed);
  document.addEventListener("keyup", handleKeyUp);

  renderLevel();

  function renderLevel() {
    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // First draw all the walls
    // walls = red boxes
    context.fillStyle = "#ff0000";
    
    for(let i = 0; i < levelRows; i++) {
      for(let j = 0; j < levelCols; j++) {
        if (level[i][j] === 1) {
          context.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
        }
      }
    }

    // Then draw the player
    // player = green box
    context.fillStyle = "#00ff00";
    context.fillRect(playerXPos, playerYPos, tileSize, tileSize);
  }

  function updateGame() {
    playerXSpeed = 0;
    playerYSpeed = 0;

    if (playerInput.rightPressed) {
      playerXSpeed = movementSpeed;
    }
    else if (playerInput.leftPressed) {
      playerXSpeed = -movementSpeed;
    }
    if (playerInput.downPressed) {
      playerYSpeed = movementSpeed;
    }
    else if (playerInput.upPressed) {
      playerYSpeed = -movementSpeed;
    }

    playerXPos += playerXSpeed;
    playerYPos += playerYSpeed;


    var baseCol = Math.floor(playerXPos / tileSize);
    var baseRow = Math.floor(playerYPos / tileSize);
    var colOverlap = playerXPos % tileSize;
    var rowOverlap = playerYPos % tileSize;
    
    //check for horizontal collisions
      //We're moving right
    if (playerXSpeed > 0) {  // If we just moved into a wall / or are adjacent to a wall,
      if ((level[baseRow][baseCol + 1] && !level[baseRow][baseCol]) || (level[baseRow + 1][baseCol + 1] && !level[baseRow+1][baseCol] && rowOverlap)) {
        // Set our X position to the tile that is adjacent to the wall.
        playerXPos = baseCol * tileSize;
      }
    }

      //We're moving left
    if (playerXSpeed < 0) {
      if ((!level[baseRow][baseCol + 1] && level[baseRow][baseCol]) || (!level[baseRow + 1][baseCol + 1] && level[baseRow + 1][baseCol] && rowOverlap)) {
        playerXPos = (baseCol + 1) * tileSize;
      }
    }

    var baseCol = Math.floor(playerXPos / tileSize);
    var baseRow = Math.floor(playerYPos / tileSize);
    var colOverlap = playerXPos % tileSize;
    var rowOverlap = playerYPos % tileSize;

     //We're moving down
    if (playerYSpeed > 0) {
      if((level[baseRow + 1][baseCol] && !level[baseRow][baseCol]) || (level[baseRow + 1][baseCol + 1] && !level[baseRow][baseCol + 1] && colOverlap)) {
        playerYPos = baseRow * tileSize;
      }
    }

      // If we're moving up, check 
    if (playerYSpeed < 0) {
      if ((!level[baseRow + 1][baseCol] && level[baseRow][baseCol]) || (!level[baseRow + 1][baseCol + 1] && level[baseRow][baseCol + 1] && colOverlap)) {
        playerYPos = (baseRow + 1) * tileSize;
      }
    }

    renderLevel();

    window.requestAnimationFrame(updateGame);

  }

  updateGame();
};
