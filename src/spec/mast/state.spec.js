'use strict';

const State = require('./../../mast').State;

describe('Minimal Acyclic Subsequential Transducer: State Tests', () => {
    
    it('invoking the constructor should create an instance', () => {
        expect(new State()).toEqual(jasmine.any(State));
    });

});
