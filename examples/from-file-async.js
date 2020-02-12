const fs = require('fs');
const readline = require('readline');
const ssfst = require('../index');

async function* readLinesGenAsync() {
    const lineReader = readline.createInterface({ 
        input: fs.createReadStream(__dirname + '/capitals.txt')
    });

    for await (const line of lineReader) {
        const [input, output] = line.split(',');
        yield { input, output };
    }
}

(async () => {
    const transducer = await ssfst.initAsync(readLinesGenAsync());
    printTransducerInfo(transducer);

    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('line', text => console.log(transducer.process(text)));
})();

function printTransducerInfo(transducer) {
    console.log(`Input alphabet: ${transducer.inputAlphabet()}`);
    console.log(`Number of states: ${transducer.stateCount()}`);
    console.log(`Number of transitions: ${transducer.transitionCount()}`);
}