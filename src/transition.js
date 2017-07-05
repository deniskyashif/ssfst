'use strict';

module.exports = class Transition {
    constructor(output, next) {
        this.output = output;
        this.next = next;
    }
};
