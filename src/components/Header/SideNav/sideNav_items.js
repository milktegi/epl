import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import style from './sideNav.css';
import { firebase } from '../../../firebase'

const SideNavItems = props => {
  console.log(this.props);
  const ListItems = [
    {
      type: style.option,
      icon: 'home',
      text: '메인',
      link: '/',
      login: ''
    },
    {
      type: style.option,
      icon: 'file-text-o',
      text: '뉴스',
      link: '/news',
      login: ''
    },
    {
      type: style.option,
      icon: 'play',
      text: '동영상',
      link: '/videos',
      login: ''
    },
    {
      type: style.option,
      icon: 'sign-in',
      text: '대시보드',
      link: '/dashboard',
      login: false
    },
    {
      type: style.option,
      icon: 'sign-in',
      text: '로그인',
      link: '/signin',
      login: true
    },
    {
      type: style.option,
      icon: 'sign-out',
      text: '로그아웃',
      link: '/signout',
      login: false
    }
  ];

  const element = (item, i) => (
    <div key={i} className={item.type}>
      <Link to={item.link}>
        <FontAwesome name={item.icon} />
        {item.text}
      </Link>
    </div>
  );

  const restricted = (item, i) => {
    let template = null;

    if (props.user === null && item.login) {
      template = element(item, i);
    }
    if (props.user !== null && item.login) {
      if (item.link === '/sign-out') {
        template = (
          <div key={i} 
							 className={item.type}
							 onClick={()=>{
								 firebase.auth().signOut()
								 .then(()=>{
									  props.history.push('/')
								 })
							 }}
					
					
					>
        
              <FontAwesome name={item.icon} />
              {item.text}
      
          </div>
        );
      } else {
        template = element(item, i);
      }
    }

    return template;
  };

  const showItems = () => {
    return ListItems.map((item, i) => {
      return item.login !== '' ? restricted(item, i) : element(item, i);
    });
  };

  return <div>{showItems()}</div>;
};

export default withRouter(SideNavItems);
