'use strict';

const SSFST = require('./ssfst').SSFST;

function main() {
    const dict = [
        { input: 'ab', output: 'xx' },
        { input: 'abc', output: 'xyy' },
        { input: 'bab', output: 'yyx' },
        { input: 'babc', output: 'yyyy' },
        { input: 'bbb', output: 'yyz' },
        { input: 'bbbc', output: 'yzz' }
    ];

    const transducer = new SSFST(dict);
    console.log(transducer.translate('ab'));
    console.log(transducer.translate('bab'));
    console.log(transducer.translate('bbbc'));
    console.log(transducer.translate('aba'));
    console.log(transducer.translate('www'));
}

main();
