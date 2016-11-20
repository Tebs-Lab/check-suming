# Generating Random Test Data

[Random Testing](https://en.wikipedia.org/wiki/Random_testing) is a powerful and well studied test paradigm. Random testing is especially powerful when the __input space__ is very large, and thus cannot reasonably be tested in it's entirety. In our case, the input space is "all strings of any length" -- surely that's too large to test.

## Your Task

This section is all about the file `/src/string-generator.js`. When you're finished, string-generator will be a reasonably flexible library for generating random string data. Specifically it will be able to:

1. Generate a single random character
2. Generate a random string of a specified length
3. Generate an Array of random strings where you can specify the length of the string, and length of the returned Array.
4. Generate a larger sample of random data where you can specify a list of lengths and the number of strings to generate for each length.

Complete the string-generator file such that it passes the tests. Remember, if you get stuck or want to skip this step you can use the contents of the file in `/src/solutions/string-generator.js`.
