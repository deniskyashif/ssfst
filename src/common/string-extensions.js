'use strict';

/**
 * Extracts the Longest Common Prefix of two strings.
 */
module.exports.longestCommonPrefix = (str1, str2) => {
    let lcp = '';

    for(let i = 0; i < str1.length && i < str2.length; i++) {
        if (str1[i] !== str2[i]) {
            break;
        }

        lcp += str1[i];
    }

    return lcp;
};
