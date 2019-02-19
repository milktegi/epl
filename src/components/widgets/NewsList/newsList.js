import React, { Component } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { URL } from '../../../config'
import { Link } from 'react-router-dom';

import axios from 'axios';

class NewsList extends Component {
	
	state = {
		items: [],
		start: this.props.start,
		end: this.props.start + this.props.amount,
		amount: this.props.amount
	}
	
	componentDidMount = () => {
		axios
		.get(`${URL}/articles?_start=${this.state.start}&_end=${this.state.end}`)
		.then(response=>{
			this.setState({
				items: [...this.state.items, ...response.data]
			})
		})
	}
	
	
	render(){
		console.log(this.state.items)
		return(
			<div>
				hello
			</div>
		)
	}
}

export default NewsList;