import React from 'react'
import style from './index.css'
import CloseButton from 'components/CloseButton'

const SkillLabel = ({ skillName }) => (
  <div className={style.skillLabel}>
    <div className={style.skillName}>
      { skillName }
    </div>
    <CloseButton label={'X'} />
  </div>
)

export default SkillLabel
