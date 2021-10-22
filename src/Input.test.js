import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input, { UnconnectedInput } from './Input';
import secretWord from './reducers/secretWordReducer';
import { guessWord } from './actions';

const setup = (initialState = {}) => {
	const store = storeFactory(initialState);
	const wrapper = shallow(<Input store={store} />)
		.dive()
		.dive();
	return wrapper;
};

describe('render', () => {
	describe('word has not be guessed', () => {
		let wrapper;
		beforeEach(() => {
			const initialState = { success: false };
			wrapper = setup(initialState);
		});
		test('it renders withour error', () => {
			const component = findByTestAttr(wrapper, 'component-input');
			expect(component.length).toBe(1);
		});
		test('renders input box', () => {
			const inputBox = findByTestAttr(wrapper, 'input-box');
			expect(inputBox.length).toBe(1);
		});
		test('renders submit button', () => {
			const submitButton = findByTestAttr(wrapper, 'submit-button');
			expect(submitButton.length).toBe(1);
		});
	});
	describe('word has been guessed', () => {
		let wrapper;
		beforeEach(() => {
			const initialState = { success: true };
			wrapper = setup(initialState);
		});
		test('it renders without error', () => {
			const component = findByTestAttr(wrapper, 'component-input');
			expect(component.length).toBe(1);
		});
		test('it does not render input box', () => {
			const inputBox = findByTestAttr(wrapper, 'input-box');
			expect(inputBox.length).toBe(0);
		});
		test('it does not render submit button', () => {
			const submitButton = findByTestAttr(wrapper, 'submit-button');
			expect(submitButton.length).toBe(0);
		});
	});
});

describe('update state', () => {});

describe('redux props', () => {
	test('has success piece of state as prop', () => {
		const success = true;
		const wrapper = setup({ success });
		const successProp = wrapper.instance().props.success;
		expect(successProp).toBe(success);
	});
	test('`guessedWord` action creator is a function prop', () => {
		const wrapper = setup();
		const guessedWordProp = wrapper.instance().props.guessWord;
		expect(guessedWordProp).toBeInstanceOf(Function);
	});
});

describe('`guessWord` action creator call', () => {
	let guessWordMock;
	let wrapper;
	const guessedWord = 'train';

	beforeEach(() => {
		//setup mock for `guessWord`
		guessWordMock = jest.fn();
		const props = {
			guessWord: guessWordMock,
		};
		//set up wrapper Input with guessWordMock as guessWord prop
		wrapper = shallow(<UnconnectedInput {...props} />);

		//add value to input box
		wrapper.instance().inputBox.current = { value: guessedWord };
		//simulate click
		const submitButton = findByTestAttr(wrapper, 'submit-button');
		submitButton.simulate('click', { preventDefault() {} });
	});
	test('calls `guessWord` when button is clicked', () => {
		//check to see if mock ran
		const guessWordCallCount = guessWordMock.mock.calls.length;
		expect(guessWordCallCount).toBe(1);
	});
	test('calls `guessWord` with input value as argument', () => {
		const guessedWordArg = guessWordMock.mock.calls[0][0];
		expect(guessedWordArg).toBe(guessedWord);
	});
});
