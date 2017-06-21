/**
 * Subsequential Finite State Transducer
 */

'use strict';

const State = require('./state');
const Transition = require('./transition');

module.exports = class SSFST {
    constructor(dict) {
        if (!dict) {
            throw new Error('The input dictionary should be defined.');
        }
    }
};
