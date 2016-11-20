'use strict'
const fs = require('fs');
const fileLocation = __dirname + '/previously-caught-failures.json';

// We load the failures once
let knownFailures = [];

try {
  let strData = fs.readFileSync(fileLocation).toString();
  knownFailures = JSON.parse(strData);
} catch (err) {
  // Failed to read, leave known failures empty
}

module.exports = {
    addFailure: function(input, corrupted) {
      if(this.failureAlreadyKnown(input, corrupted)) return;

      let failures = this.fetchKnownFailures();
      let newFailure = {
        input,
        corrupted
      };
      failures.push(newFailure);
  },

  fetchKnownFailures: function() {
    return knownFailures;
  },

  failureAlreadyKnown: function(input, corrupted) {
    let failures = this.fetchKnownFailures();

    for(let testCase of knownFailures) {
      if(testCase.input === input && testCase.corrupted === corrupted) {
        return true;
      }
    }

    return false;
  },

  serializeFailures: function() {
    fs.writeFileSync(fileLocation, JSON.stringify(knownFailures));
  }
}
