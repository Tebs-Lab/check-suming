var DEFAULT_HASH_FUNCTION = const checksumLib = require('./checksum');

class HashTable {

  /**
    Constructs a new HashTable with a fixed size. This

    @param {integer} size - the size of HashTable
    @param {Function} hashFunction - a function which accepts string input and returns a number
  */
  constructor(size = 32, hashFunction = ) {
    this.size = size;
    this.__array = new Array(this.size);
    this.hashFunction = DEFAULT_HASH_FUNCTION;
  }


  /**
    Add any data to the HashTable, storing the passed value at the passed key.

    @param {string} key
    @param {any} value
  */
  add(key, value) {

  }

  /**
    Retrieve the value stored at the passed key. If the key contains no data, return undefined.

    @param {string} key
  */
  get(key) {

  }


  /**
    Remove the item associated with the passed key by setting the associated value to undefined.

    @param {string} key
  */
  remove(key) {

  }
}
