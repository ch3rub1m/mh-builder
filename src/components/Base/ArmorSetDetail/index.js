import React from 'react'
import List from 'components/Base/List'

const ArmorSetDetail = ({ skills, skillTypePoints }) =>
  <div>
    <List>
      <thead>
        <tr>
          <th>触发技能</th>
          <th>点数详情</th>
        </tr>
      </thead>
      <tbody>
        {skillTypePoints.map((skillTypePoint, index) => (
          <tr key={skills[index]}>
            <td>
              {skills[index]}
            </td>
            <td key={skillTypePoint[0]}>
              {skillTypePoint[0]} = {skillTypePoint[1]}
            </td>
          </tr>
        ))}
      </tbody>
    </List>
  </div>

export default ArmorSetDetail
