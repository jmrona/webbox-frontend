import React, { useEffect } from 'react';
import styles from './Header.module.css';

export const Header = ({ user, logout }) => {
	const { fullname } = user;

	const handleLogout = () => {
		logout && logout();
	};

	return (
		<div className={styles.header}>
			{fullname ? <h4>Hi, {fullname}!</h4> : <h4>Hi!</h4>}

			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};
