import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';

describe('render', () => {
	describe('word has not be guessed', () => {
		test('it renders withour error', () => {});
		test('renders input box', () => {});
		test('renders submit button', () => {});
	});
	describe('word has been guessed', () => {
		test('it renders withour error', () => {});
		test('it does not render input box', () => {});
		test('it does not render submit button', () => {});
	});
});

describe('update state', () => {});
