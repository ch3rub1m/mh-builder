import React from 'react'
import style from './index.css'
import List from 'components/List'

const ArmorSetList = ({ armorSets = [], activedIndex }) => (
  <div>
    <List>
      <thead>
        <tr>
          <th>头部</th>
          <th>胴部</th>
          <th>手部</th>
          <th>腰部</th>
          <th>脚部</th>
        </tr>
      </thead>
      <tbody>
        {armorSets.map((armorSet, i) => (
          <tr className={`${style.line} ${activedIndex === i ? style.active : ''}`} key={armorSet + i}>
            {armorSet.map((armor, j) => (
              <td key={armor + i + j}>{armor.name}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </List>
  </div>
)

export default ArmorSetList
