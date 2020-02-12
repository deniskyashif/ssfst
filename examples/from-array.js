const readline = require('readline');
const ssfst = require('../index');

const inputDict = [
    { input: 'acheive', output: 'achieve' },
    { input: 'arguement', output: 'argument' },
    { input: 'independant', output: 'independent' },
    { input: 'posession', output: 'possession' },
    { input: 'mercy less', output: 'merciless' }
];

console.log(`Input dictionary:`);
console.log(inputDict);
console.log('Constructing the Transducer.');

const transducer = ssfst.init(inputDict);
printTransducerInfo(transducer);

readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', input => console.log(transducer.process(input)));

function printTransducerInfo(transducer) {
    console.log(`Input alphabet: ${transducer.inputAlphabet()}`);
    console.log(`Number of states: ${transducer.stateCount()}`);
    console.log(`Number of transitions: ${transducer.transitionCount()}`);
}