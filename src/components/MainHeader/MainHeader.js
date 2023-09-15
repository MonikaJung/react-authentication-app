import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import AuthContext from '../../context/auth-context';

const MainHeader = () => {
  const ctx = React.useContext(AuthContext);
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation onLogout={ctx.onLogout} />
    </header>
  );
};

export default MainHeader;
