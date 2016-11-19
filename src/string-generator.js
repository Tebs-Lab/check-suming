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
     @param {Array} lenghts : the lengths of string samples to generate
  */
  generateRandomSamples: function (number, lengths) {
    let strings = [];

    for(let length of lengths) {
      strings = strings.concat(this.generateRandomStrings(number, length))
    }

    return strings;
  }
}
