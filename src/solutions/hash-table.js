const DEFAULT_HASH_FUNCTION = require('./checksum').hashCodePrimeMultiplier;

class HashItem {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {

  /**
    Constructs a new HashTable with a fixed size. This

    @param {integer} size - the size of HashTable
    @param {Function} hashFunction - a function which accepts string input and returns an integer
  */
  constructor(size = 32, hashFunction = DEFAULT_HASH_FUNCTION) {
    this.size = size;
    this.__array = new Array(this.size);

    // Never allow our hash to return a negative number or non-integer
    this.hashFunction = function(key) {
      return Math.abs(hashFunction(key) % this.size);
    }
  }


  /**
    Add any data to the HashTable, storing the passed value at the passed key.

    @param {string} key
    @param {any} value
  */
  add(key, value) {
    let hashCode = this.hashFunction(key);
    let item = new HashItem(key, value);
    this.__array[hashCode] = item;
  }

  /**
    Retrieve the value stored at the passed key. If the key contains no data, return undefined.

    @param {string} key
  */
  get(key) {
    let hashCode = this.hashFunction(key);
    this.__array[hashCode] = value;
  }


  /**
    Remove the item associated with the passed key by setting the associated value to undefined.

    @param {string} key
  */
  remove(key) {
    let hashCode = this.hashFunction(key);
    this.__array[hashCode] = undefined;
  }
}

module.exports = HashTable;
