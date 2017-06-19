'use strict';

module.exports = class State {
    
    constructor() {
        this.id = Symbol(this);
        this.transitionOutputs = {};
        this.stateOutputs = {};
    }
};
