import React from 'react'
import style from './index.css'
import SkillLabel from 'components/SkillLabel'

const SkillLabelGroup = ({ selectedSkills = [], toggleSkill }) => (
  <div className={style.skillLabelGroup}>
    {
      selectedSkills.map((skill) => (
        <SkillLabel key={skill.id}
          skill={skill}
          onClick={() => { toggleSkill(skill) }}
        />)
      )
    }
  </div>
)

export default SkillLabelGroup
