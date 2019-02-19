import React from 'react';
import style from './header.css';
import { Link } from 'react-router-dom';
import SideNav from './SideNav/sideNav';
import FontAwesome from 'react-fontawesome';

const header = (props) => {
	
	console.log(props);
	
	
  const logo = () => (
    <Link to='/' className={style.logo}>
      <img alt='epl logo' src='/images/epl_logo.jpg' />
    </Link>
  );

  const navBar = () => (
    <div className={style.bars}>
      <FontAwesome
			onClick={props.onOpenNav}
        name='bars'
        style={{
          color: '#dfdfdf',
          padding: '10px',
					cursor: 'pointer'
        }}
      />
    </div>
  );

  return (
    <header className={style.header}>
			
			<SideNav {...props}/>
			
      <div className={style.headerOpt}>
				
        {navBar()}
        {logo()}
      </div>
    </header>
  );
};

export default header;
