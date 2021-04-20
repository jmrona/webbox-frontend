import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import * as dayjs from 'dayjs';
import Swal from 'sweetalert2';

export const useAuth = (initialState = []) => {
	const [user, setUser] = useState(initialState);
	const history = useHistory();
	const token = localStorage.getItem('token');

	const login = async (email, password) => {
		const resp = await fetchWithoutToken('login', { email, password }, 'POST');
		const body = await resp.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			setUser({ ...body.user });

			history.go('/');
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
		}
	};

	const register = async (fullname, dayOfBirthday, email, password) => {
		const dob = dayjs(dayOfBirthday).format('YYYY/MM/DD');
		const resp = await fetchWithoutToken(
			'register',
			{ fullname, dob, email, password },
			'POST'
		);
		const body = await resp.json();

		if (body.ok) {
			login(email, password);
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
			console.log(body.errors);
		}
	};

	const logout = async () => {
		const resp = await fetchWithToken('logout', {}, 'GET');
		const body = await resp.json();

		if (body.ok) {
			localStorage.removeItem('token');
			history.go('/login');
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
		}
	};

	const getUser = async () => {
		const resp = await fetchWithToken('user', {}, 'GET');
		const body = await resp.json();

		if (body.ok) {
			const userAuthenticated = body.user;
			setUser({ ...body.user });
		} else {
			Swal.fire({
				title: 'Error!',
				text: body.msg,
				icon: 'error',
			});
		}
	};

	return [login, register, logout];
};
