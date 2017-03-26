import React from 'react'
import style from './index.css'
import SkillLabel from 'components/SkillLabel'

const SkillLabelGroup = ({ selectedSkills = [], selectSkill }) => (
  <div className={style.skillLabelGroup}>
    { selectedSkills.map((skill) => (<SkillLabel key={skill.name} skill={skill} selectSkill={selectSkill} />)) }
  </div>
)

export default SkillLabelGroup
