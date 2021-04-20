import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';

export const useUsers = (initialState = []) => {
	const [user, setUser] = useState(initialState);

	const getUser = async () => {
		const resp = await fetchWithToken('user', {}, 'GET');
		const body = await resp.json();
		const { user: data, ok, msg } = body;

		if (ok) {
			setUser({ data });
		} else {
			Swal.fire({
				title: 'Error!',
				text: msg,
				icon: 'error',
			});
		}
	};

	const updateUser = async (
		biography,
		password,
		firstName,
		lastName,
		darkMode,
		canSignIn
	) => {
		const resp = await fetchWithToken(
			'user',
			{ biography, password, firstName, lastName, darkMode, canSignIn },
			'PUT'
		);
		const body = await resp.json();
		const { user: data, ok, msg } = body;

		if (ok) {
			setUser({ ...user, data });
		} else {
			Swal.fire({
				title: 'Error!',
				text: msg,
				icon: 'error',
			});
			return false;
		}
	};

	const deleteUser = async () => {
		const resp = await fetchWithToken('user', {}, 'DELETE');
		const body = await resp.json();
		const { user: data, ok, msg } = body;

		if (ok) {
			setUser({ ...user, data });
		} else {
			Swal.fire({
				title: 'Error!',
				text: msg,
				icon: 'error',
			});
		}
	};

	return [user, getUser, updateUser, deleteUser];
};
