const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(array) {
    this._fieldArray = array;
    this._playerCoordinates = this._findCoordinates(pathCharacter);
    this._hatCoordinates = this._findCoordinates(hat);
  }

  print() {
    for (let i = 0; i < this._fieldArray.length; i++) {
      console.log(`${this._fieldArray[i].join("")}`);
    }
  }

  move(direction) {
    if (direction === "r" && this._canMove(direction)) {
      this._playerCoordinates.x += 1;
      this._fieldArray[this._playerCoordinates.y][this._playerCoordinates.x] = pathCharacter;

    } else if (direction === "l") {
      if (this._canMove(direction)) {
        this._playerCoordinates.x -= 1;
        this._fieldArray[this._playerCoordinates.y][this._playerCoordinates.x] = pathCharacter;
      }
    } else if (direction === "u") {
      if (this._canMove(direction)) {
        this._playerCoordinates.y -= 1;
        this._fieldArray[this._playerCoordinates.y][this._playerCoordinates.x] = pathCharacter;
      }
    } else if (direction === "d") {
      if (this._canMove(direction)) {
        this._playerCoordinates.y += 1;
        this._fieldArray[this._playerCoordinates.y][this._playerCoordinates.x] = pathCharacter;
      }
    } 
  }

  _canMove(direction) {
    let playPosX = this._playerCoordinates.x;
    let playPosY = this._playerCoordinates.y;

    if (direction === "r") {
      return this._isSpaceAvailable(playPosX + 1, playPosY)
    } else if (direction === "l") {
      return this._isSpaceAvailable(playPosX - 1, playPosY)
    } else if (direction === "u") {
      return this._isSpaceAvailable(playPosX, playPosY - 1)
    } else if (direction === "d") {
      return this._isSpaceAvailable(playPosX, playPosY + 1)
    }
  }

  _isSpaceAvailable(x, y) {
    if (y >= this._fieldArray.length || y < 0 || 
      x >= this._fieldArray[0].length || x < 0) {
        console.log("You can't go out of bounds")
        return false;
    } else if (this._fieldArray[y][x] === hole) {
        console.log('Hole');
        return false;
    } else {
      console.log('Okay');
      return true;
    }
  }

  isWinner() {
    return (this._playerCoordinates.x == this._hatCoordinates.x && this._playerCoordinates.y == this._hatCoordinates.y)
  }

  _findCoordinates(symbolToFind) {
    for (let i = 0; i < this._fieldArray.length; i++) {
      for (let j = 0; j < this._fieldArray[i].length; j++) {
        if (this._fieldArray[i][j] === symbolToFind) {
          return {
            x: j,
            y: i
          };
        }
      }
    }
  }
     
}

module.exports = Field;