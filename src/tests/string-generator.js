'use strict'
const assert = require('chai').assert
const generate = require('../string-generator');

describe("string-generator", function() {

  describe("getRandomCharacter", function() {
    let alphaChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charSet = new Set(alphaChars.split(''));

    it("should always generate a single letters from [a-zA-Z]", function() {
      for(let i = 0; i < 10000; i++) {
        let char = generate.getRandomCharacter();
        assert.isTrue(charSet.has(char), char);
      }
    });
  });

  describe("generateRandomString", function() {
    it("should generate a string of the specified length", function() {
      for(let i = 0; i < 256; i++) {
        let str = generate.generateRandomString(i);
        assert.equal(str.length, i);
      }
    });

    it("should not commonly generate the same string", function() {
      let sizeGenerated = 8; // 52 options, 8 chars --> 52^8 possible strings
      let totalGenerated = 100000;
      let tolerableCollisionRate = .0001;

      let uniqueStrings = new Set();
      for(let i = 0; i < totalGenerated; i++) {
        uniqueStrings.add(generate.generateRandomString(sizeGenerated))
      }

      assert.closeTo(uniqueStrings.size, totalGenerated, tolerableCollisionRate * totalGenerated);
    });
  });

  describe("generateRandomStrings", function() {
    it("should return an array of the specified length", function() {
      let strLength = 8;
      for(let i = 0; i < 64; i++) {
        let strings = generate.generateRandomStrings(i, strLength);
        assert.equal(strings.length, i);
      }
    });
  });

  describe("generateRandomSamples", function(){
    it("should generate the provided number of samples for each provided length", function() {
      let lengths = [2, 4, 8, 16, 32, 64, 256];

      for(let num = 1; num < 10; num++) {
        let samples = generate.generateRandomSamples(num, lengths);
        assert.equal(samples.length, num * lengths.length)

        for(let sampleIdx = 0; sampleIdx < samples.length; sampleIdx++) {
          let str = samples[sampleIdx];
          let lengthIdx = Math.floor(sampleIdx / num);
          let curLength = lengths[lengthIdx];

          assert.equal(str.length, curLength);
        }
      }
    });
  });
});
