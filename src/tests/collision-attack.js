'use strict'
const collide = require('../collision-attack');
const checksums = require('../solutions/checksum');
const generate = require('../solutions/string-generator');
const assert = require('chai').assert;

describe("collision-attack", function() {

  describe("collideWithSimpleSum", function() {
    const sampleLengths = [256, 512];
    const testStrings = generate.generateRandomSamples(500, sampleLengths);

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
    const sampleLengths = [256, 512];
    const testStrings = generate.generateRandomSamples(500, sampleLengths);

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

  describe("collideWithCharCodeTimesIndex", function() {
    it("Should always produce a value that matches the input checksum using only characters from a restricted set", function(){
      const sampleLengths = [4, 8, 16, 32, 64];
      const testStrings = generate.generateRandomSamples(10, sampleLengths);

      // To speed up the tests
      let charSet = new Set(generate.alphaChars.split(''));
      this.timeout(30000); // 30 second limit...

      for(let testCase of testStrings) {
        let checksum = checksums.charcodeTimesIndex(testCase);
        let collisionData = collide.collideWithCharCodeTimesIndex(checksum, generate.alphaChars);
        let collision = checksums.charcodeTimesIndex(collisionData);
        assert.equal(collision, checksum, `checksum didn't match for test case ${testCase}, returned ${collisionData}`)

        for(let character of collisionData) {
          assert.isOk(charSet.has(character), `Restricted character in collision: ${character}`);
        }
      }
    });
  });
});
