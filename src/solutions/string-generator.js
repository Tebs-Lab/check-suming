'use strict'


module.exports = {
  /*
    The tests will not pass unless strings generated contain only these characters.
    You can change this string to change the character set though.
  */
  alphaChars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",

  /**
    Generate a random character within the allowed string-set for Javascript
  */
  getRandomCharacter: function() {
    return this.alphaChars[Math.floor(Math.random() * this.alphaChars.length)];
  },

  /**
     Create a string with randomly generated characters.

     @param {integer} length : the length of the generated string
  */
  generateRandomString: function(length){
    let randomString = "";
    for(let i = 0; i < length; i++) {
      randomString += this.getRandomCharacter();
    }

    return randomString;
  },

  /**
     Create a list of strings with randomly selected characters

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
     Create a series of strings with randomly selected characters. This array will
     contain n strings for each length provided in the input array.

     @param {integer} n : the n of strings to generate of each length
     @param {Array} lenghts : the lengths of string samples to generate
  */
  generateRandomSamples: function (n, lengths) {
    let strings = [];

    for(let length of lengths) {
      strings = strings.concat(this.generateRandomStrings(n, length))
    }

    return strings;
  }
}
