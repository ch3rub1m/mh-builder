import React from 'react'
import style from './index.css'
import InlineGroup from 'components/InlineGroup'
import RadioButton from 'components/RadioButton'

const RadioButtonGroup = ({ label, options, value, select }) => (
  <div className={style.radioButtonGroup}>
    <div className={style.label}>
      {label}
    </div>
    <InlineGroup>
      {
        options.map(option =>
          <RadioButton
            key={option.label}
            label={option.label}
            active={option.value === value}
            onClick={() => select(option.value)}
          />
        )
      }
    </InlineGroup>
  </div>
)

export default RadioButtonGroup
