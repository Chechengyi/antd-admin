import React from 'react'
import styles from './index.less'
import { typeConfig } from './typeconfig'

export default ({type}) => {
  type = typeConfig[type]
  return (
    <div className={styles.warp}>
      <p>{type.desc}</p>
      <img className={styles.exceptionImg} src={type.img} alt=""/>
    </div>
  )
}