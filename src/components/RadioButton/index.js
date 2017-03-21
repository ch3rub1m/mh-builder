import React from 'react'
import style from './index.css'

const RadioButton = ({ label, active }) => (
  <div className={active ? `${style.radioButton} ${style.active}` : style.radioButton}>
    {label}
  </div>
)

export default RadioButton
