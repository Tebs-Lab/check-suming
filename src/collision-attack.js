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

  },

  /**
    Given a checksum value produced by the charcodeSum function
    return a value that collides with the provided checksum when
    the charcodeSum function is used to hash the return value.

    @param {integer} checksum : the hash value that our returned string must
                                hash to using the simple sum method

    @param {string} characterSet : A string with at least one of each allowed character
  */
  collideWithSimpleSumRestricted: function(checksum, characterSet) {

  },

  /**
    Given a checksum value produced by the charcodeTimesIndex function
    return a value that collides with the provided checksum when
    the charcodeTimesIndex function is used to hash the return value.

    @param {integer} checksum : the hash value that our returned string must
                                hash to using the simple sum method

    @param {string} characterSet : A string with at least one of each allowed character
  */
  collideWithCharCodeTimesIndex: function(checksum, characterSet) {

  }
}
