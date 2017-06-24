'use strict';

const fs = require('fs');
const readline = require('readline');
const SSFST = require('./transducer');

async function constructSampleDict() {
    return new Promise((resolve, reject) => resolve([
        { input: 'ab', output: 'xx' },
        { input: 'abc', output: 'xyy' },
        { input: 'bab', output: 'yyx' },
        { input: 'babc', output: 'yyyy' },
        { input: 'bbb', output: 'yyz' },
        { input: 'bbbc', output: 'yzz' }
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
    console.log(`Input alphabet: ${[...transducer.inputAlphabet]}`);
    console.log(`Number of states: ${transducer.states.length}`);

    const transitionsCount = transducer.states
          .reduce((aggr, state) =>  aggr + state.transitions.size, 0);

    console.log(`Number of transitions: ${transitionsCount}`);
}

async function main() {
    const dict = await {
        '--default': () => constructSampleDict(),
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
