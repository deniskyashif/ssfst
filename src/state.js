'use strict';

const Transition = require('./transition');

module.exports = class State {
    constructor(id = -1, isFinal = false, output = '') {
        this.id = id;
        this.isFinal = isFinal;
        this.output = output;
        this.transitions = new Map();
    }

    addTransition(nextState, input, output = '') {
        this.transitions.set(input, new Transition(output, nextState));
    }

    processTransition(input) {
        return this.transitions.get(input);
    }
};
