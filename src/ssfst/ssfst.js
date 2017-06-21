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

        this.createTrie(dict, this.transitions);
    }

    createTrie(dict) {
        this.startState = new State();

        dict.forEach((entry) => {
            
            const word = entry.input;            
            let state = this.startState;
            let skipIndex = 0;

            while(true) {
                let transition = state.processTransition(word[skipIndex]);

                if (!transition) {
                    break;
                }

                state = transition.nextState;
                skipIndex++;
            }

            for(; skipIndex < word.length; skipIndex++) {
                let newState = new State();
                state.addTransition(newState, word[skipIndex], '');
                state = newState;
            }

            state.isFinal = true;
            state.output = entry.output;

        });
    }

    translate(word) {
        let output = '';
        let state = this.startState;

        for(let i = 0; i < word.length; i++) {
            let transition = state.processTransition(word[i]);
            
            if (!transition) {
                return { accepted: false, output: output };
            }

            output += transition.output;
            state = transition.nextState;
        }

        return { accepted: state.isFinal, output: output + state.output };
    }

};
