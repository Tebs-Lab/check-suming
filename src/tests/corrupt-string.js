'use strict'
const corrupt = require('../corrupt-string');
const assert = require('chai').assert

describe("corrupt-string", function() {

  xdescribe("shuffleString", function() {

    // Should test that input and output aren't commonly the same
    // for each test
    beforeEach(function() {

    });

    afterEach(function(){

    });

    xit("should contain the same letter count as the input data" function(){

    });
  });

  xdescribe("dropBlock", function() {
    xit("should always drop at least one character", function(){

    });

    xit("should maintain the substrings on the left and right of the dropped block", function(){

    });
  });

  xdescribe("corruptBlockWithRandom", function() {
    xit("should maintain the same length as the input data", function(){

    });

    xit("should maintain the substrings on the left and right of the dropped block", function(){

    });

    xit("should nearly always change the value of the string", function() {

    });
  });

  xdescribe("corruptBlockByShuffling", function() {
    xit("should maintain the same length as the input data", function(){

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
