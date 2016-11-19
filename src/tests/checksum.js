const computeChecksum = require('../checksum');
const corrupt = require('../corrupt-string');
const generate = require('../string-generator');
const assert = require('chai').assert

const FALSE_POSITIVE = "FALSE POSITIVE -- detected corruption when there was none"
const FALSE_NEGATIVE = "FALSE NEGATIVE -- did not detect corruption";
const TRUE_POSITIVE = "CORRUPTION DETECTED";
const TRUE_NEGATIVE = "NO CORRUPTION DETECTED";

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
    return [false, msg];
  }

  let msg = corrupted ? TRUE_POSITIVE : TRUE_NEGATIVE;
  return [true, msg];
}

describe("checksum", function() {

  const testStrings = generate.generateRandomSample(50, 256);

  describe("checksum detects random corruption", function () {

    it("should throw a TypeError for all non-string input", function() {
      let unsafeData = [{}, [], undefined, null, true, 0];

      for(data of unsafeData) {
        let boundChecksum = computeChecksum.bind(null, data);

        assert.throws(boundChecksum, TypeError);
      }
    });

    it("should deterministically return the same result for the same input", function() {
      for(randomString of testStrings) {
        let baseline = computeChecksum(randomString)

        for(let trials = 0; trials < 16; trials++) {
          let checksum = computeChecksum(randomString);

          assert.equal(checksum, baseline);
        }
      }
    });

    it("should detect shuffling the input string", function() {
      for(input of testStrings) {
        let corrupted = corrupt.shuffleString(input);
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

        assert.isTrue(checksumWorks, `${msg} for input:   ${input}\n corrupted: ${corrupted}`)
      }
    });

    it("should detect dropping a chunk of data", function() {
      for(input of testStrings) {
        let corrupted = corrupt.dropBlock(input);
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

        assert.isTrue(checksumWorks, `${msg} for input:   ${input}\n corrupted: ${corrupted}`)
      }
    });

    it("should detect replacing a chunk of data with random data", function() {
      for(input of testStrings) {
        let corrupted = corrupt.corruptBlockWithRandom(input);
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

        assert.isTrue(checksumWorks, `${msg} for input:   ${input}\n corrupted: ${corrupted}`)
      }
    });

    it("should detect randomly shuffling a chunk of data", function() {
      for(input of testStrings) {
        let corrupted = corrupt.corruptBlockByShuffling(input);
        let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

        assert.isTrue(checksumWorks, `${msg} for input:   ${input}\n corrupted: ${corrupted}`)
      }
    });

    it("should detect bit shifting single characters within the string", function() {
      this.timeout(30000); // 30 seconds, this is an exhaustive test
      for(input of testStrings) {
        for(let samples = 0; samples < input.length; samples++) {
          let corrupted = corrupt.bitShiftOneCharacter(input);
          let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

          assert.isTrue(checksumWorks, `${msg} for input:   ${input}\n corrupted: ${corrupted}`)
        }
      }
    });

    it("should detect swapping any two chacaters", function() {
      this.timeout(30000); // 30 seconds, this is an exhaustive test
      for(input of testStrings) {
        for(let x = 0; x < input.length; x++) {
          for(let y = x; y < input.length; y++) {
            let corrupted = corrupt.swapCharacters(input, x, y);
            let [checksumWorks, msg] = checksumDetectionStatus(input, corrupted);

            assert.isTrue(checksumWorks, `${msg} for input:   ${input}\n corrupted: ${corrupted}`)
          }
        }
      }
    });
  });
});
