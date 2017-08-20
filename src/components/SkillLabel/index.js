import React from 'react'
import style from './index.css'
import CloseButton from 'components/CloseButton'

const SkillLabel = ({ skill, onClick }) => (
  <div className={style.skillLabel}>
    <div className={style.skillName}>
      { skill.name }
    </div>
    <CloseButton label={'X'}
      onClick={onClick}
    />
  </div>
)

export default SkillLabel
