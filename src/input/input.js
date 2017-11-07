
var playerInput = {
  leftPressed: false,
  rightPressed: false,
  downPressed: false,
  upPressed: false
}

function handleKeyPressed(e) {
  switch (e.keyCode) {
    case 65:
      playerInput.leftPressed = true;
      break;
    case 87: 
      playerInput.upPressed = true;
      break;
    case 68:
      playerInput.rightPressed = true;
      break;
    case 83:
      playerInput.downPressed = true;
      break;
  }
}

function handleKeyUp(e) {
  switch (e.keyCode) {
    case 65:
      playerInput.leftPressed = false;
      break;
    case 87: 
      playerInput.upPressed = false;
      break;
    case 68:
      playerInput.rightPressed = false;
      break;
    case 83:
      playerInput.downPressed = false;
      break;
  }
}

export { playerInput, handleKeyPressed, handleKeyUp };
