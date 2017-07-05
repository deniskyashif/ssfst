# Subsequential Finite State Transducer
[![Build Status](https://travis-ci.org/deniskyashif/ssfst.svg?branch=master)](https://travis-ci.org/deniskyashif/ssfst)
[![Coverage Status](https://coveralls.io/repos/github/deniskyashif/ssfst/badge.svg?branch=master)](https://coveralls.io/github/deniskyashif/ssfst?branch=master)
[![Code Climate](https://codeclimate.com/github/deniskyashif/ssfst/badges/gpa.svg)](https://codeclimate.com/github/deniskyashif/ssfst)

Given an input text, produces a new text by applying a fixed set of rewrite rules. The algorithm uses the "lefrmost largest match" replacement strategy with skips. No overlap between the replaced parts is possible. The time needed to compute the transducer is linear in the size of the input dictionary. For any  text `t` of length `|t|` the time it takes to perform a rewrite is `O(|t|+|t'|)` where `t'` denotes the resulting output string.

## Example Usage
```js
const SSFST = require('ssfst');

const spellingCorrector = new SSFST([
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
```js
const transducer = new SSFST([
    { input: ' dog ', output: '<a href="https://en.wikipedia.org/wiki/Dog">dog</a>' },
    { input: ' fox ', output: '<a href="https://en.wikipedia.org/wiki/Fox">fox</a>' }
]);

transducer.process('The quick brown fox jumped over the lazy dog.');
/* => The quick brown <a href="https://en.wikipedia.org/wiki/Fox">fox</a> jumped over the lazy <a href="https://en.wikipedia.org/wiki/Dog">dog</a>. */
```

## Requirements
* [git](https://git-scm.com/downloads)
* [nodejs](https://nodejs.org/en/download/current/) v. >= 8.x

## Install via NPM
```
npm i --save ssfst
```

## Clone
```
git clone https://github.com/deniskyashif/ssfst.git ssfst
cd ssfst
npm i
```

## Run the Example
```
npm start
```

## Run the Tests
```
npm test
```

## Code Coverage
```
npm run cover
```

## References
* ["Efficient Dictionary-Based Text Rewriting using Subsequential Transducers" by S. Mihov, K. Schulz](https://www.researchgate.net/publication/232005152_Efficient_dictionary-based_text_rewriting_using_subsequential_transducers)
* ["Finitely Subsequential Transducers" by C. Allauzen, M. Mohri](https://www.researchgate.net/publication/263878442_FINITELY_SUBSEQUENTIAL_TRANSDUCERS)
