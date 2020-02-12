const readline = require('readline');
const ssfst = require('../index');

function* dictGen() {
    yield { input: 'dog', output: '<a href="https://en.wikipedia.org/wiki/Dog">dog</a>' };
    yield { input: 'fox', output: '<a href="https://en.wikipedia.org/wiki/Fox">fox</a>' };
}

console.log('Constructing the Transducer.');

const transducer = ssfst.init(dictGen());
printTransducerInfo(transducer);

console.log(transducer.process('The quick brown fox jumped over the lazy dog.'));

readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', input => console.log(transducer.process(input)));

function printTransducerInfo(transducer) {
    console.log(`Input alphabet: ${transducer.inputAlphabet()}`);
    console.log(`Number of states: ${transducer.stateCount()}`);
    console.log(`Number of transitions: ${transducer.transitionCount()}`);
}