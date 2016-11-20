# Checksums

A checksum is a useful (and very common) application of a hash function used to check that some piece of data has been changed or corrupted during transit. One reason that the message might have been corrupted is electrical interference when sending the signal. Another source of corruption might be a malicious actor trying to send users a virus or otherwise fake data.

## Why It Matters?

#### Security Implications

For an example of how *important* checksums are to internet security, read [this article](http://arstechnica.com/security/2012/06/flame-crypto-breakthrough/) about how a [collision attack](https://learncryptography.com/hash-functions/hash-collision-attack) was used by the NSA in the Flame virus to infect millions of machines by faking a __checksum__ created by the [MD5](https://en.wikipedia.org/wiki/MD5) hash algorithm. This allowed them NSA servers to send fake updates, masquerading as Microsoft severs to unwitting users. The impact of the Flame virus was *massive* on the internet community.

#### Electrical Interference

It's easy to take the physical aspect of data transfer for granted. Data traveling along the physical infrastructure of the internet is traveling from place to place using a wide array of physical mediums these days. Copper wire, fiber optics, and radio waves are all used.

When our data is traveling from computer to computer, it is subject to electrical interference and other *physical* disruptions. Our signals are generally translated to a series of __bits__ -- 0's and 1's. When we want to send a "1" we send an electrical pulse in copper wire; fire a short blast of light on a fiber optic; or an otherwise stronger than usual signal in radio waves and other communication formats. When sending a 0 we send no charge; no light; or a low amplitude signal for the same amount of time. These signals can be corrupted by other electrical signals, sources of light, and radio waves. Checksums are used to detect such corruption.

If this all sounds intimidating checkout these resources from Khan Academy. For some background on the theory checkout this series on [information theory](https://www.khanacademy.org/computing/computer-science/informationtheory) or this one on [cryptography](https://www.khanacademy.org/computing/computer-science/cryptography). For more information about how these concepts impact the internet see the series on [The Internet](https://www.khanacademy.org/computing/computer-science/internet-intro#internet-works-intro).

## Examples in Web Development

Internet traffic often depends on the use of checksums to consistently deliver uncorrupted data. For example the [TCP/IP protocols](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) that power internet traffic rely on checksums. [Signed cookies](http://www.brunton-spall.co.uk/post/2012/11/08/securing-web-cookies-with-signatures/) and [signed urls](https://docs.djangoproject.com/en/1.10/topics/signing/) are also example of using checksums. The [JWT standard](https://jwt.io/introduction/) standard also uses checksums. If you read the article about the Flame virus above, you learned that checksums are also sent along with important software updates and other sensitive digital information.  

## How Checksums Work

Every time we send data, we compute and send a checksum as well. This checksum is the "hash value" of a hash algorithm known by both the sending and receiving computers. This hash value is a [digital signature](https://en.wikipedia.org/wiki/Digital_signature) of the actual data we want to send, and we call it the checksum. When the message is received, the receiver gets the data as well as the checksum. The receiver then sends the data it received through the same algorithm -- if the produced hash value matches the checksum then the data was probably not corrupted!

The [SHA-2 Family](https://en.wikipedia.org/wiki/SHA-2) of algorithms are an example of an algorithm commonly used for computing checksums.

It is worth noting that both the checksum and the data itself might have been corrupted. For our checksum algorithm to be effective we don't need to know *which one* was corrupted -- just that corruption has occurred.

## Now, You Must Practice

Head to the exercises folder for a description of how to use this repository to practice creating and testing checksums.
