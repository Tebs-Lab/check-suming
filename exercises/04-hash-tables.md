# Hash Tables

Another application of a hash function is for use in a hash table. Hash tables are a data store which uses key/value pairs to store data. A hash function is used to change the key into an index for an array (or an offset to a contiguous block of memory). Using a hash function to change a key (which is arbitrary data) into an index (which is always an integer) allows us to search by key very quickly.

Consider Linked Lists and Arrays, in these data structures if we wish to know that a specific value is in the collection, we have to scan the entire collection for that value. In a Hash Table instead of scanning the collection we compute the hash value of the key, use that integer as the index for our array. Using the hash value (the integer) we go directly to the memory location associated with our key, and either the value is there or it is not -- we don't have to look at __any other__ values in the array.

### Implementation

Hash Tables are generally backed by an array. An object is created that allocates a block of memory, and restricts access to that memory to a few exposed methods:

`set(key, value)`: Associates the provided key with the provided value.

`get(key)`: Fetches the value associated with the provided key, or returns something to indicate that nothing is associated with that key (`undefined`, or `null` commonly)

`remove(key)`: disassociates any value currently associated with the provided key.

For all of these methods the hash code of the provided key is computed and used as the index in the underlying array. The item is set, returned, or removed from the array at that computed index.

It's very common to store BOTH the key and the value in such a data structure. Consider the Object in JavaScript. We can recover all the keys using `Object.keys(myObject)` -- this is only possible if you store the key values. This also helps us resolve collisions because we can directly compare the key values to tell if a collision is data at the SAME key or just a hash collision

### Finite Storage and Collisions

When we were building checksum algorithms our main goal was to write functions that had *zero* collisions, regardless of input data. Such hash functions are sometimes called "Cryptographically Secure". Hash Tables are __not__ generally concerned with cryptographic security -- and in fact Hash Tables are built with the assumption that there __will__ be collisions. The reason for this is that our storage space is finite.

Imagine you have an array with length 50 -- can you put 51 items in this array without expanding the array?

This problem, called the __pigeonhole principle__, is an intuitive way of understanding that if our hash table has a finite amount of memory to use, it will definitely have collisions if we try to put more data than it has capacity for.

So, what are our options when we inevitably encounter a hash collision?

#### Chaining

One common strategy is to make the items that we actually store in the hash table are linked lists. Meaning we store the data, as well as a pointer to the "next" piece of data. Initially the "next" data is just `null` or `undefined`. As soon as a collision occurs, we store that data as the "next" member of the data that already occupies that space in the hash table.

#### Resizing

Among the powerful benefits of using a hash table is the `O(1)` or "constant time" lookup speed. But, with a chaining strategy, this stops being true. Imagine your hash table's array was size 1 -- now inserting, removing, and fetching are all `O(n)`, or "linear time" operations. (If this notation is new to you, read up on [Big O Notation]( Often a hash table will use a chaining strategy until there are 3-5 collisions in a single index, then resize after that.)). Essentially, with a chaining strategy and a hash table with a fixed size, then you're actually searching through a Linked List.

In order to combat this, many hash tables will dynamically resize themselves after a certain number of collisions have occurred. For example a hash table may use a chaining strategy until there are 3-5 collisions in any single index, then resize after that. Resizing typically means making a new array that is twice as large as the current array, then re-inserting all the values into the larger array.

#### Other Options You Can Read About

[Linear Probing](https://en.wikipedia.org/wiki/Linear_probing)  
[Cuckoo Hashing](https://en.wikipedia.org/wiki/Cuckoo_hashing)

###### Note That

The tests found here do not put a restriction on how you handle collisions, but they do require you to handle them. Our tests also do not place restrictions on resizing -- in fact our solution does not resize, and so cannot be safely said to be an `O(1)` access/remove/add data structure. Consider challenging yourself to create a dynamic hash table, that automatically resizes itself when many collisions occur.

Now, complete the implementation the hash table class found in the src folder.
