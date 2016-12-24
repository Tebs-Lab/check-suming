# Corrupting Data

One tactic for our random checksum testing could be described like this:

* Generate a large number of unique strings
* Test that each one produces a unique hash value

This would actually work surprisingly well -- we would find collisions in cryptographically weak hash functions, we would not find them in strong functions. However, simply generating random data doesn't help us understand how to attack hash functions, and doesn't directly simulate interference. It also doesn't help us think about __collision attacks__ at all.

## Your Task

In an attempt to simulate both corruption, and malicious users, you're going to simulate several kinds of corruption occurring on the randomly generated data. These corruptions could either be a sign that a [man in the middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) is altering the data, or that electrical interference is altering the data.

Practicing this kind of manipulation will help you get into the mindset of a hacker. Many of these corruptions were designed specifically in order to break some of the hash functions found in the `/src/solutions/checksum.js` file. When security experts work on creating a __collision attack__ they have to think deeply about the algorithm and how to generate specific data that will result in a collision -- these corruption functions are no different.

Complete the functions in `/src/corrupt-string.js`. Descriptions of each function are found in the comments.

## Bonus: Testing

While some tests are provided to test that your corruption methods are working, they are not sufficient to prove that your code definitely corrupts the data. In fact, there are "pending" tests marked by `xdescribe` and `xit` blocks which do not have tests filled in. Could you write code that satisfies the constraints described in the tests?

## Remember:

You can skip ahead by using the solutions found in `/src/solutions/corrupt-string.js`. You can also skip ahead and then come back to implementing the corruption techniques yourself after building the checksums. After working on checksum yourself, look at the solutions and see if you can figure out which of my provided solutions are going to be most vulnerable to specific kinds of corruption!

To run the tests for just data corruption, from the root directory run:

```
mocha src/tests/corrupt-string.js
```
