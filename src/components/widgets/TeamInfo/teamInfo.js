import React from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import styles from './teamInfo.css'

const TeamInfo = props => {
	
	const teamName = (teams, teamId) => {
		let data = teams.find((item, i) => {
			return item.teamId === teamId
		})
		if(data) {
			return data.name
		}
	}
	
	const formatDate = date => {

	return moment(date).format('YYYY-MM-DD'); 
	}
	
	return(
		<div className={styles.teamInfo}>
			<span className={styles.teamName}>
				{teamName(props.teams, props.teamId)}
			</span>
			<span className={styles.date}>
				<FontAwesome
				name="clock-o"
				/>
				{formatDate(props.date)}
			</span>
		</div>
	)
}

export default TeamInfo;