const DEFAULT_HASH_FUNCTION = require('./solutions/checksum').hashCodePrimeMultiplier;

// In order to enable chaining, these have a next pointer
class HashItem {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = undefined;
  }
}

class HashTable {

  /**
    Constructs a new HashTable with a fixed size. This

    @param {integer} size - the size of HashTable
    @param {Function} hashFunction - a function which accepts string input and returns an integer
  */
  constructor(size = 32, hashFunction = DEFAULT_HASH_FUNCTION) {
    // Tests rely on the name this.__array being the location used for storage. 
    this.__array = new Array(size);
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

module.exports = HashTable;
