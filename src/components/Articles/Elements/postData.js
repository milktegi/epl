import React from 'react';
import styles from '../articles.css';

const postData = props => (
	<div className={styles.articlePostData }>
		<div>
			date:
			<span>{props.data.date}</span>
		</div>
		<div>
			author:
			<span>{props.data.author}</span>
		</div>
	</div>
)

export default postData;