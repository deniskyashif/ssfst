'use strict';

const Transition = require('./transition');

module.exports = class State {
    constructor(isFinal = false, output = '') {
        this.isFinal = isFinal;
        this.output = output;
        this.transitions = new Map();
    }

    setTransition(nextState, input, output = '') {
        this.transitions.set(input, new Transition(output, nextState));
    }

    processTransition(input) {
        return this.transitions.get(input);
    }
};
