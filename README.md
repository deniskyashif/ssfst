# Subsequential Finite State Transducer
[![Build Status](https://travis-ci.org/deniskyashif/ssfst.svg?branch=master)](https://travis-ci.org/deniskyashif/ssfst)

## Requirements
* [git](https://git-scm.com/downloads)
* [nodejs](https://nodejs.org/en/download/current/) v. >= 8.x

## Installation
```
git clone --recursive https://github.com/deniskyashif/ssfst.git
cd ssfst/src
npm install
```

## Run
```
npm start
npm run phones // construct the transducer using CMU Phones dictionary
npm run dict  // construct the transducer using CMU dictionary
```

## Run the Tests
```
npm test
```

## References
* ["Efficient Dictionary-Based Text Rewriting using Subsequential Transducers" by Stoyan Mihov, Klaus Schulz](https://www.researchgate.net/publication/232005152_Efficient_dictionary-based_text_rewriting_using_subsequential_transducers)
