import React from 'react'
import style from './index.css'
import InlineGroup from 'components/InlineGroup'
import RadioButton from 'components/RadioButton'

const ConditionControl = ({ label, options, value }) => (
  <div className={style.conditionControl}>
    <div className={style.label}>
      {label}
    </div>
    <InlineGroup>
      {options.map((option) => (<RadioButton key={option} label={option} active={option === value} />))}
    </InlineGroup>
  </div>
)

export default ConditionControl
