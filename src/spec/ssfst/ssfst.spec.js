'use strict';

const SSFST = require('./../../ssfst').SSFST;

describe('Subsequential Finite State Transducer Tests', () => {

    const dict = [
        { input: 'a', output: '1'},
        { input: 'ab', output: '2'},
        { input: 'abcc', output: '3'},
        { input: 'babc', output: '4'},
        { input: 'c', output: '5'}
    ];
    
    it('Invoking the constructor with empty dictionary should create an instance.', () => {
        expect(new SSFST([])).toEqual(jasmine.any(SSFST));
    });

    it('Invoking the constructor with undefined dictionary should throw an error.', () => {
        expect(() => new SSFST()).toThrow();
    });

    it('Invoking the constructor by providing a valid dictionary should create a new instance', () => {
        expect(new SSFST(dict)).toEqual(jasmine.any(SSFST));
    });

});
