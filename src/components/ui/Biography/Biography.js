import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startupdatingUser } from '../../../actions/user';
import { Pencil } from '../Icons/Pencil';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './Biography.module.css';

export const Biography = () => {
	const { biography } = useSelector((state) => state.user);
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState('Tell us about you');

	useEffect(() => {
		setValue(biography);
	}, [biography]);

	const dispatch = useDispatch();
	const textAreaRef = useRef();

	const handleEdit = () => {
		dispatch(startupdatingUser(value));
		setEditing(false);
	};

	const handleInputChange = (data) => {
		setValue(data);
	};

	return (
		<>
			<h3 className={styles.title}>Biography</h3>
			<div className={styles.biography}>
				<div className={styles.edit} onClick={() => setEditing(!editing)}>
					<Pencil width='20px' height='20px' />
				</div>

				<CKEditor
					editor={ClassicEditor}
					data={value || 'Tell us more about you'}
					disabled={!editing}
					onChange={(event, editor) => {
						const data = editor.getData();
						handleInputChange(data);
					}}
					columns='auto'
				></CKEditor>

				{editing && <button onClick={handleEdit}>Update biography</button>}
			</div>
		</>
	);
};
