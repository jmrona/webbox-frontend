import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../../hooks/useForm';
import { useDispatch } from 'react-redux';
import styles from './LoginScreen.module.css';

import { startLogin } from '../../../actions/auth';

export const LoginScreen = () => {
	const [hasError, setHasError] = useState([]);

	const [formValues, handleInputChange] = useForm({
		email: '',
		password: '',
	});

	const { email, password } = formValues;
	const history = useHistory();
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		setHasError([]);

		if (email.length === 0) {
			setHasError([...hasError, 'The email field is required']);
		}

		if (password.length === 0) {
			setHasError([...hasError, 'The password field is required']);
		}

		if (hasError.length > 0) {
			return;
		}

		dispatch(startLogin(email, password));
	};

	const handleClick = () => {
		history.push('/register');
	};

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
							<button type='submit'>Sign in</button>
						</div>
					</form>
					<span onClick={handleClick} className={styles.span}>
						I don't have an account yet
					</span>
				</div>
			</div>
		</div>
	);
};
