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
        this.startState = new State(0);
        this.statesCount = 1;

        this.constructTrie(dict);
        this.performCanonicalLmlsExtension();
    }

    getStatesCount() {
        return this.statesCount;
    }

    getTransitionsCount() {
        return this.getStatesCount() * this.inputAlphabet.size;
    }

    complementState(triple, queue) {
        const { state, prev, output } = triple;

        for (let symbol of this.inputAlphabet) {
            const transition = state.processTransition(symbol);
            const prevTransition = prev.processTransition(symbol);

            if (!transition) {
                state.addTransition(prevTransition.next, symbol, output + prevTransition.output);
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
        }

        state.isFinal = true;
        state.output = output + prev.output;
    }

    performCanonicalLmlsExtension() {
        const queue = [];
        this.startState.isFinal = true;
        this.startState.output = '';

        for (let symbol of this.inputAlphabet) {
            const transition = this.startState.processTransition(symbol);

            if (!transition) {
                this.startState.addTransition(this.startState, symbol, symbol);
            } else {
                queue.push({
                    state: transition.next,
                    prev: this.startState,
                    output: transition.next.isFinal ? transition.next.output : symbol
                });
            }
        }

        while (queue.length) {
            this.complementState(queue.shift(), queue);
        }
    }

    constructTrie(dict) {
        let i = 1;
        for (let entry of dict) {
            let state = this.startState;

            for(let symbol of entry.input) {
                let transition = state.processTransition(symbol);

                if (transition) {
                    state = transition.next;
                } else {
                    let newState = new State(i++);
                    state.addTransition(newState, symbol);
                    state = newState;

                    this.inputAlphabet.add(symbol);
                    this.statesCount++;
                }
            }

            state.isFinal = true;
            state.output = entry.output;
        }
    }

    process(word) {
        let output = '';
        let state = this.startState;

        for (let symbol of word) {
            let transition = state.processTransition(symbol);

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
