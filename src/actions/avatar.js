import Swal from 'sweetalert2';
import { fetchWithToken, fetchWithTokenAndFile } from '../helpers/fetch';
import { startGettingUser } from './user';

export const startStoringAvatar = (file) => {
	return async (dispatch) => {
		let formData = new FormData();
		formData.append('file', file[0]);

		const resp = await fetchWithTokenAndFile('avatar', formData, 'POST');
		const body = await resp.json();
		const { ok, msg } = body;

		if (ok) {
			dispatch(startGettingUser());
			Swal.fire({
				title: 'Updated!',
				text: msg,
				icon: 'Avatar updated successfully',
			});
		} else {
			Swal.fire({
				title: 'Error!',
				text: msg,
				icon: 'error',
			});
		}
	};
};

export const startDeletingAvatar = (id) => {
	return async (dispatch) => {
		const resp = await fetchWithToken('avatar', {}, 'DELETE');
		const body = await resp.json();
		const { ok, msg } = body;

		if (ok) {
			dispatch(startGettingUser());
			Swal.fire({
				title: 'Deleted!',
				text: msg,
				icon: 'success',
			});
		} else {
			Swal.fire({
				title: 'Error!',
				text: msg,
				icon: 'error',
			});
		}
	};
};
