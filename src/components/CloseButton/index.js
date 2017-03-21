import React from 'react'
import style from './index.css'

const CloseButton = ({ label }) => (
  <div className={style.closeButton}>
    {label}
  </div>
)

export default CloseButton
