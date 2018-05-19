import React from 'react';
import styles from './styles.css';
import Header from '../../components/header';

export const NotFound = () => (
  <div className={styles.container}>
    <Header />
    <div className={styles.notFound}>
      <h2 className={styles.heading}>Ooops...</h2>
      <p>Looks like the page you're looking for doesn't exists. Sorry about that</p>
    </div>
  </div>
);
export default NotFound
