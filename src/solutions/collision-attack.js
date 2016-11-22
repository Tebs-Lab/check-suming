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

    Once again, we're restricted to a specific character set.

    @param {integer} checksum : the hash value that our returned string must
                                hash to using the simple sum method
  */
  collideWithIndex: function(checksum, characterSet) {

    const numbers = createIndexTimesNumberMap(checksum, characterSet);
    let collisionObj = generateAllSums(0);
    return collisionObj;

    /**
      Now we're using brute force again, but finding the numbers that
      sum to our checksum instead of searching for strings that break
      the checksum. This problem is actually well studied, and called
      "The subset sum problem". It's also "NP-Complete", which means
      many things, but also means we won't be able to generate all
      such sums. So we have to limit the search space.

      Luckily, we have some very practical limits in the position
      and character set. Each option in the numberMap can only
      be used once, for example, since they each represent a
      character at an individual position in the string.
    */
    function generateAllSums(currentSum, partial = [], usedInfo = undefined) {
      // Default for the usedInfo is complex
      if(usedInfo === undefined) {
        usedInfo = {
          numbers: {},
          positions: {}
        };
      }

      if(currentSum > checksum) return [];

      if(currentSum === checksum){
        let collisions = computePotentialCollisions(numbers, partial);
        if(collisions === false) {
          return [];
        }

        for(let c of collisions) {
          if(checksums.charcodeTimesIndex(c) === checksum) {
            return [c]
          }
        }
      }

      let sumsFoundBelow = [];
      for(let number in numbers) {
        let newUsedInfo = cloneUsedInfo(usedInfo);
        let usedNumbers = newUsedInfo.numbers;
        let usedPositions = newUsedInfo.positions;

        // Ignore numbers we have already exhausted
        let numberUsedCount = newUsedInfo.numbers[number];
        if(numberUsedCount >= numbers[number].length) {
          continue;
        }

        // Increment this number's used count
        if(usedNumbers[number] === undefined) usedNumbers[number] = 1;
        else usedNumbers[number] += 1;

        // Ignore numbers that can only be represented in positions we've used
        // And mark this position as used
        let openPosition = false;
        for(let {position} of numbers[number]) {

          if(!usedInfo.positions[position]) {
            openPosition = true;
            usedPositions[position] = true;
            break;
          }
        }

        if(!openPosition) {
          continue;
        }

        let newSum = currentSum + Number(number);
        let newCollision = partial.slice();
        newCollision.push(number);

        sumsFoundBelow = sumsFoundBelow.concat(generateAllSums(newSum, newCollision, newUsedInfo));
        if(sumsFoundBelow.length > 0) {
          return sumsFoundBelow;
        }
      }

      return sumsFoundBelow;
    }
  }
}


// Quick way to make a deep clone of the usedInfo obj
function cloneUsedInfo(usedInfo) {
  let newObj = {
    numbers: {},
    positions: {}
  };

  for(let number in usedInfo.numbers) {
    newObj.numbers[number] = usedInfo.numbers[number];
  }

  for(let position in usedInfo.positions) {
    newObj.positions[position] = usedInfo.positions[position];
  }

  return newObj;
}

/**
  Given a number map, and the subset sum solution, see if we can use this subset
  as our collision given the constraints of the numberMap. We use another exhaustive
  recursive search to generate all the strings represented.
*/
function computePotentialCollisions(numberMap, partial, partialCollision = []) {
  let positionCharacterMap = {}
  for(let number of partial) {
    let options = numberMap[number];
    for(let option of options) {
      if(positionCharacterMap[option.position] === undefined) {
        positionCharacterMap[option.position] = [];
      }
      positionCharacterMap[option.position].push(option.character);
    }
  }

  // Check that it's possible
  for(let i = 0; i < partial.length; i++) {
    if(positionCharacterMap[i] === undefined) {
      return false;
    }
  }

  return stringsFromPositionMap(positionCharacterMap);
}

function stringsFromPositionMap(positionCharacterMap, position = 0, prefix = '') {
  let stringsBelow = [];
  if(prefix.length >= Object.keys(positionCharacterMap).length){
    stringsBelow.push(prefix);
    return stringsBelow;
  }

  for(let i = position; i < Object.keys(positionCharacterMap).length; i++) {
    let characters = positionCharacterMap[i];

    for(let char of characters) {
      stringsBelow = stringsBelow.concat(stringsFromPositionMap(positionCharacterMap, i+1, prefix + char));
    }
  }

  return stringsBelow;
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

  return numbers;
}
