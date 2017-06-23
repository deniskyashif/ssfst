'use strict';

const SSFST = require('./../transducer');

describe('Subsequential Finite State Transducer Tests', () => {
    const dict = [
        { input: 'a', output: '1'},
        { input: 'ab', output: '2'},
        { input: 'abcc', output: '3'},
        { input: 'babc', output: '4'},
        { input: 'c', output: '5'}
    ];

    const transducer = new SSFST(dict);

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
        const actual = transducer.process('a');
        const expected = { accepted: true, output: '1' };
        expect(actual).toEqual(expected);
    });

    it('Should accept and translate correctly a word from the input dictionary #2', () => {
        const actual = transducer.process('ab');
        const expected = { accepted: true, output: '2' };
        expect(actual).toEqual(expected);
    });

    it('Should accept and translate correctly a word from the input dictionary #3', () => {
        const actual = transducer.process('abcc');
        const expected = { accepted: true, output: '3' };
        expect(actual).toEqual(expected);
    });

    it('Should accept and translate correctly a word from the input dictionary #4', () => {
        const actual = transducer.process('babc');
        const expected = { accepted: true, output: '4' };
        expect(actual).toEqual(expected);
    });

    it('Should accept and translate correctly a word from the input dictionary #5', () => {
        const actual = transducer.process('c');
        const expected = { accepted: true, output: '5' };
        expect(actual).toEqual(expected);
    });

    it('Should reject a word that does not belong to the input dictionary #1', () => {
        const actual = transducer.process('d');
        expect(actual.accepted).not.toBeTruthy();
    });

    it('Should reject a word that does not belong to the input dictionary #2', () => {
        const actual = transducer.process('ad');
        expect(actual.accepted).not.toBeTruthy();
    });

    it('Should reject a word that does not belong to the input dictionary #3', () => {
        const actual = transducer.process('dbc');
        expect(actual.accepted).not.toBeTruthy();
    });

    it('Should reject an input word that contains a symbol that does not belong to the input alphabet #1', () => {
        const actual = transducer.process('aXbcbbbabccb');
        expect(actual.accepted).not.toBeTruthy();
    });

    it('Should produce a valid output, given a valid input string from the alphabet #1', () => {
        const actual = transducer.process('abcbbbabccb');
        const expected = { accepted: true, output: '25bb45b' };
        expect(expected).toEqual(actual);
    });

    it('Should produce a valid output, given a valid input string from the alphabet #2', () => {
        const actual = transducer.process('abccbbc');
        const expected = { accepted: true, output: '3bb5' };
        expect(expected).toEqual(actual);
    });

    it('Should produce a valid output, given a valid input string from the alphabet #3', () => {
        const actual = transducer.process('baba');
        const expected = { accepted: true, output: 'b21' };
        expect(expected).toEqual(actual);
    });

    it('Should produce a valid output, given a valid input string from the alphabet #4', () => {
        const actual = transducer.process('ababa');
        const expected = { accepted: true, output: '221' };
        expect(expected).toEqual(actual);
    });

    it('Should produce a valid output, given a valid input string from the alphabet #5', () => {
        const actual = transducer.process('aabcccabb');
        const expected = { accepted: true, output: '1352b' };
        expect(expected).toEqual(actual);
    });

    it('Should produce a valid output, given a valid input string from the alphabet #6', () => {
        const actual = transducer.process('bbabcc');
        const expected = { accepted: true, output: 'b45' };
        expect(expected).toEqual(actual);
    });

    it('Should produce a valid output, given a valid input string from the alphabet #7', () => {
        const actual = transducer.process('cabcaaa');
        const expected = { accepted: true, output: '525111' };
        expect(expected).toEqual(actual);
    });

    it('Should produce a valid output, given a valid input string from the alphabet #8', () => {
        const actual = transducer.process('babcbabcc');
        const expected = { accepted: true, output: '445' };
        expect(expected).toEqual(actual);
    });
});
