import React from 'react'
import style from './index.css'

const List = ({ children }) => (
  <table className={style.list}>
    {children}
  </table>
)

export default List
