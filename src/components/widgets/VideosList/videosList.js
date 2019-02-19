import React, { Component } from 'react';
// import styles from './videosList.css';
import axios from 'axios';

import { URL } from '../../../config';
import Button from '../Buttons/buttons'


class VideosList extends Component {
	
	state = {
		teams: [],
		videos: [],
		start: this.props.start,
		end: this.props.start + this.props.amount,
		amount: this.props.amount
	}
	
	renderTitle = () => {
		return this.props.title ?  
		 <h3><strong>EPL</strong> 동영상</h3>
		: null
	}
	
	renderButton = () => {
		return this.props.loadMore ? 
		<Button
			type="loadMore"
			loadMore={()=> this.loadMore()}
			cta="더 많은 동영상 보기"
		/>
		: 
		<Button type="linkTo" cta="더 많은 동영상 보기" linkTo="/videos"></Button>
	}
	
	
	render(){
		return(
			<div className={StyleSheet.videoList_wrapper}>
				{this.renderTitle()}
				{this.renderButton()}
			</div>
		)
	}
}

export default VideosList;