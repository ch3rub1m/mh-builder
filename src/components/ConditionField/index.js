import React from 'react'
import style from './index.css'
import SkillLabelGroup from 'components/SkillLabelGroup'
import InlineGroup from 'components/InlineGroup'
import RadioButtonGroup from 'components/RadioButtonGroup'
// import CheckBox from 'components/CheckBox'
import Button from 'components/Button'

const ConditionField = ({
  armors,
  decorators,
  selectedSkills,
  gender,
  job,
  rares,
  toggleSkill,
  selectGender,
  selectJob,
  toggleLevel,
  onSubmit
 }) => (
   <div className={style.conditionField}>
     <div className={style.top}>
       <SkillLabelGroup selectedSkills={selectedSkills} toggleSkill={toggleSkill} />
     </div>
     <InlineGroup>
       <RadioButtonGroup
         label='性别'
         options={[{
           label: '男',
           value: 'male'
         }, {
           label: '女',
           value: 'female'
         }]}
         value={gender}
         select={selectGender}
       />
       <RadioButtonGroup
         label='职业'
         options={[{
           label: '剑士',
           value: 'swordman'
         }, {
           label: '枪手',
           value: 'gunner'
         }]}
         value={job}
         select={selectJob}
       />
       <Button label={'开始搜索'} onClick={onSubmit}
      />
     </InlineGroup>
   </div>
)

export default ConditionField
