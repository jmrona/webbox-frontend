import Swal from 'sweetalert2';
import * as dayjs from 'dayjs';
import { types } from '../types/types';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { useHistory } from 'react-router';
import { startCleaningUser } from './user';

export const startLogin = (email, password) => {
	return async (dispatch) => {
		dispatch(checkingTrue());
		const resp = await fetchWithoutToken('login', { email, password }, 'POST');
		const body = await resp.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			dispatch(checkingFalse());
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
			dispatch(checkingFalse());
			console.log(body.errors);
		}
	};
};

export const startRegister = (fullname, dayOfBirthday, email, password) => {
	return async (dispatch) => {
		dispatch(checkingTrue());

		const dob = dayjs(dayOfBirthday).format('YYYY/MM/DD');
		const resp = await fetchWithoutToken(
			'register',
			{ fullname, dob, email, password },
			'POST'
		);
		const body = await resp.json();

		if (body.ok) {
			dispatch(checkingFalse());
			dispatch(startLogin(email, password));
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
			dispatch(checkingFalse());
			console.log(body.errors);
		}
	};
};

export const startLogout = () => {
	return async (dispatch) => {
		dispatch(checkingTrue());
		const resp = await fetchWithToken('logout', {}, 'GET');
		const body = await resp.json();

		if (body.ok) {
			localStorage.removeItem('token');
			dispatch(checkingFalse());
			dispatch(startCleaningUser());
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
			dispatch(checkingFalse());
		}
	};
};

export const checkingTrue = () => ({ type: types.checkingTrue });
export const checkingFalse = () => ({ type: types.checkingFalse });
