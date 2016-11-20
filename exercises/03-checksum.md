# Finally: Writing Checksums

Now that our code can both generate and corrupt random test data, it's time to make some checksum algorithms!

## What Should My Function Do?

Thats a great question -- it's up to you. There are lots of well known strategies for writing a hash function, maybe you should try searching on google for some. I'll give you some keywords to try:

* Hash function
* Hash function implementation
* Cryptographic hash function
* How to hash a string

The main point is to make sure your function produces a value deterministically (meaning the same input always maps to the same output) and if the hash function is run on different input it should produce different output. This isn't always easy ... in fact to consistently pass ALL the tests you'd probably need to use a well known library like the `crypto` package.

Another note: you can pass all the tests by simply returning the inputString itself. In practice however, the point of a checksum is to have significantly less data than the original. A very practical restriction which you should follow in order to get the most out of this exercise, is to make the return value from your function an integer.

## A Note About Random Testing

Because the tests are random, you may encounter a new failure after running the tests a couple of times. That said, once you've encountered a failure case, it will be saved into a JSON object located at: `/src/tests/failure-memory/previously-caught-failures.json`. This may sound strange if you have not encountered it before, but [Random Testing](https://en.wikipedia.org/wiki/Random_testing) is actually a very powerful and well studied tactic for testing some types of algorithms.

Once these failures are saved, they will always be rerun on subsequent test runs. You can reset these failure cases by deleting the previously mentioned file `previously-caught-failures.json`.
