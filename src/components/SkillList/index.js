import React from 'react'
import style from './index.css'
import List from 'components/List'

const SkillList = ({ skills = [], selectedSkills = [], selectSkill }) => (
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
          skills.map((skill, index) => (
            <tr
              className={`${style.line} ${selectedSkills.includes(skill) ? style.active : ''}`}
              key={skill + index}
              onClick={() => {
                selectSkill(skill.id)
              }}>
              <td>{skill.name}</td>
              <td>{skill.description}</td>
            </tr>
        ))}
      </tbody>
    </List>
  </div>
)

export default SkillList
