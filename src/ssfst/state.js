'use strict';

module.exports = class State {
    constructor() {
        this.id = Symbol(this);
        this.isFinal = false;
        this.transitions = {};
        this.output = '';
    }

    addTransition(state, input, output) {
        this.transitions[input] = {
            output: output,
            nextState: state
        };
    }

    processTransition(input) {
        return this.transitions[input];
    }
};
