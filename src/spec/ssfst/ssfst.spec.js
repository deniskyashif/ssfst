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

    it('Should accept and translate correctly a word from the input dictionary #1', () => {
        const transducer = new SSFST(dict);
        const actual = transducer.process('a');
        const expected = { accepted: true, output: '1' };

        expect(expected).toEqual(actual);
    });

    it('Should accept and translate correctly a word from the input dictionary #2', () => {
        const transducer = new SSFST(dict);
        const actual = transducer.process('ab');
        const expected = { accepted: true, output: '2' };

        expect(expected).toEqual(actual);
    });

    it('Should accept and translate correctly a word from the input dictionary #3', () => {
        const transducer = new SSFST(dict);
        const actual = transducer.process('abcc');
        const expected = { accepted: true, output: '3' };

        expect(expected).toEqual(actual);
    });

    it('Should accept and translate correctly a word from the input dictionary #4', () => {
        const transducer = new SSFST(dict);
        const actual = transducer.process('babc');
        const expected = { accepted: true, output: '4' };

        expect(expected).toEqual(actual);
    });

    it('Should accept and translate correctly a word from the input dictionary #5', () => {
        const transducer = new SSFST(dict);
        const actual = transducer.process('c');
        const expected = { accepted: true, output: '5' };

        expect(expected).toEqual(actual);
    });

    it('Should reject a word that does not belong to the input dictionary #1', () => {
        const transducer = new SSFST(dict);
        const actual = transducer.process('d');
        expect(actual.accepted).not.toBeTruthy();
    });

    it('Should reject a word that does not belong to the input dictionary #2', () => {
        const transducer = new SSFST(dict);
        const actual = transducer.process('ad');
        expect(actual.accepted).not.toBeTruthy();
    });

    it('Should reject a word that does not belong to the input dictionary #3', () => {
        const transducer = new SSFST(dict);
        const actual = transducer.process('cc');
        expect(actual.accepted).not.toBeTruthy();
    });
});
