'use strict'
const collide = require('../solutions/collision-attack');
const checksums = require('../solutions/checksum');
const generate = require('../solutions/string-generator');
const assert = require('chai').assert

const sampleLengths = [256, 512];
const testStrings = generate.generateRandomSamples(500, sampleLengths);

describe("collision-attack", function() {

  describe("collideWithSimpleSum", function() {
    it("Should always produce a value that matches the input checksum", function(){
      for(let testCase of testStrings) {
        let checksum = checksums.charcodeSum(testCase);
        let collisionData = collide.collideWithSimpleSum(checksum);
        let collision = checksums.charcodeSum(collisionData);

        assert.equal(collision, checksum, `checksum didn't match for test case ${testCase}, returned ${collisionData}`)
      }
    });
  });

  describe("collideWithSimpleSumRestricted", function() {
    it("Should always produce a value that matches the input checksum using only characters from a restricted set", function(){
      // To speed up the tests
      let charSet = new Set(generate.alphaChars.split(''));

      for(let testCase of testStrings) {
        let checksum = checksums.charcodeSum(testCase);
        let collisionData = collide.collideWithSimpleSumRestricted(checksum, generate.alphaChars);
        let collision = checksums.charcodeSum(collisionData);
        assert.equal(collision, checksum, `checksum didn't match for test case ${testCase}, returned ${collisionData}`)

        for(let character of collisionData) {
          assert.isOk(charSet.has(character), `Restricted character in collision: ${character}`);
        }

      }
    });
  });
});
