import React from 'react'
import style from './index.css'
import SkillLabelGroup from 'components/SkillLabelGroup'
import InlineGroup from 'components/InlineGroup'
import ConditionControl from 'components/ConditionControl'
import Button from 'components/Button'

const ConditionField = ({ armors = [], selectedSkills = [], selectSkill, gender = '男', selectGender, job = '剑士', selectJob, buildArmorSets }) => (
  <div className={style.conditionField}>
    <InlineGroup>
      <SkillLabelGroup selectedSkills={selectedSkills} selectSkill={selectSkill} />
    </InlineGroup>
    <InlineGroup>
      <ConditionControl label={'性别'} options={['男', '女']} value={gender} select={selectGender} />
      <ConditionControl label={'职业'} options={['剑士', '枪手']} value={job} select={selectJob} />
      <Button label={'开始搜索'} onClick={() => buildArmorSets(selectedSkills, gender, job, armors)} />
    </InlineGroup>
  </div>
)

export default ConditionField
