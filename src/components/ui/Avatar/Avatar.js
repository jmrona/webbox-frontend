import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
	startDeletingAvatar,
	startStoringAvatar,
} from '../../../actions/avatar';
import { Trash } from '../Icons/Trash';
import { Upload } from '../Icons/Upload';
import styles from './Avatar.module.css';

export const Avatar = () => {
	const { avatar, fullname, id } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const url = process.env.REACT_APP_IMG_ENDPOINT;
	const inputFileRef = useRef();

	const handleUpload = () => {
		inputFileRef.current.click();
	};

	const handleChangeInputFile = () => {
		const file = inputFileRef.current.files;
		const { type } = file[0];

		if (type !== 'image/png' && type !== 'image/jpg' && type !== 'image/jpeg') {
			Swal.fire(
				'Error',
				'Image format not supported. PNG, JPG and JPEG formats are allowed',
				'warning'
			);
			return;
		}
		console.log(file);
		if (file) {
			Swal.fire('Uploading!', 'Uploading avatar...', 'info');
			dispatch(startStoringAvatar(file));
		}
	};

	const handleDelete = () => {
		Swal.fire({
			title: 'Warning!',
			icon: 'warning',
			text:
				'Are you sure? If you delete your avatar you will not recover it again.',
			showCancelButton: true,
			confirmButtonText: `Yes, delete it`,
			cancelButtonText: `No, don't deleted it`,
			focusCancel: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				dispatch(startDeletingAvatar());
			} else if (result.isDismissed) {
				Swal.fire('The avatar was not deleted', '', 'info');
			}
		});
	};

	return (
		<div className={styles.avatar}>
			{!avatar && (
				<div className={styles.none}>
					<p>
						{fullname?.split(' ').map((n, i) => {
							if (i < 2) {
								return n.toUpperCase().split('')[0];
							}
						})}
					</p>
					<button className={styles.button} onClick={handleUpload}>
						<Upload width='20px' height='20px' />
					</button>
					<input
						type='file'
						accept='image/png, image/jpg, image/jpeg'
						ref={inputFileRef}
						onChange={handleChangeInputFile}
						hidden
					/>
				</div>
			)}
			{avatar && (
				<div className={styles.picture}>
					<img src={`${url}avatar/${id}/${avatar}`} alt={fullname} />
					<button className={styles.button} onClick={handleDelete}>
						<Trash width='20px' height='20px' />
					</button>
				</div>
			)}
		</div>
	);
};
