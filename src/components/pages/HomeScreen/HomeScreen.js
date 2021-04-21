import React, { useEffect } from 'react';
import styles from './HomeScreen.module.css';

import { useDispatch } from 'react-redux';

import { Header } from '../../ui/layout/Header/Header';
import { Main } from '../../ui/layout/Main/Main';

import { startGettingUser } from '../../../actions/user';

export const HomeScreen = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startGettingUser());
	}, []);

	return (
		<div className={styles.container}>
			<Header />
			<Main />
		</div>
	);
};
