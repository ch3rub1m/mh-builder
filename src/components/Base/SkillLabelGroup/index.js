import React from 'react'
import style from './index.css'
import SkillLabel from 'components/Base/SkillLabel'

const SkillLabelGroup = ({ selectedSkills = {}, selectSkill }) => (
  <div className={style.skillLabelGroup}>
    { Object.keys(selectedSkills).map((key) => (<SkillLabel key={key} skill={selectedSkills[key]} selectSkill={selectSkill} />)) }
  </div>
)

export default SkillLabelGroup
