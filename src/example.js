'use strict';

const fs = require('fs');
const readline = require('readline');
const SSFST = require('./transducer');

async function constructCountryCodesDict() {
    return new Promise((resolve, reject) => resolve([
        { input: 'acheive', output: 'achieve'},
        { input: 'achiev', output: 'achieve'},
        { input: 'arguement', output: 'argument'},
        { input: 'independant', output: 'independent'},
        { input: 'posession', output: 'possession'},
        { input: 'mercy less', output: 'merciless' }
    ]));
}

function parseCMUDictLine(line) {
    const entry = { input: '', output: '' };
    let isInInputState = true;

    for (let symbol of line) {
        if(isInInputState) {
            if (!(symbol === ' '))
                entry.input += symbol;
            else
                isInInputState = false;
        } else {
            if (!(symbol === ' '))
                entry.output += symbol;
        }
    }

    return entry;
}

async function constructCMUDict(filePath) {
    return new Promise((resolve, reject) => {
        const dict = [];

        readline.createInterface({ input: fs.createReadStream(filePath) })
            .on('line', line => dict.push(parseCMUDictLine(line)))
            .on('close', () => resolve(dict));
    });
}

async function constructCMUDictPhones(filePath) {
    return new Promise((resolve, reject) => {
        const dict = [];

        readline.createInterface({ input: fs.createReadStream(filePath) })
            .on('line', line => {
                const pair = line.split('\t');
                dict.push({ input: pair[0], output: pair[1] });
            })
            .on('close', () => resolve(dict));
    });
}

function printTransducerInfo(transducer) {
    console.log(`Input alphabet: ${[...transducer.inputAlphabet].sort()}`);
    console.log(`Number of states: ${transducer.getStatesCount()}`);
    console.log(`Number of transitions: ${transducer.getTransitionsCount()}`);
}

async function main() {
    const dict = await {
        '--default': () => constructCountryCodesDict(),
        '--cmu-dict': () => constructCMUDict('./../datasets/cmudict/cmudict.dict'),
        '--cmu-phones': () => constructCMUDictPhones('./../datasets/cmudict/cmudict.phones')
    }[process.argv[2]]();

    console.info('Input dictionary:');
    console.info(dict);
    console.info(`Constructing the Transducer.`);

    const transducer = new SSFST(dict);
    printTransducerInfo(transducer);

    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('line', input => console.log(transducer.process(input.trim())));
};

main();
