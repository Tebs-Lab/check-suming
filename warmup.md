## Warm-up: Binary Encoding

First, lets look at an example of how text data can be turned into a series of __bits__. This process is called __binary encoding__ and there are many different rules for encoding strings to binary data. Try this [text to binary encoder](http://www.binaryhexconverter.com/ascii-text-to-binary-converter). It uses one such rule-set to change text into binary, specifically this website uses a protocol called [`ascii`](https://en.wikipedia.org/wiki/ASCII). We can also [convert the binary back into text](http://www.binaryhexconverter.com/binary-to-ascii-text-converter) using a backwards converter. In `ascii` each character is 8 bits long, and each "bit pattern" uniquely represents a single character.

To better understand how "arbitrary data" can be represented in binary, we're going to convert some strings and binary using `ascii`.

1. Try making a message on one page, and decoding it on the other.

1. Try this conversion by hand using this [lookup table](http://www.rapidtables.com/code/text/ascii-table.htm):
  * Write the binary for "Hello".
  * Translate the following message to text:
  ```
  010100110110010101100011011100100110010101110100
  ```

Once you've got your translations written down, throw them into the converter to check your answer.

## Bonus:

Open the developer console on the converter pages and see if you can find the file `bhc.js` (what do you think that stands for?). There are several functions find two named "convertHex" and "convertDec" do the majority of the work.
  * Figure out how the conversion works.
  * Google individual lines of code you don't understand.
  * Their code is pretty *terse*, in order to better understand it, try refactoring the code to something more *expressive* and straight-forward.
  * Make your own version of this website using your code.
  * Add a feature to switch between ascii and other text formats:
    * [Ascii, EBCDIC, and Unicode](https://www.cs.umd.edu/class/sum2003/cmsc311/Notes/Data/ascii.html)
  * This could be a nice portfolio piece, make it more impressive by implementing hash algorithms in addition to these common string encodings.
