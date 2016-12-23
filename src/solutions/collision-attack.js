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
      our test cases. In fact, you'll see the more challenging hash-function
      is broken more quickly than this hash function with a "clever" strategy.
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
    let charSetOrdered = characterSet.split('').sort(function(a, b) {
        return a.charCodeAt(0) - b.charCodeAt(0);
    });

    let maxLength = computeMaxLength(checksum, charSetOrdered);
    let hashContributionMap = createIndexTimesNumberMap(checksum, charSetOrdered);
    let hashContributionsByPosition = createHashContributionsByPosition(hashContributionMap);

    // Initialize the collision with each index as the smallest-char-code character
    let offBy = checksum;
    let valueAtPosition = [];
    for(let i = 0; i < maxLength; i++) {
      valueAtPosition[i] = hashContributionsByPosition[i][0];
      offBy -= hashContributionsByPosition[i][0].value;
    }

    // Now let "hill climb" by changing valueAtPosition towards offBy is 0...
    // There is a risk that this loops forever, which happens all the time.
    let previousOffBy;
    while(offBy !== 0) {

      // This means we've reached a "shoulder", explore randomly
      if(previousOffBy === offBy) {
        let randomPosition = Math.floor(Math.random() * valueAtPosition.length);
        let randomChoice = Math.floor(Math.random() * hashContributionsByPosition[randomPosition].length);

        let newValue = hashContributionsByPosition[randomPosition][randomChoice];
        let currentValue = valueAtPosition[randomPosition];
        valueAtPosition[randomPosition] = newValue;

        previousOffBy = offBy;
        offBy = offBy - (newValue.value - currentValue.value);
      }
      else {
        for(let i = 0; i < valueAtPosition.length - 1; i++) {
          let currentValue = valueAtPosition[i];
          let valuesForPosition = hashContributionsByPosition[i];
          let newChoice = moveOffsetTowardsZero(offBy, currentValue, valuesForPosition);

          offBy = offBy - (newChoice.value - currentValue.value);
          valueAtPosition[i] = newChoice;
        }

        previousOffBy = offBy;
      }
    }

    return valueAtPosition.map(function(val, idx){
      return val.character;
    }).join('');
  }
}

//** Private Helper Functions Below This Point **//

/**
  Given an amount by which the current collision attempt is off from the checksum
  as well as a value for a particular index, and the possible values for that index
  return a new character that moves our offBy amount closest to 0.

  @param offBy {integer} -- the amount the current collision is off from the checksum

  @param currentValue {Object} -- an object with keys value and character that represent
                                  the character in a specific position in our collision

  @param possibleValues {Array} -- an array containing Objects each of the same format of
                                   currentValue, representing all the choices for this index
*/
function moveOffsetTowardsZero(offBy, currentValue, possibleValues) {
  let bestItem = currentValue;
  let bestNewOffset = Math.abs(offBy);

  for(let i = 0; i < possibleValues.length; i++) {
    let newValue = possibleValues[i].value;
    let newOffBy = offBy - (newValue - currentValue.value);

    if(Math.abs(newOffBy) < bestNewOffset) {
      bestItem = possibleValues[i];
      bestNewOffset = newOffBy;
    }
  }

  return bestItem;
}

/**
  Given an object of the format generated by createIndexTimesNumberMap
  return a reformatted version of the same data. Specifically in the
  format where each key is an index for the collision string, and the
  values are all the possible character/checksum-contribution-value
  combinations for that index in the collision-string.

  @param hashContributionMap {Object} -- an Object of the format returned from
                             createIndexTimesNumberMap.
*/
function createHashContributionsByPosition(hashContributionMap) {
  let positionCharacterMap = {}
  for(let number in hashContributionMap) {
    let options = hashContributionMap[number];
    for(let option of options) {
      if(positionCharacterMap[option.position] === undefined) {
        positionCharacterMap[option.position] = [];
      }
      positionCharacterMap[option.position].push({
        character: option.character,
        value: (option.position+1) * option.character.charCodeAt(0)
      });
    }
  }

  return positionCharacterMap;
}

/**
  Given a checksum value created by the indexTimesCharCode hash
  compute the maximum length that a colliding string can possibly
  be. We do this by calculating the sum of using the smallest charCode
  value in the provided characterSet until that sum exceeds the checksum
  value.

  @param checksum {integer} -- a checksum value produced by the indexTimesCharCode
                               hash function.

  @param characterSet {string} -- a string representing the set of allowed characters
                                  in the collision we wish to create.

*/
function computeMaxLength(checksum, characterSet) {
  let min = characterSet[characterSet.length - 1].charCodeAt(0);
  let maxLength = 1;
  let tmpSum = 0;
  while(tmpSum < checksum) {
    tmpSum += (maxLength * min);
    maxLength++;
  }

  return maxLength - 1;
}

/**
  This subroutine generates all integer values that can be generated
  given a checksum and a character set. The output maps those integer
  values to the position and character used to produce that integer.

  For example, 97 maps to {character: a, position: 0}, because the
  charCode for a is 97, and when it's at the 0th position the indexTimesCharCode
  strategy multiplies 97 by 1 to produce the value.
*/
function createIndexTimesNumberMap(checksum, characterSet) {
  let maxLength = computeMaxLength(checksum, characterSet);
  let hashContributionMap = {};
  for(let char of characterSet) {
    for(let i = 0; i < maxLength; i++) {
      let charWithVal = {
        character: char,
        position: i
      }
      let value = char.charCodeAt(0) * (i+1);

      if(hashContributionMap[value] === undefined) {
        hashContributionMap[value] = [charWithVal];
      }
      else {
        hashContributionMap[value].push(charWithVal);
      }
    }
  }

  return hashContributionMap;
}
