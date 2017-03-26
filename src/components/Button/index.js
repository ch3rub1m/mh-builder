import React from 'react'
import style from './index.css'

const Button = ({ label, onClick }) => (
  <div className={style.button} onClick={onClick}>
    {label}
  </div>
)

export default Button
