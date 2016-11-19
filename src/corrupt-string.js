'use strict'

module.exports = {
  // The set of allowed characters
  alphaChars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",

  /**
     Create a string with characters randomly selected from this.alphaChars

     @param {integer} length : the length of the generated string
  */
  createRandomString: function(length){
    let randomString = "";
    for(let i = 0; i < length; i++) {
      randomString += alphaChars[Math.floor(Math.random() * this.alphaChars.length)];
    }

    return randomString;
  },

  /**
    Corrupt the input string by selecting a single chracter at random
    and shift that character's bits one left.

    @param {string} inputString
  */
  shiftOneCharacter: function(inputString) {
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

  },

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
    and replace it with new random charcaters.

    @param {string} inputString
  */
  corruptBlock: function(inputString){
    let corruptedString = "";

    let corruptionSize = Math.ceil(Math.random() * inputString.length);
    let corruptionLocation = Math.floor(Math.random() * (inputString.length - 1));
    let corruptBlock = this.createRandomString(corruptionSize);
    let corruptString = corruptinputString.split('').splice(corruptionLocation, corruptionSize, ...corruptBlock);

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
  }
}
