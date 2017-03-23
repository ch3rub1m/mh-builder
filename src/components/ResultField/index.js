import React from 'react'
import style from './index.css'
import ArmorSetList from 'components/ArmorSetList'
import ArmorSetDetail from 'components/ArmorSetDetail'

const ResultField = () => (
  <div className={style.resultField}>
    <div className={style.armorSetList}>
      <ArmorSetList armorSets={[['霸龙头盔', '崩龙护手', '黑龙护腰', '祖龙护手', '红黑龙护胫'],
      ['霸龙头盔', '崩龙护手', '黑龙护腰', '祖龙护手', '红黑龙护胫']]} activedIndex={0} />
    </div>
    <div className={style.armorSetDetail}>
      <ArmorSetDetail skills={['斩味等级+1', '心眼', '攻击力提升【大】']} skillTypePoints={[['匠', '10'], ['剑术', '10'], ['攻击', '20']]} />
    </div>
  </div>
)

export default ResultField
