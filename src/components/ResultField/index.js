import React from 'react'
import style from './index.css'
import ArmorSetList from 'components/ArmorSetList'
import ArmorSetDetail from 'components/ArmorSetDetail'

const ResultField = ({ armorSets }) => (
  <div className={style.resultField}>
    <div className={style.armorSetList}>
      <ArmorSetList armorSets={armorSets} />
    </div>
    <div className={style.armorSetDetail}>
      <ArmorSetDetail skills={[]} skillTypePoints={[]} />
    </div>
  </div>
)

export default ResultField
