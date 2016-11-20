'use strict'
const stringGenerator = require('./string-generator');

module.exports = {
  /**
    Return a string with the same characters in the same quantity
    but in a random order.

    @param {string} inputString
  */
  shuffleString: function(inputString) {

  },

  /**
    Randomly select a randomly lengthed section of the input string
    and replace it with the empty string.

    @param {string} inputString
  */
  dropBlock: function(inputString){

  },

  /**
    Randomly select a randomly lengthed section of the input string
    and replace it with new random charcaters. This can cause the
    corrupted data to be longer than the input data.

    @param {string} inputString
  */
  corruptBlockWithRandom: function(inputString){

  },

  /**
    Randomly select a randomly lengthed section of the input string
    and shuffle those characters.

    @param {string} inputString
  */
  corruptBlockByShuffling: function(inputString){

  },

  /**
    Return a string with the values at indicies x and y swapped.

    @param {string} inputString
    @param {integer} x
    @param {integer} y
  */
  swapCharacters: function (inputString, x, y) {

  },

  /**
    Corrupt the input string by selecting a single chracter at random
    and shift that character's bits one left.

    @param {string} inputString
  */
  bitShiftOneCharacter: function(inputString) {

  }
}
