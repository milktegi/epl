import React, { Component } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { URL } from '../../../config';
import { Link } from 'react-router-dom';

import axios from 'axios';
import styles from './newsList.css';
import Button from '../Buttons/buttons';
import TeamInfo from '../../widgets/TeamInfo/teamInfo'

class NewsList extends Component {
  state = {
		teams: [],
    items: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  };

  componentDidMount = () => {
    this.request(this.state.start, this.state.end);
  };

  request = (start, end) => {
		
		if(this.state.teams.length < 1){
			axios
			.get(`${URL}/teams`)
			.then(response=>{
				this.setState({
					teams: response.data
				})
			})
		}
		
    axios
      .get(`${URL}/articles?_start=${start}&_end=${end}`)
      .then((response) => {
        this.setState({
          items: [...this.state.items, ...response.data ],
          start,
          end
        });
      });
  };
  
  loadMore = () => {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end, end)
  }

  renderNews = (type) => {
    let template = null;
    switch (type) {
      case 'card':
        template = this.state.items.map((item, i) => {
          return (
            <CSSTransition
							classNames={{
									enter: styles. newsList_wrapper,
									enterActive: styles.newsList_wrapper_enter
							}}
							timeout={500}
							key={i}
						>
              <div>
                <div className={styles.newslist_item}>
                  <Link to={`/articles/${item.id}`}>
									<TeamInfo
										teams={this.state.teams}
										teamId={item.team}
										date={item.date}
									/>
                    <h2>{item.title}</h2>
                  </Link>
                </div>
              </div>
            </CSSTransition>
          );
        });
        break;
        case('cardMain'):
        template = this.state.items.map((item, i)=>{
            <CSSTransition
							classNames={{
									enter: styles.newsList_wrapper,
									enterActive: styles.newsList_wrapper_enter
							}}
							timeout={500}
							key={i}
						>
              <Link to={`/articles/${item.id}`}>
                <div className={styles.flex_wrapper}>
                  <div className={styles.left}
                    style={{
                      background: `url('/images/articles/${item.image}')`
                    }}
                  
                  >
                    <div>
                      
                    </div>
                  </div>
                  <div className={styles.right}>
                  <TeamInfo
										teams={this.state.teams}
										teamId={item.team}
										date={item.date}
									/>
                  <h2>{item.title}</h2>
                  </div>
                </div>
              </Link>
            </CSSTransition>
        })
        break;
      default:
        template = null;
    }
    return template;
  };

  loadMore = () => {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end, end);
  };

  render() {
    console.log(this.state.items)
    return (
      <div>
        <TransitionGroup component='div' className='list'>
          {this.renderNews(this.props.type)}
        </TransitionGroup>
				<Button
					type="loadMore"
					loadMore={()=> this.loadMore()}
					cta="더 많은 뉴스 보기"
				/>
     
      </div>
    );
  }
}

export default NewsList;
