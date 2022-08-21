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

  getSomething() {
    return "something";
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

  static generateField (length, width, percentage) {
    
    let newField = new Array(length);
    for (let i = 0; i < newField.length; i++) {
        newField[i] = new Array(width);
    }

    for (let i = 0; i < newField.length; i++) {
      for (let j = 0; j < newField[i].length; j++) {
        newField[i][j] = fieldCharacter;
      }
    }

    Field._generateHoles(newField, percentage);
    Field._generateHat(newField)
    Field._generatePlayerStart(newField)
   
    return newField;
  }

  static _generateHoles(field, percentage) {
    let length = field.length;
    let width = field[0].length;
    let numberOfHoles = Math.floor(percentage/100*(length*width));
    for (let i = 0; i < numberOfHoles; i++) {
      let newHole = Field._generateCoordinates(width, length);
      if (field[newHole.y][newHole.x] !== hole) {
        field[newHole.y][newHole.x] = hole;
      } else {
        i--;
      }
    }
    return field;
  }

  static _generateHat(field) {
    let length = field.length;
    let width = field[0].length;
    let newHat = Field._generateCoordinates(width, length)
    while (field[newHat.y][newHat.x] !== fieldCharacter){
      newHat = Field._generateCoordinates(width, length)
    } 
    return field[newHat.y][newHat.x] = hat;
  }

  static _generatePlayerStart(field) {
    let length = field.length;
    let width = field[0].length;
    let start = Field._generateCoordinates(width, length)
    while (field[start.y][start.x] !== fieldCharacter){
      start = Field._generateCoordinates(width, length)
    } 
    return field[start.y][start.x] = pathCharacter;
  }

  static _generateCoordinates(width, length) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * length);
    return {
      x: x,
      y: y
    }
  }
     
}

module.exports = Field;