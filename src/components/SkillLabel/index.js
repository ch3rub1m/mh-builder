import React from 'react'
import style from './index.css'
import CloseButton from 'components/CloseButton'

const SkillLabel = ({ skill, selectSkill }) => (
  <div className={style.skillLabel}>
    <div className={style.skillName}>
      { skill.name }
    </div>
    <CloseButton label={'X'}
      onClick={() => {
        selectSkill(skill.id)
      }}
    />
  </div>
)

export default SkillLabel
