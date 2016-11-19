const crypto = require('crypto');

function charcodeSum(inputString){
  if(typeof inputString !== 'string') {
    throw new TypeError("inputData was not a string.");
  }

  var sum = 0;
  for(var i = 0; i < inputString.length; i++) {
    sum += inputString.charCodeAt(i);
  }
  return sum.toString(16);
}


function charcodeTimesIndex(inputString){
  if(typeof inputString !== 'string') {
    throw new TypeError("inputData was not a string.");
  }

  var sum = 0;
  for(var i = 0; i < inputString.length; i++) {
    sum += inputString.charCodeAt(i) * (i+1);
  }

  return sum.toString(16);
}


function javaHashCode(inputString) {
  if(typeof inputString !== 'string') {
    throw new TypeError("inputData was not a string.");
  }

  let hash = 0;
  if (inputString.length == 0) return hash;

  for (let i = 0; i < inputString.length; i++) {
    let charCode = inputString.charCodeAt(i);
    hash = ((hash << 5) - hash) + charCode;
    hash |= 0;
  }

  return hash.toString(16);
}

// For a list of usable digets use this command in your terminal
// openssl list-message-digest-algorithms
const HASH_ALGORITHM = 'sha256';
function cryptoPackage(inputString) {
  return crypto.createHash(HASH_ALGORITHM, 'AnySecretWillDo')
                   .update(inputString)
                   .digest('hex');
}

module.exports = cryptoPackage;
