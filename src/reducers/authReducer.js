import { types } from '../types/types';

const initialState = {
	checking: true,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.checkingTrue:
			return {
				checking: true,
			};

		case types.checkingFalse:
			return {
				checking: false,
			};

		default:
			return state;
	}
};
