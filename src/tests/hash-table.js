'use strict'
const HashTable = require('../hash-table');
const generate = require('../solutions/string-generator');
const assert = require('chai').assert

describe("hash-table", function() {
  it("should construct an Array of the proper length and assign the size property", function(){
    let lengths = [2, 4, 8, 16, 32, 64, 256];
    for(let testSize of lengths) {
      let hashMap = new HashTable(testSize);

      assert.isOk(Array.isArray(hashMap.__array));
      assert.equal(hashMap.__array.length, testSize);
      assert.equal(hashMap.size, testSize);
    }
  });

  describe("add and get", function() {
    it("Should be able to add and get values associated with keys without changing the length of the array", function() {
      const tableSize = 32;
      let hashTable = new HashTable(tableSize);
      let prefixs = 'abcde';

      let lengths = [2, 4, 8, 16, 32, 64, 256];
      let samples = generate.generateRandomSamples(5, lengths);

      for(let key of samples) {
        let value = Symbol();

        hashTable.add(key, value);
        assert.equal(hashTable.get(key), value);
      }

      assert.equal(hashTable.__array.length, tableSize);
    });

    it("Should be able to add and get even with colliding keys", function() {
      let badHashFunction = function(key) {
        return key.charCodeAt(0) || 0;
      }

      let hashTable = new HashTable(32, badHashFunction);
      let prefixs = 'abcde';

      let lengths = [2, 4, 8, 16, 32, 64, 256];
      let samples = generate.generateRandomSamples(5, lengths);

      for(let prefix of prefixs) {
        for(let key of samples) {

          let value = Symbol();
          key = prefix + key;

          hashTable.add(key, value);
          assert.equal(hashTable.get(key), value);
        }
      }
    });

    it("should return undefined for keys that are not in the HashTable", function() {
      let hashTable = new HashTable(32);
      let wellTestedSet = new Set();
      let prefixs = 'abcde';

      let lengths = [2, 4, 8, 16, 32, 64, 256];
      let samples = generate.generateRandomSamples(5, lengths);

      // Seed the table with a bunch of random stuff
      for(let prefix of prefixs) {
        for(let key of samples) {

          let value = key;
          key = prefix + key;

          wellTestedSet.add(key);
          hashTable.add(key, value);
        }
      }

      // Use the well tested set construct to check that we did generate a true duplicate
      let secondSamples = generate.generateRandomSamples(5, lengths);
      for(let key of samples) {
        if(!wellTestedSet.has(key)) {
          assert.equal(hashTable.get(key), undefined);
        }
      }
    });
  });

  describe("get, add, and remove", function() {
    it("using remove should cause a subsequent get to return undefined at the same key even if that key had been added previously", function() {
      let hashTable = new HashTable(32);
      let prefixs = 'abcde';

      let lengths = [2, 4, 8, 16, 32, 64, 256];
      let samples = generate.generateRandomSamples(5, lengths);

      for(let key of samples) {
        let value = Symbol();

        hashTable.add(key, value);
        assert.equal(hashTable.get(key), value);
      }

      for(let key of samples) {
        hashTable.remove(key);
        assert.equal(hashTable.get(key), undefined);
      }
    });

    it("using remove should not affect colliding, but distinct, keys", function(){
      let hashTable = new HashTable(32);
      let wellTestedSet = new Set();
      let prefixs = 'abcde';

      let lengths = [2, 4, 8, 16, 32, 64, 256];
      let samples = generate.generateRandomSamples(5, lengths);

      for(let prefix of prefixs) {
        for(let key of samples) {

          let value = key;
          key = prefix + key;

          wellTestedSet.add(key);
          hashTable.add(key, value);
        }
      }

      // Now remove half
      let counter = 0;
      let removed = [];
      let leftIn = [];
      for(let prefix of prefixs) {
        for(let key of samples) {

          let value = key;
          key = prefix + key;
          counter++;

          if(counter % 2 === 0) {
            hashTable.remove(key);
            removed.push(key);
          }
          else {
            leftIn.push(key);
          }
        }
      }

      // Removed better be removed
      for(let key of removed) {
        assert.equal(hashTable.get(key), undefined);
      }

      // left in better be accessible
      for(let key of leftIn) {
        assert.equal(hashTable.get(key), key.slice(1));
      }
    });
  });
});
