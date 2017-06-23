'use strict';

const Transition = require('./transition');

module.exports = class State {
    constructor(isFinal = false) {
        this.id = Symbol(this);
        this.isFinal = isFinal;
        this.transitions = new Map();
        this.output = '';
    }

    addTransition(nextState, input, output) {
        this.transitions.set(input, new Transition(output, nextState));
    }

    processTransition(input) {
        return this.transitions.get(input);
    }
};
