import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../../hooks/useForm';
import styles from './LoginScreen.module.css';
import { useAuth } from '../../../hooks/useAuth';

export const LoginScreen = () => {
	const [hasError, setHasError] = useState([]);

	const [login, register, logout] = useAuth();

	const [formValues, handleInputChange] = useForm({
		email: '',
		password: '',
	});

	const { email, password } = formValues;
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setHasError([]);

		if (email.length === 0) {
			setHasError(['The email field is required']);
		}

		if (password.length === 0) {
			setHasError(['The password field is required']);
		}

		if (hasError.length > 0) {
			return;
		}

		login(email, password);
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
								placeholder='email'
								name='email'
								value={email}
								onChange={handleInputChange}
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
