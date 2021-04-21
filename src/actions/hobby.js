import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { startGettingUser } from './user';

export const startAddingNewHobby = (hobby) => {
	return async (dispatch) => {
		const { name, age } = hobby;

		const resp = await fetchWithToken('hobby', { name, age }, 'POST');
		const body = await resp.json();
		const { hobbies, ok, msg } = body;

		if (ok) {
			dispatch(startGettingUser());
			// Swal.fire({
			// 	title: 'Added!',
			// 	text: msg,
			// 	icon: 'success',
			// });
		} else {
			Swal.fire({
				title: 'Error!',
				text: msg,
				icon: 'error',
			});
		}
	};
};

export const startDeleteHobby = (id) => {
	return async (dispatch) => {
		const resp = await fetchWithToken('hobby/' + id, {}, 'DELETE');
		const body = await resp.json();
		const { hobbies, ok, msg } = body;

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
