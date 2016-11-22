'use strict'
const checksums = require('./solutions/checksum');

module.exports = {

  /**
    Given a checksum value produced by the charcodeSum function
    return a value that collides with the provided checksum when
    the charcodeSum function is used to hash the return value.

    This starting solution is tempting... but doesn't work. Why not?
  */
  collideWithSimpleSum: function(checksum) {
    return String.fromCharCode(checksum);
  }
}
