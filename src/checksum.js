const crypto = require('crypto');

module.exports = {
  /**
    a very simple checksum that sums the charCodes of each character.
  */
  charcodeSum: function(inputString){
    var sum = 0;
    for(var i = 0; i < inputString.length; i++) {
      sum += inputString.charCodeAt(i);
    }
    return sum.toString(16);
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

    return sum.toString(16);
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

    return hash.toString(16);
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

    return hash.toString(16);
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
    return crypto.createHash(hashAlgorithm, 'AnySecretWillDo')
                     .update(inputString)
                     .digest('hex');
  }
}
