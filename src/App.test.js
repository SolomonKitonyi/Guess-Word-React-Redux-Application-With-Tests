import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory } from '../test/testUtils';
import App, { UnconnectedApp } from './App';

const setup = (state = {}) => {
	const store = storeFactory(state);
	const wrapper = shallow(<App store={store} />)
		.dive()
		.dive();
	return wrapper;
};

describe('redux properties', () => {
	test('has access to `success` piece of state', () => {
		const success = true;
		const wrapper = setup({ success });
		const successProp = wrapper.instance().props.success;
		expect(successProp).toBe(success);
	});
	test('has access to `secretWord` state', () => {
		const secretWord = 'party';
		const wrapper = setup({ secretWord });
		const secretWordProp = wrapper.instance().props.secretWord;
		expect(secretWordProp).toBe(secretWord);
	});
	test('has access to `guessedWords` state', () => {
		const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
		const wrapper = setup({ guessedWords });
		const guessedWordsProp = wrapper.instance().props.guessedWords;
		expect(guessedWordsProp).toBe(guessedWords);
	});
	test('has `getSecretWord` action creator as a function on props', () => {
		const wrapper = setup();
		const getSecretWordProp = wrapper.instance().props.getSecretWord;
		expect(getSecretWordProp).toBeInstanceOf(Function);
	});
});

test('`getSecretWord` is called on App mount', () => {
	const getSecretWordMock = jest.fn();
	const props = {
		getSecretWord: getSecretWordMock,
		success: false,
		guessedWords: [],
	};

	//setup App component with getSecretWordMock as a getSecretWord prop
	const wrapper = shallow(<UnconnectedApp {...props} />);

	//run lifecyle method
	wrapper.instance().componentDidMount();

	// check to see if the mock ran
	const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
	expect(getSecretWordCallCount).toBe(1);
});
