'use strict';

const SSFST = require('./../src/transducer');

describe('Subsequential Finite State Transducer Test Suite #1', () => {
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

    it('Should return correct number of states, when stateCount is called', () => {
        expect(transducer.stateCount()).toEqual(10);
    });

    it('Should return correct number of states, when transitionCount is called', () => {
        expect(transducer.transitionCount()).toEqual(30);
    });

    it('Should output "1" when the "a" is processed.', () => {
        const actual = transducer.process('a');
        const expected = '1';
        expect(actual).toEqual(expected);
    });

    it('Should output "2" when "ab" is processed', () => {
        const actual = transducer.process('ab');
        const expected = '2';
        expect(actual).toEqual(expected);
    });

    it('Should output "3" when "abcc" is processed.', () => {
        const actual = transducer.process('abcc');
        const expected = '3';
        expect(actual).toEqual(expected);
    });

    it('Should output "4" when "babc" is processed', () => {
        const actual = transducer.process('babc');
        const expected = '4';
        expect(actual).toEqual(expected);
    });

    it('Should output "5" when "c" is processed', () => {
        const actual = transducer.process('c');
        const expected = '5';
        expect(actual).toEqual(expected);
    });

    it('Should output "d" when "d" is processed as it\'s not part of the input dict and alphabet', () => {
        const actual = transducer.process('d');
        const expected = 'd';
        expect(actual).toEqual(expected);
    });

    it('Should output "1d" given input "ad".', () => {
        const actual = transducer.process('ad');
        const expected = '1d';
        expect(actual).toEqual(expected);
    });

    it('Should output "db5" given "dbc"', () => {
        const actual = transducer.process('dbc');
        const expected = 'db5';
        expect(actual).toEqual('db5');
    });

    it('Should output "1Xb5bb45b" given input "aXbcbbbabccb"', () => {
        const actual = transducer.process('aXbcbbbabccb');
        const expected = '1Xb5bb45b';
        expect(actual).toEqual(expected);
    });

    it('Should output "25bb45b" given input "abcbbbabccb"', () => {
        const actual = transducer.process('abcbbbabccb');
        const expected = '25bb45b';
        expect(actual).toEqual(expected);
    });

    it('Should output "3bb5" given input "abccbbc"', () => {
        const actual = transducer.process('abccbbc');
        const expected = '3bb5';
        expect(actual).toEqual(expected);
    });

    it('Should output "b21 given input "baba"', () => {
        const actual = transducer.process('baba');
        const expected = 'b21';
        expect(actual).toEqual(expected);
    });

    it('Should output "221" given input "ababa"', () => {
        const actual = transducer.process('ababa');
        const expected = '221';
        expect(actual).toEqual(expected);
    });

    it('Should output "1352b" given input "aabcccabb"', () => {
        const actual = transducer.process('aabcccabb');
        const expected = '1352b';
        expect(actual).toEqual(expected);
    });

    it('Should output "b45" given input "bbabcc"', () => {
        const actual = transducer.process('bbabcc');
        const expected = 'b45';
        expect(actual).toEqual(expected);
    });

    it('Should output "525111" given input "cabcaaa"', () => {
        const actual = transducer.process('cabcaaa');
        const expected = '525111';
        expect(actual).toEqual(expected);
    });

    it('Should output "445" given input "babcbabcc"', () => {
        const actual = transducer.process('babcbabcc');
        const expected = '445';
        expect(actual).toEqual(expected);
    });
});
