import React from 'react';
import styles from './Hobby.module.css';

export const Hobby = ({ hobbies }) => {
	return (
		<>
			<h3>Hobbies</h3>
			<div className={styles.hobbies__container}>
				{hobbies &&
					hobbies.map((hobby) => (
						<div className={styles.hobbies__item}>
							{hobby.name} <button>x</button>
						</div>
					))}
				<div className={styles.form}>
					<input type='text'></input>
					<button>Add hobby</button>
				</div>
			</div>
		</>
	);
};
