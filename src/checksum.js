const crypto = require('crypto');

function charcodeSum(inputString){
  var sum = 0;
  for(var i = 0; i < inputString.length; i++) {
    sum += inputString.charCodeAt(i);
  }
  return sum.toString(16);
}


function charcodeTimesIndex(inputString){
  var sum = 0;
  for(var i = 0; i < inputString.length; i++) {
    sum += inputString.charCodeAt(i) * (i+1);
  }

  return sum.toString(16);
}


function hashCodeShift(inputString) {
  let hash = 0;
  if (inputString.length == 0) return hash;

  for (let i = 0; i < inputString.length; i++) {
    let charCode = inputString.charCodeAt(i);
    hash = ((hash << 5) - hash) + charCode;
  }

  return hash.toString(16);
}

function hashCodePrimeMultiplier(inputString) {
  let hash = 0;
  let primeNumber = 31;
  for (let i = 0; i < inputString.length; i++) {
    let charCode = inputString.charCodeAt(i)
    hash = (primeNumber * hash) + charCode;
    hash |= 0; //Cast to 32 bits, significantly improves collision rate
  }

  return hash.toString(16);
}

// For a list of usable digets use this command in your terminal
// openssl list-message-digest-algorithms
// All these algorithms should NEVER produce a collision, otherwise internet security is compromised.
const HASH_ALGORITHM = 'sha256';
function cryptoPackage(inputString) {
  return crypto.createHash(HASH_ALGORITHM, 'AnySecretWillDo')
                   .update(inputString)
                   .digest('hex');
}

module.exports = hashCodePrimeMultiplier;
