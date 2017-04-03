import React from 'react'
import style from './index.css'
import SkillLabelGroup from 'components/SkillLabelGroup'
import InlineGroup from 'components/InlineGroup'
import RadioButtonGroup from 'components/RadioButtonGroup'
import CheckBox from 'components/CheckBox'
import Button from 'components/Button'

const ConditionField = ({ armors, selectedSkills, selectSkill, gender, selectGender, job, selectJob, levels, toggleLevel, buildArmorSets }) => (
  <div className={style.conditionField}>
    <div className={style.top}>
      <SkillLabelGroup selectedSkills={selectedSkills} selectSkill={selectSkill} />
    </div>
    <InlineGroup>
      <RadioButtonGroup label={'性别'} options={['男', '女']} value={gender} select={selectGender} />
      <RadioButtonGroup label={'职业'} options={['剑士', '枪手']} value={job} select={selectJob} />
      <CheckBox label={'搜索范围'} options={['下位', '上位', 'G级']} values={levels} select={toggleLevel} />
      <Button label={'开始搜索'} onClick={() => buildArmorSets(selectedSkills, gender, job, levels, armors)} />
    </InlineGroup>
  </div>
)

export default ConditionField
