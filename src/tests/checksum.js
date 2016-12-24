'use strict'

const checksumLib = require('../solutions/checksum');
const corrupt = require('../solutions/corrupt-string');
const generate = require('../solutions/string-generator');
const saveFailure = require('./failure-memory/save-failure-case');
const assert = require('chai').assert

const FALSE_POSITIVE = "FALSE POSITIVE"
const FALSE_NEGATIVE = "FALSE NEGATIVE";
const TRUE_POSITIVE = "CORRUPTION DETECTED";
const TRUE_NEGATIVE = "NO CORRUPTION DETECTED";
const FULL_MSG_MAXIMUM = 5;

const sampleLengths = [1, 2, 4, 8, 16, 32, 64, 128, 256];
const testStrings = generate.generateRandomSamples(500, sampleLengths);

let [, , , ...fnNames] = process.argv;
if(fnNames.length === 0) fnNames = Object.keys(checksumLib);
console.log(fnNames)

describe('checksum.js', function() {
  for(let functionName of fnNames) {
    describe(functionName, makeTestBlock(checksumLib[functionName]));
  }
});

// Each test gets it's own block, nifty
function makeTestBlock(computeChecksum) {
  return function() {
    after(function() {
      saveFailure.serializeFailures();
    });

    let failureMessages;
    let failuresThisTest;

    beforeEach(function() {
      failureMessages = [];
      failuresThisTest = 0;
    });

    function updateFailures(msg, sentStr, receivedStr) {
        failuresThisTest += 1;
        if(failuresThisTest < FULL_MSG_MAXIMUM) {
          failureMessages.push(msg);
          saveFailure.addFailure(sentStr, receivedStr);
        }
    }

    // Because failing in afterEach causes a success AND a failure...
    function testFailures() {
      let firstFailures = failureMessages.slice(0, 5).reduce(function(messageBuilder, current){
        return messageBuilder + current;
      }, '');

      assert.equal(failuresThisTest, 0, `${failuresThisTest} Failures:\n${firstFailures}`);
    }

    // ===================== TESTS ====================
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
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted, computeChecksum);

        if(!checksumWorks) updateFailures(msg, input, corrupted)
      }

      testFailures();
    });

    it("should detect dropping a chunk of data", function() {
      for(let input of testStrings) {
        let corrupted = corrupt.dropBlock(input);
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted, computeChecksum);

        if(!checksumWorks) updateFailures(msg, input, corrupted)
      }

      testFailures()
    });

    it("should detect replacing a chunk of data with random data", function() {
      for(let input of testStrings) {
        let corrupted = corrupt.corruptBlockWithRandom(input);
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted, computeChecksum);

        if(!checksumWorks) updateFailures(msg, input, corrupted)
      }

      testFailures()
    });

    it("should detect randomly shuffling a chunk of data", function() {
      for(let input of testStrings) {
        let corrupted = corrupt.corruptBlockByShuffling(input);
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted, computeChecksum);

        if(!checksumWorks) updateFailures(msg, input, corrupted)
      }

      testFailures()
    });

    it("should detect bit shifting single characters within the string", function() {
      this.timeout(30000); // 30 seconds, this is an exhaustive test
      for(let input of testStrings) {
        for(let samples = 0; samples < input.length; samples++) {
          let corrupted = corrupt.bitShiftOneCharacter(input);
          let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted, computeChecksum);

          if(!checksumWorks) updateFailures(msg, input, corrupted)
        }
      }

      testFailures()
    });

    it("should detect swapping two chacaters", function() {
      for(let input of testStrings) {
        for(let samples = 0; samples < 10; samples++) {
          let x = Math.floor(Math.random() * input.length);
          let y = Math.floor(Math.random() * input.length);

          let corrupted = corrupt.swapCharacters(input, x, y);
          let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted, computeChecksum);

          if(!checksumWorks) updateFailures(msg, input, corrupted)
        }
      }

      testFailures()
    });

    it("Should handle previously found failure cases", function() {
      let knownFailures = saveFailure.fetchKnownFailures();

      for(let testCase of knownFailures) {
        let [checksumWorks, msg] = checksumDetectionStatus(testCase.input, testCase.corrupted, computeChecksum);

        if(!checksumWorks) updateFailures(msg, testCase.input, testCase.corrupted)
      }

      testFailures()
    });
  }
}

/**
  This function helps test if the checksum algorithm works.
  We accept two strings, mocking the sender and receiever,
  compute the checksum on both, and report whether the checksum
  detects corruption correctly.

  We return an array where the first value is success/failure
  and the second is a message about the success/failure
*/
function checksumDetectionStatus(sentStr, receivedStr, computeChecksum) {
  let sentChecksum = computeChecksum(sentStr);
  let receivedChecksum = computeChecksum(receivedStr);

  let corrupted = sentStr !== receivedStr;
  let corruptionDetected = sentChecksum !== receivedChecksum;

  if(corrupted !== corruptionDetected){
    let msg = corrupted ? FALSE_NEGATIVE : FALSE_POSITIVE;
    let fullMessage = generateFailureMessage(msg, sentStr, receivedStr, sentChecksum, receivedChecksum)

    return [false, fullMessage];
  }

  let msg = corrupted ? TRUE_POSITIVE : TRUE_NEGATIVE;
  return [true, msg];
}

/**
  Create a failure message.
*/
function generateFailureMessage(msg, sentStr, receivedStr, sentChecksum, receivedChecksum) {
  return(
  `
  =========================
  ${msg} DETECTED
  input:     ${sentStr} : ${sentChecksum}
  corrupted: ${receivedStr} : ${receivedChecksum}
  `);
}
