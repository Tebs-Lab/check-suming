'use strict'
const HashTable = require('../solutions/hash-table');
const generate = require('../solutions/string-generator');
const assert = require('chai').assert

describe("hash-table", function() {
  it("should construct an Array of the proper length and assign the size property", function(){
    const testSize = 64;
    let hashMap = new HashTable(testSize);

    assert.isOk(Array.isArray(hashMap.__array));
    assert.equal(hashMap.__array.length, testSize);
    assert.equal(hashMap.size, testSize);
  });

  describe("add", function (){
    it("should store a value at the index associated with the keys hash code", function() {
      let lengths = [2, 4, 8, 16, 32, 64, 256];
      let samples = generate.generateRandomSamples(5, lengths);

      for(let key of samples) {
        let value = Symbol();
        let hashMap = new HashTable();

        hashMap.add(key, value);
        let hashCode = hashMap.hashFunction(key);
        assert.equal(hashMap.__array[hashCode], value);
      }
    });

    xit("should throw an error if a collision is created", function(){

    });
  });

  xdescribe("get", function() {
    xit("should return the value stored at the Array index associated with the passed in key's hash code.", function() {

    });
  });

  xdescribe("get, add, and remove", function() {
    xit("Get should return a value stored with the same key using the add function", function(){

    });

    xit("using remove should cause a subsequent get to return undefined at the same key even if that key had been added previously", function() {

    });
  });
});
