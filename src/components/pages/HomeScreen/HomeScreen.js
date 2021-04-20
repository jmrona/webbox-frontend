import React, { useEffect } from 'react';
import styles from './HomeScreen.module.css';

import { useAuth } from '../../../hooks/useAuth';
import { Header } from '../../ui/layout/Header/Header';
import { Main } from '../../ui/layout/Main/Main';
import { useUsers } from '../../../hooks/useUsers';

export const HomeScreen = () => {
	const [login, register, logout] = useAuth();
	const [user, getUser, updateUser, deleteUser] = useUsers();

	useEffect(() => {
		getUser();
	}, []);

	const { data } = user;
	return (
		<div className={styles.container}>
			<Header user={data} logout={logout} />
			<Main user={data} updateUser={updateUser} deleteUser={deleteUser} />
		</div>
	);
};
