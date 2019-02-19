import React from 'react';
import style from './header.css';
import { Link } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';

const header = () => {
  const logo = () => (
    <Link to='/' className={style.logo}>
      <img alt='epl logo' src='/images/epl_logo.jpg' />
    </Link>
  );

  const navBar = () => (
    <div className={style.bars}>
      <FontAwesome
        name='bars'
        style={{
          color: '#dfdfdf',
          padding: '10px'
        }}
      />
    </div>
  );

  return (
    <header className={style.header}>
      <div className={style.headerOpt}>
        {navBar()}
        {logo()}
      </div>
    </header>
  );
};

export default header;
