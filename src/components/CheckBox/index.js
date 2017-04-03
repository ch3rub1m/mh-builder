import React, { PropTypes } from 'react'
import style from './index.css'
import InlineGroup from 'components/InlineGroup'
import RadioButton from 'components/RadioButton'

const CheckBox = ({ label, options, values, select }) =>
  <div className={style.checkBox}>
    <div className={style.label}>
      {label}
    </div>
    <InlineGroup>
      {options.map((option) => <RadioButton key={option} label={option} active={values.includes(option)} onClick={() => select(option)} />)}
    </InlineGroup>
  </div>

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  select: PropTypes.func.isRequired
}

export default CheckBox
