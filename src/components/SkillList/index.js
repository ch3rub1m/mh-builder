import React from 'react'
import style from './index.css'
import List from 'components/List'

const SkillList = ({ skills = [], selectedSkillIDs = [], toggleSkill }) => (
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
          skills.map((skill) => {
            const operator = skill.required_point > 0 ? '>' : '<'
            return (
              <tr
                className={`${style.line} ${selectedSkillIDs.includes(skill.id) ? style.active : ''}`}
                key={skill.name}
                onClick={() => {
                  toggleSkill(skill)
                }}>
                <td>{skill.name}</td>
                <td>{skill.skill_system.name} {operator} {skill.required_point}</td>
              </tr>
            )
          })
        }
      </tbody>
    </List>
  </div>
)

export default SkillList
