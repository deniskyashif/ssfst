'use strict';

const fs = require('fs');
const readline = require('readline');
const SSFST = require('./index');

function printTransducerInfo(transducer) {
    console.log(`Input alphabet: ${[...transducer.inputAlphabet].sort()}`);
    console.log(`Number of states: ${transducer.getStatesCount()}`);
    console.log(`Number of transitions: ${transducer.getTransitionsCount()}`);
}

function main() {
    const dict = [
        { input: 'acheive', output: 'achieve'},
        { input: 'achiev', output: 'achieve'},
        { input: 'arguement', output: 'argument'},
        { input: 'independant', output: 'independent'},
        { input: 'posession', output: 'possession'},
        { input: 'mercy less', output: 'merciless' }
    ];

    console.info('Input dictionary:');
    console.info(dict);
    console.info(`Constructing the Transducer.`);

    const transducer = new SSFST(dict);
    printTransducerInfo(transducer);

    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('line', input => console.log(transducer.process(input)));
};

main();
