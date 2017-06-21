'use strict';

module.exports = class State {
    constructor() {
        this.id = Symbol(this);
        this.isFinal = false;
        this.transitions = {};
        this.output = '';
    }

    addTransition(nextState, input, output) {
        this.transitions[input] = {
            output: output,
            next: nextState
        };
    }

    processTransition(input) {
        return this.transitions[input];
    }
};
