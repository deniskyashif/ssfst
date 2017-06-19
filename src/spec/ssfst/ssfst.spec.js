'use strict';

const SSFST = require('./../../ssfst').SSFST;

describe('Subsequential Finite State Transducer Tests', () => {
    
    it('Invoking the constructor with no args should create an instance.', () => {
        expect(new SSFST()).toEqual(jasmine.any(SSFST));
    });

});
