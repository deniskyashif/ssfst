# Subsequential Finite State Transducer

[![Build Status](https://api.travis-ci.org/deniskyashif/ssfst.svg?branch=master)](https://travis-ci.org/deniskyashif/ssfst)
[![Coverage Status](https://coveralls.io/repos/github/deniskyashif/ssfst/badge.svg?branch=master)](https://coveralls.io/github/deniskyashif/ssfst?branch=master)
[![Code Climate](https://codeclimate.com/github/deniskyashif/ssfst/badges/gpa.svg)](https://codeclimate.com/github/deniskyashif/ssfst)
[![Dependencies](https://img.shields.io/badge/dependencies-none-green.svg)](https://www.npmjs.com/package/ssfst)

Given an input text, produces a new text by applying a fixed set of rewrite rules. The algorithm builds a minimal subsequential transducer and uses the "leftmost largest match" replacement strategy with skips. No overlap between the replaced parts is possible. The time needed to compute the transducer is **linear** in the size of the input dictionary. For any  text `t` of length `|t|` the time it takes to perform a rewrite is also **linear** `O(|t|+|t'|)` where `t'` denotes the resulting output string.  
Check out the [Online Sandbox](https://npm.runkit.com/ssfst).

## Usage

```sh
npm i --save ssfst
```

## Example: Text Rewriting

```js
const ssfst = require('ssfst');

const spellingCorrector = ssfst.init([
    { input: 'acheive', output: 'achieve'},
    { input: 'arguement', output: 'argument'},
    { input: 'independant', output: 'independent'},
    { input: 'posession', output: 'possession'},
    { input: 'mercy less', output: 'merciless' }
]);

spellingCorrector.process('independant'); // => "independent"
spellingCorrector.process('mercy less arguement'); // => "merciless argument"
spellingCorrector.process('they acheived a lot'); // => "they achieved a lot"
```

The `init` factory function takes a collection of pairs and returns a transducer. The transducer can be initialized by any iterable object.

```js
function* dictGen() {
    yield { input: 'dog', output: '<a href="https://en.wikipedia.org/wiki/Dog">dog</a>' };
    yield { input: 'fox', output: '<a href="https://en.wikipedia.org/wiki/Fox">fox</a>' };
}

const transducer = ssfst.init(dictGen());
transducer.process('The quick brown fox jumped over the lazy dog.');
/* => The quick brown <a href="https://en.wikipedia.org/wiki/Fox">fox</a> jumped over the lazy <a href="https://en.wikipedia.org/wiki/Dog">dog</a>. */
```

## Working with large datasets

Loading the full rewrite dictionary in memory is not optimal when working with large datasets. In this case we want to build the transducer by adding the entries asynchronously one at a time. This is achieved by using an async iterable.

For example, if our dataset is stored in a file, we can read its contents one line at a time.

```txt
Berlin,Germany
Buenos Aires,Argentina
London,United Kingdom
Sofia,Bulgaria
Tokyo,Japan
```

This is the dictionary text file. Each line contains an entry and its input and output values are separated by a comma. We implement a generator function which reads it asynchronously line by line and yields an object which is consumed by the initialization of the transducer.

```js
const fs = require('fs');
const readline = require('readline');
const ssfst = require('ssfst');

async function* readLinesGenAsync() {
    const lineReader = readline.createInterface({
        input: fs.createReadStream(__dirname + '/capitals.txt')
    });

    for await (const line of lineReader) {
        const [input, output] = line.split(',');
        yield { input, output };
    }
}
```

We pass the async iterable to the `initAsync` factory function.

```js
const transducer = await ssfst.initAsync(readLinesGenAsync());
```

## Example: Key-Value Store

The subsequential transducer can also be used to efficiently store key-value pairs.

```js
const val = transducer.process('Sofia'); // => Bulgaria
const invalid = transducer.process('Unknown Key'); // => Unknown Key
```

If there's no value for a given key, it will return the key itself, which simply reduces to processing a text without applying any rewrite rules.

## Use with TypeScript

```ts
import * as ssfst from 'ssfst';
```

## Run Locally

```sh
git clone https://github.com/deniskyashif/ssfst.git
cd ssfst
npm i
```

Sample implementations can be found in [examples/](https://github.com/deniskyashif/ssfst/tree/master/examples).

## Run the Tests

```sh
npm t
```

## References

This implementation follows the construction presented in ["Efficient Dictionary-Based Text Rewriting using Subsequential Transducers" by S. Mihov, K. Schulz](https://dl.acm.org/doi/abs/10.1017/S1351324905004092)
