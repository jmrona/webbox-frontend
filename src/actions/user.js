import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startGettingUser = (email, password) => {
	return async (dispatch) => {
		const resp = await fetchWithToken('user', {}, 'GET');
		const body = await resp.json();
		const { user: data, ok, msg } = body;
		if (ok) {
			dispatch(getUser(data));
		} else {
			Swal.fire({
				title: 'Error!',
				text: msg,
				icon: 'error',
			});
		}
	};
};

export const startupdatingUser = (biography) => {
	return async (dispatch) => {
		const resp = await fetchWithToken('user', { biography }, 'PUT');
		const body = await resp.json();
		const { user: data, ok, msg } = body;

		if (ok) {
			dispatch(getUser(data));
		} else {
			Swal.fire({
				title: 'Error!',
				text: msg,
				icon: 'error',
			});
		}
	};
};

export const startDeletingUser = (history) => {
	return async (dispatch) => {
		const resp = await fetchWithToken('user', {}, 'DELETE');
		const body = await resp.json();
		const { ok, msg } = body;

		if (ok) {
			localStorage.removeItem('token');
			Swal.fire({
				title: 'Info',
				text: msg,
				icon: 'Success',
			});
			history.go('/login');
		} else {
			Swal.fire({
				title: 'Error!',
				text: msg,
				icon: 'error',
			});
		}
	};
};

export const startCleaningUser = () => ({ type: types.cleanUser });

const getUser = (user) => ({
	type: types.getUser,
	payload: user,
});
