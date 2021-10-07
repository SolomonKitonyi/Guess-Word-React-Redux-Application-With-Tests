import { storeFactory } from '../test/testUtils';
import { guessWord } from './actions';
import guessWords from './reducers/guessedWordsReducer';

describe('guessWord action dispatcher', () => {
	const secretWord = 'party';
	const unsuccessfulGuess = 'train';
	describe('no guessed words', () => {
		let store;
		const initialState = { secretWord };
		beforeEach(() => {
			store = storeFactory(initialState);
		});
		test('Updates state correctly for unsuccessful guess', () => {
			store.dispatch(guessWord(unsuccessfulGuess));
			const newState = store.getState();
			const expectedState = {
				...initialState,
				success: false,
				guessedWords: [
					{
						guessedWord: unsuccessfulGuess,
						letterMatchcount: 3,
					},
				],
			};
			expect(newState).toEqual(expectedState);
		});
		test('Updates state correctly for successful guess', () => {
			store.dispatch(guessWord(secretWord));
			const newState = store.getState();
			const expectState = {
				secretWord,
				success: true,
				guessedWords: [
					{
						guessedWord: secretWord,
						letterMatchcount: 5,
					},
				],
			};
			expect(newState).toEqual(expectState);
		});
	});
	describe('some guessed words', () => {
		const guessedWords = [{ guessedWord: 'agile', letterMatchcount: 1 }];
		const initialState = { guessedWords, secretWord };
		let store;
		beforeEach(() => {
			store = storeFactory(initialState);
		});
		test('updates state correctly for unsuccessful guess', () => {
			store.dispatch(guessWord(unsuccessfulGuess));
			const newState = store.getState();
			const expectedState = {
				secretWord,
				success: false,
				guessedWords: [
					...guessedWords,
					{ guessedWord: unsuccessfulGuess, letterMatchcount: 3 },
				],
			};
			expect(newState).toEqual(expectedState);
		});
		test('updates state correctly for successful guess', () => {
			store.dispatch(guessWord(secretWord));
			const newState = store.getState();
			const expectedState = {
				secretWord,
				success: true,
				guessWords: [
					...guessedWords,
					{ guessedWord: secretWord, letterMatchcount: 5 },
				],
			};
			expect(newState).toEqual(expectedState);
		});
	});
});
