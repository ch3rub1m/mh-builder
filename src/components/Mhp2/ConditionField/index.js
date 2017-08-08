import React from 'react'
import style from './index.css'
import SkillLabelGroup from 'components/Base/SkillLabelGroup'
import InlineGroup from 'components/Base/InlineGroup'
import RadioButtonGroup from 'components/Base/RadioButtonGroup'
// import CheckBox from 'components/Base/CheckBox'
import Button from 'components/Base/Button'

const ConditionField = ({
  skillSystems,
  armors,
  decorators,
  selectedSkills,
  gender,
  job,
  rares,
  selectSkill,
  selectGender,
  selectJob,
  toggleLevel,
  buildArmorSets
 }) => (
   <div className={style.conditionField}>
     <div className={style.top}>
       <SkillLabelGroup selectedSkills={selectedSkills} selectSkill={selectSkill} />
     </div>
     <InlineGroup>
       <RadioButtonGroup label={'性别'} options={['男', '女']} value={gender} select={selectGender} />
       <RadioButtonGroup label={'职业'} options={['剑士', '枪手']} value={job} select={selectJob} />
       {/* <CheckBox label={'搜索范围'} options={[1, 2, 3, 4, 5, 6, 7, 8]} values={rares} select={toggleLevel} /> */}
       <Button label={'开始搜索'} onClick={() =>
          buildArmorSets(skillSystems, armors, decorators, {
            selectedSkills,
            gender,
            job,
            rares
          })
        }
      />
     </InlineGroup>
   </div>
)

export default ConditionField
