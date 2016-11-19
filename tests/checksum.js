const computeChecksum = require('../src/checksum');
const corrupt = require('./lib/corrupt-string');

function test(checksumFunction){

  var failedTests = [];
  var trueCorruptions = 0;
  var detectedCorruptions = 0;

  for(var i = 0; i < 1000; i++) {
    // Create a string, maybe corrupt it
    var str = createRandomString();
    var maybeCorrupted = corruptDataRandomly(str);

    // Compute the checksum of each piece of data
    var inputChecksum = checksumFunction(str);
    var outputChecksum = checksumFunction(maybeCorrupted);

    // Test if you followed the rules
    if(parseInt(inputChecksum) !== inputChecksum || parseInt(outputChecksum) !== outputChecksum){
      console.log("Sorry, your checksum function did not return an integer. checksum values were: ");
      console.log(inputChecksum);
      console.log(outputChecksum);
      console.log("quitting now");
      return;
    }

    // We have the benefit of actually knowing for sure if the data is corrupt when we test.
    var trulyCorrupted = (str !== maybeCorrupted);
    if(trulyCorrupted){
      trueCorruptions += 1;
    }

    // did our checksum detect corruption?
    var checksumSaysCorrupted = (inputChecksum !== outputChecksum);
    if(checksumSaysCorrupted) {
      detectedCorruptions += 1;
    }

    // If our checksum detector reports a different result than the real one
    // make a note of it.
    if(trulyCorrupted !== checksumSaysCorrupted) {
      var testLog = {
        originalData: str,
        corruptedData: maybeCorrupted,
        originalChecksum: inputChecksum,
        corruptedChecksum: outputChecksum,
        trulyCorrupted: trulyCorrupted,
      }
      failedTests.push(testLog);
    }
  }

  var falsePositives = 0;
  var falseNegatives = 0;

  for(var i = 0; i < failedTests.length; i++){
    var f = failedTests[i];
    console.log("\n===========================");
    if(f.trulyCorrupted){
      console.log("Corruption exists, but was not detected!");
      falseNegatives += 1;
    }
    else {
      console.log("No corruption exists, but some was detected!");
      falsePositives += 1;
    }
    console.log("input:  " + f.originalData);
    console.log("output: " + f.corruptedData);
    console.log("in checksum:  " + f.originalChecksum);
    console.log("out checksum: " + f.corruptedChecksum);
  }

  console.log("=====STATISTICS======")
  console.log("True Corruptions: " + trueCorruptions);
  console.log("Detected Corruptions: " + detectedCorruptions);
  console.log("False Positives: " + falsePositives);
  console.log("False Negatives: " + falseNegatives);
}

/*
  Given a string (maybe) change some of the characters
*/
function corruptDataRandomly(importantData) {

  var randomNumber = Math.random();
  // 10% of the time, a randomly sized block of the importantData will be changed
  if(randomNumber < .1) {
    return corruptBlock(importantData);
  }
  // 10% of the time, two characters will be swapped. This is harder to detect.
  else if(randomNumber < .2) {
    return corruptBySwapping(importantData);
  }
  // 10% of the time, the data will be shuffled
  else if(randomNumber < .3) {
    return shuffleString(importantData);
  }
  // 10% of the time, one character will be bit-shifted left once
  else if(randomNumber < .4) {
    return shiftOneCharacter(importantData);
  }
  // 10% of the time, the data will just be replaced wholesale
  else if(randomNumber < .5){
    return createRandomString();
  }

  return importantData;
}
