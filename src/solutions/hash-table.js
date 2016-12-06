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

  
}
