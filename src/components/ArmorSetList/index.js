import React from 'react'
import style from './index.css'

const ArmorSetList = ({ armorSets }) => (
  <table className={style.armorSetList}>
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
      {armorSets.map((armorSet)=>(
        <tr key={armorSet}>
          {armorSet.map((armor, key)=>(
            <td key={armor+key}>{armor}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export default ArmorSetList
