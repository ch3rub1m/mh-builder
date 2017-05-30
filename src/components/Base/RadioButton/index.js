import React from 'react'
import style from './index.css'

const RadioButton = ({ label, active, onClick }) => (
  <div className={active ? `${style.radioButton} ${style.active}` : style.radioButton} onClick={onClick}>
    {label}
  </div>
)

export default RadioButton
