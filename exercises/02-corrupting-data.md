# Corrupting Data

One tactic for our random checksum testing could be described like this:

* Generate a large number of unique strings
* Test that each one produces a unique hash value

This would actually work surprisingly well -- we would find collisions in cryptographically weak hash functions, we would not find them in strong functions.
