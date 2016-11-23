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

    @param {string} characterSet : A string with at least one of each allowed character
  */
  collideWithSimpleSumRestricted: function(checksum, characterSet) {
    // Performance optimization, greedily pick bigger charCodes first
    let charSetOrdered = characterSet.split('').sort(function(a, b) {
        return b.charCodeAt(0) - a.charCodeAt(0);
    });

    // See recursive inner function for how this works
    return generateCollision(0, '');

    /**
      I'm using a recursive solution to exhaustively test many solutions.
      A more clever solution could be faster, but this is good enough for
      our test cases.
    */
    function generateCollision(currentSum, currentCollision) {
      if(currentSum > checksum) return false;
      if(currentSum === checksum) return currentCollision;

      for(let character of charSetOrdered) {
        let newSum = currentSum + character.charCodeAt(0);
        let collision = generateCollision(newSum, currentCollision + character);

        if(collision) return collision;
      }

      return false;
    }
  },

  /**
    Given a checksum value produced by the charcodeTimesIndex function
    return a value that collides with the provided checksum when
    the charcodeSum function is used to hash the return value.

    Once again, we're restricted to a specific character set. Unfortnuately,
    this checksum can't realistically be broken with a brute force search. Doing
    so requires solving the "subset-sum" problem, which is NP-Complete. Using a
    similar strategy to the above becomes quite slow as soon as we need 16-32 digit
    strings.

    Instead we're [doing something that takes advantage of the checksum].

    @param {integer} checksum : the hash value that our returned string must
                                hash to using the simple sum method

    @param {string} characterSet : A string with at least one of each allowed character
  */
  collideWithIndex: function(checksum, characterSet) {

    let [maxLength, numbers] = createIndexTimesNumberMap(checksum, characterSet);

    let charSetOrdered = characterSet.split('').sort(function(a, b) {
        return a.charCodeAt(0) - b.charCodeAt(0);
    });
    let minCharCode = charSetOrdered[0].charCodeAt(0);

    let startingPoint = 0;
    let valueAtPosition = [];
    for(let i = 1; i < maxLength; i++) {
      let value = i * minCharCode;
      valueAtPosition[i-1] = value;
      startingPoint += value;
    }

    let offBy = checksum - startingPoint;
    console.log(valueAtPosition);

    console.log(startingPoint, checksum, offBy);
  }
}

/**
  This subroutine generates all the single character values
  based on their position in the output string. We use this to
  shrink the space of the brute force attack.
*/
function createIndexTimesNumberMap(checksum, characteSet) {
  // Compute the maximum length of the string given the characterSet
  // and using what we know about the checksum algorithm.
  let min = characteSet[characteSet.length - 1].charCodeAt(0);
  let maxLength = 1;
  let tmpSum = 0;
  while(tmpSum < checksum) {
    tmpSum += (maxLength * min);
    maxLength++;
  }
  maxLength -= 1;

  let numbers = {}
  for(let char of characteSet) {
    for(let i = 0; i < maxLength; i++) {
      let charWithVal = {
        character: char,
        position: i
      }
      let value = char.charCodeAt(0) * (i+1);

      if(numbers[value] === undefined) {
        numbers[value] = [charWithVal];
      }
      else {
        numbers[value].push(charWithVal);
      }
    }
  }

  return [maxLength, numbers];
}
