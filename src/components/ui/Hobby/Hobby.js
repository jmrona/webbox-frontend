import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { startAddingNewHobby, startDeleteHobby } from '../../../actions/hobby';
import { useForm } from '../../../hooks/useForm';
import styles from './Hobby.module.css';

export const Hobby = () => {
	const [hobbies, setHobbies] = useState([]);
	const { get_hobbies } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [formValues, handleInputChange, handleInputFileChange, reset] = useForm(
		{
			name: '',
			age: '',
		}
	);
	const { name, age } = formValues;

	useEffect(() => {
		setHobbies(get_hobbies);
	}, [dispatch, get_hobbies]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setHobbies([...hobbies, formValues]);
		dispatch(startAddingNewHobby(formValues));
		reset();
	};

	const handleDelete = (id) => {
		Swal.fire({
			title: 'Warning!',
			icon: 'warning',
			text: 'Are you sure? If you delete it you will not recovere it again',
			showCancelButton: true,
			confirmButtonText: `Delete it`,
			cancelButtonText: `Don't deleted it`,
			focusCancel: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				dispatch(startDeleteHobby(id));
				const hobbiesList = hobbies.filter((hobby) => hobby.id !== id);
				setHobbies(hobbiesList);
			} else if (result.isDismissed) {
				Swal.fire('The hobby was not deleted', '', 'info');
			}
		});
	};

	return (
		<>
			<h3>Hobbies</h3>
			<div className={styles.hobbies__container}>
				{hobbies &&
					hobbies.map((hobby) => (
						<div className={styles.hobbies__item}>
							{hobby.name}
							<small>({hobby.age} years)</small>
							<button onClick={() => handleDelete(hobby.id)}>x</button>
						</div>
					))}
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.form__content}>
						<input
							type='text'
							placeholder='Name of hobby'
							name='name'
							value={name}
							onChange={handleInputChange}
							required
						/>
						<input
							type='number'
							placeholder='Years exp.'
							max='100'
							min='1'
							name='age'
							value={age}
							onChange={handleInputChange}
							required
						/>
						<button type='submit'>Add hobby</button>
					</div>
				</form>
			</div>
		</>
	);
};
