/**
 * Subsequential Finite State Transducer
 */

'use strict';

const State = require('./state');

module.exports = class SSFST {
    constructor(dict) {
        if (!dict) {
            throw new Error('The input dictionary should be defined.');
        }

        this.inputAlphabet = new Set();
        this.startState = new State();
        this.numberOfStates = 1;

        constructTrie(this, dict);
        performCanonicalLmlsExtension(this);
    }

    stateCount() {
        return this.numberOfStates;
    }

    transitionCount() {
        return this.stateCount() * this.inputAlphabet.size;
    }

    process(word) {
        let output = '';
        let state = this.startState;

        for (let symbol of word) {
            const transition = state.processTransition(symbol);

            if (transition) {
                output += transition.output;
                state = transition.next;
            }
            // in case an unknown symbol is read
            else {
                output += (state.output + symbol);
                state = this.startState;
            }
        }

        return output + state.output;
    }        
};

function constructTrie(transducer, dict) {
    for (let entry of dict) {
        let state = transducer.startState;

        for(let symbol of entry.input) {
            const transition = state.processTransition(symbol);

            if (transition) {
                state = transition.next;
            } else {
                const newState = new State();
                state.setTransition(newState, symbol);
                state = newState;

                transducer.inputAlphabet.add(symbol);
                transducer.numberOfStates++;
            }
        }

        state.isFinal = true;
        state.output = entry.output;
    }
}

function performCanonicalLmlsExtension(transducer) {
    const queue = [];
    transducer.startState.isFinal = true;
    transducer.startState.output = '';

    for (let symbol of transducer.inputAlphabet) {
        const transition = transducer.startState.processTransition(symbol);

        if (!transition) {
            this.startState.setTransition(transducer.startState, symbol, symbol);
        } else {
            queue.push({
                state: transition.next,
                prev: transducer.startState,
                output: transition.next.isFinal ? transition.next.output : symbol
            });
        }
    }

    while (queue.length) {
        complementState(transducer, queue.shift(), queue);
    }
}

function complementState(transducer, triple, queue) {
    const { state, prev, output } = triple;

    for (let symbol of transducer.inputAlphabet) {
        const transition = state.processTransition(symbol);
        const prevTransition = prev.processTransition(symbol);

        if (!transition) {
            state.setTransition(prevTransition.next, symbol, output + prevTransition.output);
        } else {
            if (transition.next.isFinal) {
                queue.push({
                    state: transition.next,
                    prev: transducer.startState,
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
    }

    state.isFinal = true;
    state.output = output + prev.output;
}
