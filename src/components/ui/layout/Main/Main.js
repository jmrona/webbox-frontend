import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Main.module.css';

import Swal from 'sweetalert2';
import { Avatar } from '../../Avatar/Avatar';
import { Biography } from '../../Biography/Biography';
import { Hobby } from '../../Hobby/Hobby';
import { startDeletingUser } from '../../../../actions/user';

export const Main = () => {
	const user = useSelector((state) => state.user);
	const { fullname } = user;

	const dispatch = useDispatch();
	const history = useHistory();

	const handleDeleteUser = () => {
		Swal.fire({
			title: 'Warning!',
			icon: 'warning',
			text:
				'Are you sure? If you delete your user you will not able to log in again.',
			showCancelButton: true,
			confirmButtonText: `Yes, delete it`,
			cancelButtonText: `No, don't deleted it`,
			focusCancel: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				dispatch(startDeletingUser(history));
				Swal.fire('Deleted!', '', 'success');
			} else if (result.isDismissed) {
				Swal.fire('The user was not deleted', '', 'info');
			}
		});
	};

	return (
		<div className={styles.content}>
			<div className={styles.row}>
				<Avatar />
				<h2>{fullname}</h2>
				<Biography />
				<Hobby />
				<div className={styles.btn__remove}>
					<button onClick={handleDeleteUser}>Remove account</button>
				</div>
			</div>
		</div>
	);
};
