'use strict';

const stringExtensions = require('./../../common/string-extensions');

describe('String Extensions Test Suite', () => {
    it('The Longest Common Prefix of "Sof" and "Sofia" should be "Sof"', () => {
        expect(stringExtensions.longestCommonPrefix('Sof', 'Sofia')).toEqual('Sof');
    });

    it('The Longest Common Prefix of "sof" and "Sofia" should be ""', () => {
        expect(stringExtensions.longestCommonPrefix('sof', 'Sofia')).toEqual('');
    });

    it('The Longest Common Prefix of "cat" and "car" should be "ca"', () => {
        expect(stringExtensions.longestCommonPrefix('cat', 'car')).toEqual('ca');
    });

    it('The Longest Common Prefix of "" and "" should be ""', () => {
        expect(stringExtensions.longestCommonPrefix('', '')).toEqual('');
    });

    it('The Longest Common Prefix of "aabb" and "abb" should be "a"', () => {
        expect(stringExtensions.longestCommonPrefix('aabb', 'abb')).toEqual('a');
    });

    it('The Longest Common Prefix of "xyz" and "xyz" should be "xyz"', () => {
        expect(stringExtensions.longestCommonPrefix('xyz', 'xyz')).toEqual('xyz');
    });
});
