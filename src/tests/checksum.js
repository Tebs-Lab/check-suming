'use strict'

const computeChecksum = require('../checksum');
const corrupt = require('../corrupt-string');
const generate = require('../string-generator');
const saveFailure = require('./failure-memory/save-failure-case');
const assert = require('chai').assert

const FALSE_POSITIVE = "FALSE POSITIVE -- detected corruption when there was none"
const FALSE_NEGATIVE = "FALSE NEGATIVE -- did not detect corruption";
const TRUE_POSITIVE = "CORRUPTION DETECTED";
const TRUE_NEGATIVE = "NO CORRUPTION DETECTED";

describe("checksum", function() {

  const sampleLengths = [1, 2, 4, 8, 16, 32, 64];
  const testStrings = generate.generateRandomSamples(500, sampleLengths);

  after(function() {
    saveFailure.serializeFailures();
  })

  describe("checksum detects random corruption", function () {

    var failuresThisTest;
    beforeEach(function() {
      failuresThisTest = [];
    });

    afterEach(function() {
      let allFailures = failuresThisTest.reduce(function(messageBuilder, current){
        return messageBuilder + current;
      }, '');

      // Workaround for https://github.com/mochajs/mocha/issues/1635
      try {
        assert.lengthOf(failuresThisTest, 0, `${failuresThisTest.length} Failures:\n${allFailures}`);
      } catch (err){
        this.test.error(err);
      }
    });

    // ===================== TESTS ====================
    it("should throw a TypeError for all non-string input", function() {
      let unsafeData = [{}, [], undefined, null, true, 0];

      for(let data of unsafeData) {
        let boundChecksum = computeChecksum.bind(null, data);

        assert.throws(boundChecksum, TypeError);
      }
    });

    it("should deterministically return the same result for the same input", function() {
      for(let randomString of testStrings) {
        let baseline = computeChecksum(randomString)

        for(let trials = 0; trials < 16; trials++) {
          let checksum = computeChecksum(randomString);

          assert.equal(checksum, baseline);
        }
      }
    });

    it("should detect shuffling the input string", function() {
      for(let input of testStrings) {
        let corrupted = corrupt.shuffleString(input);
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

        if(!checksumWorks) failuresThisTest.push(msg);
        if(!checksumWorks) {
          failuresThisTest.push(msg);
        }
      }
    });

    it("should detect dropping a chunk of data", function() {
      for(let input of testStrings) {
        let corrupted = corrupt.dropBlock(input);
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

        if(!checksumWorks) failuresThisTest.push(msg);
      }
    });

    it("should detect replacing a chunk of data with random data", function() {
      for(let input of testStrings) {
        let corrupted = corrupt.corruptBlockWithRandom(input);
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

        if(!checksumWorks) failuresThisTest.push(msg);
      }
    });

    it("should detect randomly shuffling a chunk of data", function() {
      for(let input of testStrings) {
        let corrupted = corrupt.corruptBlockByShuffling(input);
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

        if(!checksumWorks) failuresThisTest.push(msg);
      }
    });

    it("should detect bit shifting single characters within the string", function() {
      this.timeout(30000); // 30 seconds, this is an exhaustive test
      for(let input of testStrings) {
        for(let samples = 0; samples < input.length; samples++) {
          let corrupted = corrupt.bitShiftOneCharacter(input);
          let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

          if(!checksumWorks) failuresThisTest.push(msg);
        }
      }
    });

    it("should detect swapping two chacaters", function() {
      for(let input of testStrings) {
        for(let samples = 0; samples < 30; samples++) {
          let x = Math.floor(Math.random() * input.length);
          let y = Math.floor(Math.random() * input.length);

          let corrupted = corrupt.swapCharacters(input, x, y);
          let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

          if(!checksumWorks) failuresThisTest.push(msg);
        }
      }
    });

    it("Should handle previously found failure cases", function() {
      let knownFailures = saveFailure.fetchKnownFailures();

      for(let testCase of knownFailures) {
        let [checksumWorks, msg] = checksumDetectionStatus(testCase.input, testCase.corrupted);

        if(!checksumWorks) failuresThisTest.push(msg);;
      }
    });
  });

  /**
    This function helps test if the checksum algorithm works.
    We accept two strings, mocking the sender and receiever,
    compute the checksum on both, and report whether the checksum
    detects corruption correctly.

    We return an array where the first value is success/failure
    and the second is a message about the success/failure
  */
  function checksumDetectionStatus(sentStr, receivedStr) {
    let sentChecksum = computeChecksum(sentStr);
    let receivedChecksum = computeChecksum(receivedStr);

    let corrupted = sentStr !== receivedStr;
    let corruptionDetected = sentChecksum !== receivedChecksum;

    if(corrupted !== corruptionDetected){
      let msg = corrupted ? FALSE_NEGATIVE : FALSE_POSITIVE;

      // Before reporting failure, save the failure to our failure memory
      saveFailure.addFailure(sentStr, receivedStr);

      let fullMessage = generateFailureMessage(msg, sentStr, receivedStr, sentChecksum, receivedChecksum)

      return [false, fullMessage];
    }

    let msg = corrupted ? TRUE_POSITIVE : TRUE_NEGATIVE;
    return [true, msg];
  }

  function generateFailureMessage(msg, sentStr, receivedStr, sentChecksum, receivedChecksum) {
    return(
    `
    =========================
    ${msg} DETECTED
    input:     ${sentStr} : ${sentChecksum}
    corrupted: ${receivedStr} : ${receivedChecksum}
    `);
  }
});
