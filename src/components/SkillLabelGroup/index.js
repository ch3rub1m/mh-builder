import React from 'react'
import style from './index.css'
import SkillLabel from 'components/SkillLabel'

const SkillLabelGroup = ({ skillNames }) => (
  <div className={style.skillLabelGroup}>
    { skillNames.map((skillName) => (<SkillLabel key={skillName} skillName={skillName} />)) }
  </div>
)

export default SkillLabelGroup
