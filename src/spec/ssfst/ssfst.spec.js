'use strict';

const SSFST = require('./../../ssfst').SSFST;

describe('Subsequential Finite State Transducer Tests', () => {
    
    it('Invoking the constructor with empty dictionary should create an instance.', () => {
        expect(new SSFST([])).toEqual(jasmine.any(SSFST));
    });

    it('Invoking the constructor with undefined dictionary should throw an error.', () => {
        expect(() => new SSFST()).toThrow();
    });

});
