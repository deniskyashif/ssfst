'use strict';

const Transition = require('./../../ssfst').Transition;

describe('Subsequential Transducer: Transition Tests', () => {

    it('Invoking the constructor with no args should create an instance.', () => {
        expect(new Transition()).toEqual(jasmine.any(Transition));
    });

});
