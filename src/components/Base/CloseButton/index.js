import React from 'react'
import style from './index.css'

const CloseButton = ({ label, onClick }) => (
  <div onClick={onClick} className={style.closeButton}>
    {label}
  </div>
)

export default CloseButton
