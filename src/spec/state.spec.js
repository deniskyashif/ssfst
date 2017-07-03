'use strict';

const State = require('./../state');

describe('SSFST State Tests', () => {

    it('Invoking the constructor should create an instance', () => {
        expect(new State()).toEqual(jasmine.any(State));
    });

    it('Should have "isFinal" property set to false after invoking the constructor, without providing arguments.', () => {
        expect(new State().isFinal).toEqual(false);
    });

    it('Should have "isFinal" property set to true after invoking the constructor, by providing it with an argument of "true".', () => {
        expect(new State(0, true).isFinal).toEqual(true);
    });

    it('Should have "output" property set to "abc" after invoking the constructor, by providing it with an arguments of "true" and "abc".', () => {
        expect(new State(0, true, 'abc').output).toEqual('abc');
    });

    it('Should return an instance with a defined "transitions" property with size of 0 after Invoking the constructor, without providing arguments.', () => {
        expect(new State().transitions.size).toEqual(0);
    });

    it('Should return an instance with a defined "output" property with value of "" after invoking the constructor, without providing arguments', () => {
        expect(new State().output).toEqual('');
    });

    it('Should add a transition when "setTransition" is invoked with valid arguments.', () => {
        const state = new State();
        const nextState = new State(true);
        nextState.output = 'xyz';
        
        state.setTransition(nextState, 'a', 'b');
        const transition = state.processTransition('a');
        
        expect(transition.output).toEqual('b');
        expect(transition.next).toBe(nextState);
    });
});
