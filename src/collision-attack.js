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

    Once again, we're restricted to a specific character set. Unfortnuately,
    this checksum can't realistically be broken with a brute force search. Doing
    so requires solving the "subset-sum" problem, which is NP-Complete. Using a
    similar strategy to the above becomes quite slow as soon as we need 16-32 digit
    strings.

    Instead I've used a hill-clibming technique that explores randomly when anytime
    the hashcode is off by the same amount twice in a row.

    @param {integer} checksum : the hash value that our returned string must
                                hash to using the simple sum method

    @param {string} characterSet : A string with at least one of each allowed character
  */
  collideWithCharCodeTimesIndex: function(checksum, characterSet) {

  }
}
