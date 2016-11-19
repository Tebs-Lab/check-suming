const computeChecksum = require('../checksum');
const corrupt = require('../corrupt-string');
const assert = require('chai').assert

describe("checksum", function() {

  describe("checksum detects random corruption", function () {

    it("should throw a TypeError for all non-string input", function() {
      let unsafeData = [{}, [], undefined, null, true, 0];

      for(data of unsafeData) {
        let boundChecksum = computeChecksum.bind(null, data);
        assert.throws(boundChecksum, TypeError);
      }
    });

    it("should deterministically return the same result for the same input", function() {
      for(let stringLength = 0; stringLength < 64; stringLength++) {
        let strings = corrupt.generateRandomStrings(20, 256)

        for(string of strings) {
          let randomString = corrupt.generateRandomString(stringLength);
          let baseline = computeChecksum(randomString)

          for(let trials = 0; trials < 16; trials++) {
            let checksum = computeChecksum(randomString);
            assert.equal(checksum, baseline);
          }
        }
      }
    });

    xit("should detect shuffling the input string", function() {

    });

    xit("should detect dropping a chunk of data", function() {

    });

    xit("should detect replacing a chunk of data with random data", function() {

    });

    xit("should detect randomly shuffling a chunk of data", function() {

    });

    xit("should detect swapping any two chacaters", function() {

    });

    xit("should detect random, unmatching, input data", function() {

    });
  });
});
