import { types } from '../types/types';

const initialState = {};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.getUser:
			return {
				...action.payload,
			};

		case types.updateUser:
			return {
				...action.payload,
			};

		case types.cleanUser:
			return {};

		default:
			return state;
	}
};
