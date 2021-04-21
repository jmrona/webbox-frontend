import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
	startDeletingAvatar,
	startStoringAvatar,
} from '../../../actions/avatar';
import { Trash } from '../Icons/Trash';
import { Upload } from '../Icons/Upload';
import styles from './AvatarDragAndDrop.module.css';

const DRAG_STATES = {
	DRAG_OVER: 1,
	DRAG_LEAVE: 0,
};

export const AvatarDragAndDrop = () => {
	const [drag, setDrag] = useState(0);

	const { avatar, fullname, id } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const url = process.env.REACT_APP_IMG_ENDPOINT;
	const inputFileRef = useRef();

	const handleDragOver = (e) => {
		e.preventDefault();
		setDrag(DRAG_STATES.DRAG_OVER);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		setDrag(DRAG_STATES.DRAG_LEAVE);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setDrag(DRAG_STATES.NONE);
		const file = e.dataTransfer.files;

		if (file) {
			Swal.fire('Uploading!', 'Uploading avatar...', 'info');
			dispatch(startStoringAvatar(file));
		}
	};

	const handleUploadPicture = () => {
		const file = inputFileRef.current.files;
		if (file) {
			Swal.fire('Uploading!', 'Uploading avatar...', 'info');
			dispatch(startStoringAvatar(file));
		}
	};

	const handleClickUpload = () => {
		inputFileRef.current.click();
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
		<div
			className={`${styles.avatar} ${
				drag === DRAG_STATES.DRAG_OVER && styles.dashed
			}`}
		>
			{!avatar && (
				<div
					className={styles.none}
					draggable
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<p>
						{fullname?.split(' ').map((n, i) => {
							if (i < 2) {
								return n.toUpperCase().split('')[0];
							}
						})}
					</p>
					<button className={styles.button} onClick={handleClickUpload}>
						<Upload width='20px' height='20px' />
					</button>
					<input
						type='file'
						accept='image/png, image/jpg, image/jpeg'
						ref={inputFileRef}
						onChange={handleUploadPicture}
						hidden
					/>
				</div>
			)}
			{avatar && (
				<div
					className={styles.picture}
					draggable='true'
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<img src={`${url}avatar/${id}/${avatar}`} alt={fullname} />
					<button className={styles.button} onClick={handleDelete}>
						<Trash width='20px' height='20px' />
					</button>
				</div>
			)}
		</div>
	);
};
