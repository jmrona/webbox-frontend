import React from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../../../hooks/useAuth';
import { Avatar } from '../../Avatar/Avatar';
import { Biography } from '../../Biography/Biography';
import { Hobby } from '../../Hobby/Hobby';
import styles from './Main.module.css';

export const Main = ({ user, updateUser, deleteUser }) => {
	const {
		id,
		avatar: userAvatar,
		fullname,
		biography,
		get_hobbies: hobbies,
	} = user;

	const [login, register, logout] = useAuth();

	const handleDeleteUser = () => {
		Swal.fire({
			title: 'Warning!',
			icon: 'warning',
			text: 'Do you want to delete this user?',
			showCancelButton: true,
			confirmButtonText: `Delete it`,
			cancelButtonText: `Don't deleted it`,
			focusCancel: true,
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				logout();
				deleteUser();
				Swal.fire('Deleted!', '', 'success');
			} else if (result.isDismissed) {
				Swal.fire('The user was not deleted', '', 'info');
			}
		});
	};

	return (
		<div className={styles.content}>
			<div className={styles.row}>
				<Avatar picture={userAvatar} userName={fullname} id={id} />

				<h2>{fullname}</h2>
				<Biography content={biography} editUser={updateUser} />
				<Hobby hobbies={hobbies} />
				<div className={styles.btn__remove}>
					<button onClick={handleDeleteUser}>Remove account</button>
				</div>
			</div>
		</div>
	);
};
