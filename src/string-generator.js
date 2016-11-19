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

    for(let i = 0; i < number; i++) {
      strings.push(this.generateRandomString(length))
    }

    return strings;
  },

  /**
     Create a series of strings with characters randomly selected from this.alphaChars.
     there will be number of strings per length, and all lenghts from 0-maxLength will
     be represented.

     @param {integer} number : the number of strings to generate of each length
     @param {integer} maxLength : the largest length to generate
  */
  generateRandomSample: function (number, maxLength) {
    let strings = [];

    for(let length = 1; length < number; length++) {
      strings = strings.concat(this.generateRandomStrings(number, length))
    }

    return strings;
  },

  /**
     Return a list of all possible strings up to the passed in length that
     contain only letters from this.alphaChars starting with a specified
     prefix. If the prefix is not specified, it defaults to the empty string

     @param {integer} length : the length of each generated string
     @param {string} length : the prefix
  */
  generateAllPermutations: function (length, prefix = "") {
    let permutations = [];

    if(prefix.length < length) {
      permutations.push(prefix);

      for(let letter of this.alphaChars) {
        let nextPermutation = prefix + letter;
        permutations = permutations.concat(this.generateAllPermutations(length, nextPermutation));
      }
    }

    return permutations;
  }
}
