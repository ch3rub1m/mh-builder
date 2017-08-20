import React from 'react'
import style from './index.css'
import List from 'components/List'

const ArmorSetList = ({ armorSets, activedIndex }) => (
  <div>
    <List>
      <thead>
        <tr>
          <th>头部</th>
          <th>胴部</th>
          <th>腕部</th>
          <th>腰部</th>
          <th>脚部</th>
          <th>防</th>
          <th>火</th>
          <th>水</th>
          <th>雷</th>
          <th>龙</th>
        </tr>
      </thead>
      <tbody>
        {armorSets.map((armorSet, i) => {
          return (
            <tr className={`${style.line} ${activedIndex === i ? style.active : ''}`} key={armorSet + i}>
              {armorSet.armors.map((armor, j) => (
                <td key={armor + i + j}>{armor.name}</td>
              ))}
              <td>{armorSet.defence}</td>
              <td>{armorSet.fire}</td>
              <td>{armorSet.water}</td>
              <td>{armorSet.thunder}</td>
              <td>{armorSet.dragon}</td>
            </tr>
          )
        })}
      </tbody>
    </List>
  </div>
)

export default ArmorSetList
