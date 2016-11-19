'use strict'

module.exports = {
  // The set of allowed characters
  alphaChars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",

  /**
     Create a string with characters randomly selected from this.alphaChars

     @param {integer} length : the length of the generated string
  */
  generateRandomString: function(length){
    let randomString = "";
    for(let i = 0; i < length; i++) {
      randomString += this.alphaChars[Math.floor(Math.random() * this.alphaChars.length)];
    }

    return randomString;
  },

  /**
     Create a string with characters randomly selected from this.alphaChars

     @param {integer} number : the number of strings to generate
     @param {integer} length : the length of each generated string
  */
  generateRandomStrings: function (number, length) {
    let strings = [];

    for(let i = 0; i < howMany; i++) {
      strings.push(this.generateRandomString(stringLength))
    }

    return strings;
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
    let corruptBlock = this.generateRandomString(corruptionSize);
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

  },
}
