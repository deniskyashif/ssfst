/**
 * Subsequential Finite State Transducer
 */

'use strict';

const State = require('./state.js');
const Path = require('./path.js');

module.exports = class SSFST {
    constructor(dict) {
        if (!dict) {
            throw new Error('The input dictionary should be defined.');
        }
    }
};
