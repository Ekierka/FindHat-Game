const prompt = require("prompt-sync")({ sigint: true });
const Field = require('./Field')

//main

const myField = new Field(Field.generateField(5,7,30));


while (!myField.isWinner()) {
  console.log(myField._playerCoordinates)
  console.log(myField._hatCoordinates)
  console.log((myField._playerCoordinates.x == myField._hatCoordinates.x && myField._playerCoordinates.y == myField._hatCoordinates.y))
  myField.print();
  let input = prompt('Which way? ');
  myField.move(input);
  console.clear();
}

console.log('Congrats You Won')
