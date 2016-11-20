const crypto = require('crypto');

/**
  If you are trying to learn checksums for the first times
  I strongly suggest you do not look at these solutions until
  you've made an attempt that at least passes 4/8 tests consistently.

  Most of these checksums still experience errors -- except the crypto
  package -- which is programmers are usually discouraged from using
  their own home-spun hash functions, and just use OpenSSL or other
  standard libraries instead.
*/
module.exports = {
  /**
    a very simple checksum that sums the charCodes of each character.
  */
  charcodeSum: function(inputString){
    var sum = 0;
    for(var i = 0; i < inputString.length; i++) {
      sum += inputString.charCodeAt(i);
    }
    return sum;
  },

  /**
    Another simple checksum that uses the index and the charCode to
    create the hash.
  */
  charcodeTimesIndex: function(inputString){
    var sum = 0;
    for(var i = 0; i < inputString.length; i++) {
      sum += inputString.charCodeAt(i) * (i+1);
    }

    return sum;
  },

  /**
    A common strategy for "non-cryptographic" hashing -- use bitshifts
    and the charCode to create the hash.
  */
  hashCodeShift: function(inputString) {
    let hash = 0;
    if (inputString.length == 0) return hash;

    for (let i = 0; i < inputString.length; i++) {
      let charCode = inputString.charCodeAt(i);
      hash = ((hash << 5) - hash) + charCode;
    }

    return hash;
  },

  /**
    Another "non-cryptographic" hash -- instead of bit shifting we multiply
    by a small prime number then uses a bitwise or to coerse the output to
    a 32bit integer.
  */
  hashCodePrimeMultiplier: function(inputString) {
    let hash = 0;
    let primeNumber = 31;
    for (let i = 0; i < inputString.length; i++) {
      let charCode = inputString.charCodeAt(i)
      hash = (primeNumber * hash) + charCode;
      hash |= 0; //Cast to 32 bits, significantly improves collision rate
    }

    return hash;
  },

  /**
    A small wrapper that allows us to use the node Crypto package,
    this allows us to use well, cryptographically secure hashes
    implemented in OpenSSL. To get a list of valid values for
    HASH_ALGORITHM type this into your terminal:

    openssl list-message-digest-commands
  */
  cryptoPackage: function(inputString) {
    let hashAlgorithm = 'sha1';
    let v = crypto.createHash(hashAlgorithm, 'AnySecretWillDo')
                     .update(inputString)
                     .digest('hex');

    v = parseInt(v, 16); // In order to follow my own challenge of returning an integer
    return v
  }
}
