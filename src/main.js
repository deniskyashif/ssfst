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
    console.log(transducer.process('ab'));
    console.log(transducer.process('bab'));
    console.log(transducer.process('bbbc'));
    console.log(transducer.process('aba'));
    console.log(transducer.process('www'));
}

main();
