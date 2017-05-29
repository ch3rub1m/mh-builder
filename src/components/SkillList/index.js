import React from 'react'
import style from './index.css'
import List from 'components/List'

const SkillList = ({ skills = { result: [], entities: [] }, selectedSkills = {}, selectSkill }) => (
  <div className={style.skillList}>
    <List>
      <thead>
        <tr>
          <th>技能</th>
          <th>技能描述</th>
        </tr>
      </thead>
      <tbody>
        {
          skills.result.map((id) => {
            const skill = skills.entities.skills[id]
            const skillSystem = skills.entities.skillSystems[skill.skill_system]
            const operator = skill.required_point > 0 ? '>' : '<'
            return (
              <tr
                className={`${style.line} ${selectedSkills.hasOwnProperty(skill.id) ? style.active : ''}`}
                key={skill.name}
                onClick={() => {
                  selectSkill(skill)
                }}>
                <td>{skill.name}</td>
                <td>{skillSystem.name} {operator} {skill.required_point}</td>
              </tr>
            )
          })
        }
      </tbody>
    </List>
  </div>
)

export default SkillList
