interface InputEntry { 
    input: string, 
    output: string 
};

interface Transducer {
    inputAlphabet(): Array<string>,
    stateCount(): number,
    transitionCount(): number,
    process(word: string): string
};

export function init(dict: Iterable<InputEntry>): Transducer;
export function initAsync(dict: AsyncIterable<InputEntry>): Transducer;
