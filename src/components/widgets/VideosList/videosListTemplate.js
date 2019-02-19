import React from 'react';
import styles from './videosList.css';

import { Link } from 'react-router-dom';
import TeamInfo from '../TeamInfo/teamInfo';


const VideosListTemplate = (props) => {
	console.log(props);
	return props.data.map((item, i)=> (
		<Link to={`/videos/${item.id}`} key={i}>
			<div className={styles.videosListItem_wrapper}>
				<div className={styles.left}
					style={{
						background: `url(/images/videos/${item.image})`
					}}
				>
					<div></div>
				</div>
					<div className={styles.right}>
						<TeamInfo
						  team={props.team}
							teams={props.teams}
						/>
						<h2>
							{item.title}
						</h2>
					</div>
			</div>
		</Link>
	))
}

export default VideosListTemplate;