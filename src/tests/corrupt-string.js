'use strict'
const corrupt = require('../corrupt-string');
const assert = require('chai').assert

describe("corrupt-string", function() {

  // 3 relatively corruptable input strings
  let inputSamples = [
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'aabbccddAABBCCDD',
    'aabbccddAAABBBCCCDDD',
  ]

  describe("shuffleString", function() {
    it("should contain the same letter count as the input data, but rarely the same string", function(){
      for(let inputSample of inputSamples) {
        let inputCounts = countCharacters(inputSample);
        let samples = 1000;
        let matchingCount = 0;
        let matchTolerance = 5;

        for(let i = 0; i < samples; i++) {
          let shuffled = corrupt.shuffleString(inputSample);
          assert.isOk(sameCounts(inputSample, shuffled), inputCounts);

          if(shuffled === inputSample) matchingCount++;
        }

        assert.closeTo(matchingCount, 0, matchTolerance);
      }
    });
  });

  describe("dropBlock", function() {
    it("should always drop at least one character", function() {
      for(let inputSample of inputSamples) {
        let samples = 1000;

        for(let i = 0; i < samples; i++) {
          let dropped = corrupt.dropBlock(inputSample);
          assert.isBelow(dropped.length, inputSample.length);
        }
      }
    });

    xit("should maintain the substrings on the left and right of the dropped block", function(){

    });
  });

  describe("corruptBlockWithRandom", function() {
    xit("should maintain the substrings on the left and right of the dropped block", function(){

    });

    xit("should nearly always change the value of the string", function() {

    });
  });

  describe("corruptBlockByShuffling", function() {
    it("should maintain the same length as the input data", function(){
      for(let inputSample of inputSamples) {
        let samples = 1000;

        for(let i = 0; i < samples; i++) {
          let corrupted = corrupt.corruptBlockByShuffling(inputSample);
          assert.equal(corrupted.length, inputSample.length);
        }
      }
    });

    xit("should maintain the substrings on the left and right of the dropped block", function(){

    });

    xit("should nearly always change the value of the string", function() {

    });
  });

  xdescribe("swapCharacters", function() {
    xit("should swap the characters at the specified locations", function() {

    });
  });

  xdescribe("bitShiftOneCharacter", function() {
    xit("should always change the string", function() {

    });
  });
});


/**
  This helper function returns an object where the keys are characters
  and the values are the number of times that character occurs in input
*/
function countCharacters(input){
  var characterCounts = {};

  for(var i = 0; i < input.length; i++){
    var c = input[i];

    if(characterCounts[c] === undefined) {
      characterCounts[c] = 1;
    }

    else {
      characterCounts[c] += 1;
    }
  }

  return characterCounts;
}

/**
  Given two strings return true if they have the same letter counts, false otherwise
*/
function sameCounts(strA, strB) {
  let countsA = countCharacters(strA);

  for(let letter of strB) {
    if(countsA[letter] === undefined) return false;
    countsA[letter] -= 1;
  }

  for(let letter in countsA) {
    let count = countsA[letter];
    if(count !== 0) {
      return false;
    }
  }

  return true;
}
