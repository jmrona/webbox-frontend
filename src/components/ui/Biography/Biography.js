import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startupdatingUser } from '../../../actions/user';
import { Pencil } from '../Icons/Pencil';
import styles from './Biography.module.css';

export const Biography = () => {
	const { biography } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const textAreaRef = useRef();

	const [editing, setEditing] = useState(false);

	const handleEdit = () => {
		dispatch(startupdatingUser(textAreaRef.current.value));
		setEditing(false);
	};

	return (
		<div className={styles.biography}>
			<div className={styles.edit} onClick={() => setEditing(!editing)}>
				<Pencil width='20px' height='20px' />
			</div>
			<textarea
				disabled={!editing}
				name='biograpy'
				defaultValue={biography}
				ref={textAreaRef}
			></textarea>
			{editing && <button onClick={handleEdit}>Update biography</button>}
		</div>
	);
};
