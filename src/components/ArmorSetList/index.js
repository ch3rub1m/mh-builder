import React from 'react'
import List from 'components/List'

const ArmorSetList = ({ armorSets }) => (
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
      {armorSets.map((armorSet) => (
        <tr key={armorSet}>
          {armorSet.map((armor, key) => (
            <td key={armor + key}>{armor}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </List>
)

export default ArmorSetList
