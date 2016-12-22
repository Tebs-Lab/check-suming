const DEFAULT_HASH_FUNCTION = require('./checksum').hashCodePrimeMultiplier;

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
    let hashItem = new HashItem(key, value);
    let currentItem = this.__array[hashCode];

    if(currentItem === undefined) {
      this.__array[hashCode] = hashItem;
    }
    else {
      while(currentItem.next !== undefined) {
        currentItem = currentItem.next;
      }

      currentItem.next = hashItem;
    }
  }

  /**
    Retrieve the value stored at the passed key. If the key contains no data, return undefined.

    @param {string} key
  */
  get(key) {
    let hashCode = this.hashFunction(key);
    let currentItem = this.__array[hashCode];

    while(currentItem !== undefined && currentItem.key !== key) {
      currentItem = currentItem.next;
    }

    if(currentItem) {
      return currentItem.value
    }

    return currentItem;
  }


  /**
    Remove the item associated with the passed key by setting the associated value to undefined.

    @param {string} key
  */
  remove(key) {
    let hashCode = this.hashFunction(key);
    let previousItem = undefined;
    let currentItem = this.__array[hashCode];

    while(currentItem !== undefined && currentItem.key !== key) {
      previousItem = currentItem;
      currentItem = currentItem.next;
    }

    // not found
    if(currentItem === undefined) {
      return;
    }
    // Found, at the first chain
    else if(previousItem === undefined && currentItem.key === key) {
      this.__array[hashCode] = currentItem.next;
    }
    // Found, anywhere else in the chain
    else {
      previousItem.next = currentItem.next
    }
  }
}

module.exports = HashTable;
