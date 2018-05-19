import React from 'react';
import styles from './styles.css';

export const Header = () => (
  <header className={styles.container}>
    <a href="/">
      <img className={styles.logoImage} src={require('./assets/logo.jpg')} alt="Randika" />
    </a>
  </header>
);
export default Header;