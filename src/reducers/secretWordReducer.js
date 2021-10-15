import { actionTypes } from '../actions';

const secretWord = (state = null, action) => {
	switch (action.type) {
		case actionTypes.GET_SECRET_WORD:
			return action.payload;
		default:
			return state;
	}
};
export default secretWord;
