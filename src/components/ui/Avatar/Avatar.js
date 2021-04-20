import React from 'react';
import styles from './Avatar.module.css';

export const Avatar = ({ picture, userName, id }) => {
	const url = process.env.REACT_APP_IMG_ENDPOINT;

	return (
		<div className={styles.avatar}>
			{!picture && (
				<div className={styles.none}>
					<p>
						{userName?.split(' ').map((n, i) => {
							if (i < 2) {
								return n.split('')[0];
							}
						})}
					</p>
				</div>
			)}
			{picture && (
				<div className={styles.picture}>
					<img src={`${url}avatar/${id}/${picture}`} alt={userName} />
				</div>
			)}
		</div>
	);
};
