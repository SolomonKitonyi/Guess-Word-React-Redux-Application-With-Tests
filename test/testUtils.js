import PropTypes from 'prop-types';
import { createStore } from 'redux';

import rootReducer from '../src/reducers';

export const storeFactory = (initialState) => {
	return createStore(rootReducer, initialState);
};

export const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (component, confirmingProps) => {
	const propError = PropTypes.checkPropTypes(
		component.propTypes,
		confirmingProps,
		'prop',
		component.name
	);
	expect(propError).toBeUndefined();
};
