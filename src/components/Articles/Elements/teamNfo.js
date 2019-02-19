import React from 'react';
import styles from '../articles.css';

const teamNfo = props => (
	<div className={styles.articlesTeamHeader}>
		<div className={styles.left}>
			style={{
				background: `url('/images/teams/${props.team.logo}')`
			}}
		</div>
		<div className={styles.right}>
			<span>{props.team.city} {props.team.name}</span>
		</div>
		<div>
			<strong>
			w	{props.team.stats[0].wins} - l{props.team.stats[0].defeats}
			</strong>
		</div>
	</div>
)

export default teamNfo;