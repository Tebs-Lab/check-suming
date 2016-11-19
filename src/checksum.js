function computeChecksum(inputString) {
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

  return hash;
}

module.exports = computeChecksum;
