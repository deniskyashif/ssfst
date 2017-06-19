'use strict';

const State = require('./../../ssfst').State;

describe('Subsequential Transducer: State Tests', () => {
    
    it('Invoking the constructor with no args should create an instance.', () => {
        expect(new State()).toEqual(jasmine.any(State));
    });

});
