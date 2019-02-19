import React, { Component } from 'react';
import axios from 'axios';
import { URL } from '../../../config';

import SliderTemplates from './slider_templates';

class NewsSlider extends Component {
  state = {
    news: []
  };

  componentDidMount() {
		axios
		.get(`${URL}/articles?_start=0&_end=3`)
		.then(response => {
			// console.log(response);
			this.setState({
				news: response.data
			})
    });
  }

  render() {
		console.log(this.state.news)
    return( 
				<SliderTemplates
				data={this.state.news}
				type="featured"
				/>
		);
  }
}

export default NewsSlider;
