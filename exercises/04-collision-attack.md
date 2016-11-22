# Collision Attacks

A __collision attack__ is an way to fool a checksum. Previously, we were fooling our checksum by sending random data, or by randomly altering the data. This random testing framework is powerful and often helps programmers find vulnerabilities we did not know about, but hackers want to *exploit* a vulnerability. Random corruption might cause our data to behave strangely, but it's highly unlikely that random corruption would cause the data to suddenly become a virus or other malicious code.

In this section, we're going to create a series of collision attacks, that ultimately will lead us to a better understanding of how to "break" a digital signature. Breaking such a signature could result in being able to spoof encrypted cookies, authentication tokens, and more. This is the same type of attack that allowed the Flame virus creators to fake SSL certificates. __MD5__ and __SHA-1__ are both now considered "broken" due to the efficacy of such __collision attacks__. At the time of this writing it appears that __SHA-256__ remains unbroken.

## Your Tasks

You're going to create several hash collision attacks with increasing difficulty.

First we're going to create an attack with very no restrictions on output, against an exceptionally weak hash algorithm. Then we're going to restrict the output to alpha characters. Then we're going to make the hash function a little better and continue to use the restricted character set. These first 3 exercises are to get you thinking about collisions in general.

Once we've successfully crafted a few collision attacks using arbitrary data, we're going to put a further restriction on the data: you must send something __useful__. For example, checksums are frequently used as a digital signature on secure content. We're going to simulate "breaking" the signature of something sent to JSON.stringify. Specifically, you're going to attempt to change the userId in cookies like this one:

```js
let data = {
  userId: 1234
};

let payload = JSON.stringify(data);
```

We're trying to create a collision attack against this "payload", but where the userId has been changed to 42. In this case, we're pretending to be user number 42 without the receiver realizing that they actually authenticated user 1234. Lucky for us, the receiver only looks in the `userId` property of the data.
