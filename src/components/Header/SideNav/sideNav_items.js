import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import style from './sideNav.css';

const SideNavItems = (props) => {
 
	const ListItems = [
		{
			type: style.option,
			icon: 'home',
			text: '메인',
			link: '/'
		},
		{
			type: style.option,
			icon: 'file-text-o',
			text: '뉴스',
			link: '/news'
		},
		{
			type: style.option,
			icon: 'play',
			text: '동영상',
			link: '/videos'
		},
		{
			type: style.option,
			icon: 'sign-in',
			text: '로그인',
			link: '/signin'
		},
		{
			type: style.option,
			icon: 'sign-out',
			text: '로그아웃',
			link: '/signout'
		},
	]

const showItems = () => {
	return ListItems.map((item, i)=>{
		return(
			<div key={i} className={item.type}>
				<Link to={item.link}>
				<FontAwesome
				name={item.icon}
		
				/>
				{item.text}
				</Link>
			</div>
		)
	})
}
 
  
 
 return (
	<div>
		{showItems()}
	</div>
  );
};

export default SideNavItems;
