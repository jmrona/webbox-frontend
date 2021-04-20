import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../../hooks/useForm';
import styles from './RegisterScreen.module.css';
import { useAuth } from '../../../hooks/useAuth';

export const RegisterScreen = () => {
	const [hasError, setHasError] = useState([]);
	const [login, register, logout] = useAuth();

	const [formValues, handleInputChange] = useForm({
		fullname: '',
		dob: '',
		email: '',
		password: '',
	});

	const { fullname, dob, email, password } = formValues;
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setHasError([]);

		if (fullname.length === 0) {
			setHasError(['The first name field is required']);
		}

		if (dob.length === 0) {
			setHasError(['The Date of birthday field is required']);
		}

		if (email.length === 0) {
			setHasError(['The email field is required']);
		}

		if (email.length < 6) {
			setHasError(['The email should have minimun 6 characters']);
		}

		if (password.length === 0) {
			setHasError(['The password field is required']);
		}

		if (password.length < 6) {
			setHasError(['The password should have minimun 6 characters']);
		}

		if (hasError.length > 0) {
			return;
		}

		register(fullname, dob, email, password);
	};

	const handleClick = () => {
		history.push('/login');
	};

	useEffect(() => {}, []);

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.card__header}>
					<h1>Webbox</h1>
				</div>

				{hasError?.length > 0 && (
					<div className={styles.alert__danger}>
						<h4>Error:</h4>
						<ul>
							{hasError.map((e, key) => (
								<li key={key}>{e}</li>
							))}
						</ul>
					</div>
				)}
				<div className={styles.card__body}>
					<form onSubmit={handleSubmit}>
						<label>
							Full name
							<input
								type='text'
								placeholder='Full name'
								name='fullname'
								value={fullname}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Date of birthday
							<input
								type='date'
								name='dob'
								value={dob}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Email
							<input
								type='text'
								placeholder='Email'
								name='email'
								value={email}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Password
							<input
								type='password'
								placeholder='Password'
								name='password'
								value={password}
								onChange={handleInputChange}
								required
							/>
						</label>
						<div className={styles.card__footer}>
							<button type='submit'>Sign up</button>
						</div>
					</form>
					<span onClick={handleClick} className={styles.span}>
						I have an account already
					</span>
				</div>
			</div>
		</div>
	);
};
