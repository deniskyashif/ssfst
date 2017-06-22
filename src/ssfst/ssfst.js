/**
 * Subsequential Finite State Transducer
 */

'use strict';

const State = require('./state');

module.exports = class SSFST {

    constructor(alphabet, dict) {
        if (!(dict && alphabet)) {
            throw new Error('The input dictionary and alphabet should be defined.');
        }

        this.startState = this.createTrie(dict);
        this.performCanonicalLmlsExtension(alphabet, this.startState);
    }

    complementState(triple, queue, alphabet) {
        const { state, prev, output } = triple;

        state.isFinal = true;
        state.output = output + prev.output;

        alphabet.forEach(symbol => {
            const transition = state.processTransition(symbol);
            const prevTransition = prev.processTransition(symbol);

            if (!transition) {
                state.addTransition(prevTransition.next,
                                    symbol,
                                    output + prevTransition.output);
            } else {
                if (transition.next.isFinal) {
                    queue.push({
                        state: transition.next,
                        prev: this.startState,
                        output: transition.next.output
                    });
                } else {
                    queue.push({
                        state: transition.next,
                        prev: prevTransition.next,
                        output: output + prevTransition.output
                    });
                }
            }
        });
    }

    performCanonicalLmlsExtension(alphabet, startState) {
        const queue = [];
        startState.isFinal = true;
        startState.output = '';

        alphabet.forEach(symbol => {
            const transition = startState.processTransition(symbol);

            if (!transition) {
                startState.addTransition(startState, symbol, symbol);
            } else {
                queue.push({
                    state: transition.next,
                    prev: startState,
                    output: transition.next.isFinal
                        ? transition.next.output
                        : symbol
                });
            }
        });

        while(queue.length) {
            let triple = queue.shift();
            this.complementState(triple, queue, alphabet);
        }
    }

    createTrie(dict) {
        const startState = new State();

        dict.forEach((entry) => {
            const word = entry.input;
            let state = startState;
            let skipIndex = 0;

            while (true) {
                let transition = state.processTransition(word[skipIndex]);

                if (!transition) {
                    break;
                }

                state = transition.next;
                skipIndex++;
            }

            for (; skipIndex < word.length; skipIndex++) {
                let newState = new State();
                state.addTransition(newState, word[skipIndex], '');
                state = newState;
            }

            state.isFinal = true;
            state.output = entry.output;
        });

        return startState;
    }

    process(word) {
        let output = '';
        let state = this.startState;

        for (let i = 0; i < word.length; i++) {
            let transition = state.processTransition(word[i]);

            if (!transition) {
                return {
                    accepted: false,
                    output: output
                };
            }

            output += transition.output;
            state = transition.next;
        }

        return {
            accepted: state.isFinal,
            output: output + state.output
        };
    }

};
