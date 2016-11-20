## Main Exercise: Checksums

Complete and export a function that accepts a single string as an input parameter. This function should return a single value which can be any primitive data-type. In order to test how your checksum algorithm performs, you can run the test suit like so:

```
npm test
```

The test suite utilizes random as input and then uses several techniques to "corrupt" the data. Because the tests are random, you may encounter a new failure after running the tests a couple of times. That said, once you've encountered a failure case, it will be saved into a JSON object located at: `/src/tests/failure-memory/previously-caught-failures.json`.

Once these failures are saved, they will always be rerun. You can reset these failure cases by replacing the text in the file `previously-caught-failures.json` with the following:

```
[]
```

##### Good Luck :)
