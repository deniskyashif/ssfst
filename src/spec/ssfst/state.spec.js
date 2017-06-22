'use strict';

const State = require('./../../ssfst/state');

describe('Subsequential Transducer: State Tests', () => {
    
    it('Invoking the constructor with no args should create an instance.', () => {
        expect(new State()).toEqual(jasmine.any(State));
    });

    it('States should have unique IDs', () => {
        const s1 = new State();
        const s2 = new State();

        expect(s1.id).not.toEqual(s2.id);
    });

});
