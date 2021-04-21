import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../../../actions/auth';
import styles from './Header.module.css';

export const Header = () => {
	const { fullname } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(startLogout());
	};

	return (
		<div className={styles.header}>
			{fullname ? <h4>Hi, {fullname}!</h4> : <h4>Hi!</h4>}

			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};
