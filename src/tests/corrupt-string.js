'use strict'
const stringGenerator = require('./string-generator');

module.exports = {
  /**
    Return a string with the same characters in the same quantity
    but in a random order.

    @param {string} inputString
  */
  shuffleString: function(inputString) {
    let arr = inputString.split("");
    arr.sort(function(){
      return (Math.random() * 2) - 1;
    });

    return arr.join("");
  },

  /**
    Randomly select a randomly lengthed section of the input string
    and replace it with the empty string.

    @param {string} inputString
  */
  dropBlock: function(inputString){
    let corruptedString = "";

    let corruptionSize = Math.ceil(Math.random() * inputString.length);
    let corruptionLocation = Math.floor(Math.random() * (inputString.length - 1));

    let corruptString = inputString.split('');
    corruptString.splice(corruptionLocation, corruptionSize);
    corruptString = corruptString.join('');

    return corruptString;
  },

  /**
    Randomly select a randomly lengthed section of the input string
    and replace it with new random charcaters. This can cause the
    corrupted data to be longer than the input data.

    @param {string} inputString
  */
  corruptBlockWithRandom: function(inputString){
    let corruptedString = "";

    let corruptionSize = Math.ceil(Math.random() * inputString.length);
    let corruptionLocation = Math.floor(Math.random() * (inputString.length - 1));
    let corruptBlock = stringGenerator.generateRandomString(corruptionSize);

    let corruptString = inputString.split('');
    corruptString.splice(corruptionLocation, corruptionSize, ...corruptBlock);
    corruptString = corruptString.join('');

    return corruptString;
  },

  /**
    Randomly select a randomly lengthed section of the input string
    and shuffle those characters.

    @param {string} inputString
  */
  corruptBlockByShuffling: function(inputString){
    let corruptedString = "";

    let corruptionSize = Math.ceil(Math.random() * inputString.length);
    let corruptionLocation = Math.floor(Math.random() * (inputString.length - 1));
    let corruptBlock = this.shuffleString(inputString.substring(corruptionLocation, corruptionLocation + corruptionSize));

    let corruptString = inputString.split('');
    corruptString.splice(corruptionLocation, corruptionSize, ...corruptBlock);
    corruptString = corruptString.join('');

    return corruptString;
  },

  /**
    Return a string with the values at indicies x and y swapped.

    @param {string} inputString
    @param {integer} x
    @param {integer} y
  */
  swapCharacters: function (inputString, x, y) {
    let inputAsArray = inputString.split("");

    let temp = inputAsArray[x];
    inputAsArray[x] = inputAsArray[y];
    inputAsArray[y] = temp;

    return inputAsArray.join("");
  },

  /**
    Corrupt the input string by selecting a single chracter at random
    and shift that character's bits one left.

    @param {string} inputString
  */
  bitShiftOneCharacter: function(inputString) {
    let bitLocation = Math.floor(Math.random() * inputString.length);
    let stringBuilder = "";
    for(let i = 0; i < inputString.length; i++) {
      let character = inputString[i];
      if(i === bitLocation){
        character = character << 1;
      }

      stringBuilder += character;
    }

    return stringBuilder;
  }
}
