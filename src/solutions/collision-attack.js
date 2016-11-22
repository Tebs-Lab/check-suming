'use strict'
const checksums = require('./checksum');

module.exports = {

  /**
    Given a checksum value produced by the charcodeSum function
    return a value that collides with the provided checksum when
    the charcodeSum function is used to hash the return value.

    It's tempting to simply try: return String.fromCharCode(checksum);
    give it a shot and find out why it doesn't work...

    @param {integer} checksum : the hash value that our returned string must
                                hash to using the simple sum method
  */
  collideWithSimpleSum: function(checksum) {
    let currentSum = 0;
    let collision = '';

    while(currentSum !== checksum) {
      let addAmount = Math.min(32768, checksum - currentSum);
      collision += String.fromCharCode(addAmount);
      currentSum += addAmount;
    }

    return collision;
  },

  /**
    Given a checksum value produced by the charcodeSum function
    return a value that collides with the provided checksum when
    the charcodeSum function is used to hash the return value.

    This time, however, we are restricted to using a specific set
    of characers. It's common that our output space would be limited,
    for example, consider password strings which often have a restricted
    character set.

    @param {integer} checksum : the hash value that our returned string must
                                hash to using the simple sum method
  */
  collideWithSimpleSumRestricted: function(checksum, characterSet) {

    return generateCollision(0, '');

    // I'm using a recursive solution to exhaustively test many solutions
    function generateCollision(currentSum, currentCollision) {
      if(currentSum > checksum) return false;
      if(currentSum === checksum) return currentCollision;

      for(let character of characterSet) {
        let newSum = currentSum + Number(character.charCodeAt(0));
        let collision = generateCollision(newSum, currentCollision + character);

        if(collision !== false) return collision;
      }

      return false;
    }
  }
}
