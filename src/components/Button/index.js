import React from 'react'
import style from './index.css'

const Button = ({ label }) => (
  <div className={style.button}>
    {label}
  </div>
)

export default Button
