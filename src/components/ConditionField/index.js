import React from 'react'
import style from './index.css'
import SkillLabelGroup from 'components/SkillLabelGroup'
import InlineGroup from 'components/InlineGroup'
import ConditionControl from 'components/ConditionControl'
import Button from 'components/Button'

const ConditionField = () => (
  <div className={style.conditionField}>
    <InlineGroup>
      <SkillLabelGroup skillNames={['匠', '利', '攻击力提升【大】']} />
      <Button label={'添加技能'} />
    </InlineGroup>
    <InlineGroup>
      <ConditionControl label={'性别'} options={['男', '女']} value={'男'} />
      <ConditionControl label={'职业'} options={['剑士', '枪手']} value={'剑士'} />
      <Button label={'开始搜索'} />
    </InlineGroup>
  </div>
)

export default ConditionField
