import React from 'react'
import styles from './styles.css'

const Dashboard = props=> {

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src='/static/logo.svg' className={styles.AppLogo} alt="logo" />
        <h1 className={styles.AppTitle}>Welcome</h1>
      </header>
    </div>
  )
};

export default Dashboard
