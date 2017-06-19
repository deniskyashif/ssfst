'use strict';

const State = require('./../../st').State;

describe('Subsequential Transducer: State Tests', () => {
    
    it('Invoking the constructor with no args should create an instance.', () => {
        expect(new State()).toEqual(jasmine.any(State));
    });

});
