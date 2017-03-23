import React from 'react'
import style from './index.css'
import ConditionField from 'components/ConditionField'
import ResultField from 'components/ResultField'

export default() => (
  <div className={style.root}>
    <ConditionField />
    <ResultField />
  </div>
)
