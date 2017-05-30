import React from 'react'
import style from './index.css'
import InlineGroup from 'components/Base/InlineGroup'
import RadioButton from 'components/Base/RadioButton'

const ConditionControl = ({ label, options, value, select }) => (
  <div className={style.radioButtonGroup}>
    <div className={style.label}>
      {label}
    </div>
    <InlineGroup>
      {options.map((option) => (<RadioButton key={option} label={option} active={option === value} onClick={() => select(option)} />))}
    </InlineGroup>
  </div>
)

export default ConditionControl
