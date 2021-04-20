import React, { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { Pencil } from '../Icons/Pencil';
import styles from './Biography.module.css';

export const Biography = ({ content, editUser }) => {
	const [editing, setEditing] = useState(true);
	const [values, handleInputChange] = useForm({
		biography: content || '',
	});

	const { biography } = values;

	const handleEdit = () => {
		editUser(biography);
		setEditing(!editing);
	};

	return (
		<div className={styles.biography}>
			<div className={styles.edit} onClick={() => setEditing(!editing)}>
				<Pencil width='20px' height='20px' />
			</div>
			<textarea
				disabled={!editing}
				name='biography'
				value={biography}
				onChange={handleInputChange}
			></textarea>
			{!editing && <button onClick={handleEdit}>Update biography</button>}
		</div>
	);
};
