import { DataNode, or, combine, expand } from 'algorithms/and-or-tree'

const armorToDataNode = (armor) => {
  let valueMap = new Map()
  for (let pairs of armor.armors_skill_types) {
    valueMap.set(pairs['skill_type_id'], pairs['point'])
  }
  return new DataNode(armor, valueMap)
}

const splitArmors = (filteredArmors) => {
  let armorsList = [[], [], [], [], []]
  const parts = ['头部', '胴部', '手部', '腰部', '脚部']
  for (let armor of filteredArmors) {
    const index = parts.indexOf(armor.part)
    armorsList[index].push(armor)
  }
  return armorsList
}

const nodesToArmorSets = (nodes) => {
  return nodes.reduce((prev, current) => prev.concat(expand(current)), [])
}

export default (selectedSkills, filteredArmors) => {
  const skillTypeID = selectedSkills[0].skill_type_id
  const requiredPoint = selectedSkills[0].required_point
  const armorsList = splitArmors(filteredArmors)
  const dataNodesList = armorsList.map((armors) => armors.map(armorToDataNode))
  const nodes = dataNodesList.reduce((previous, current) =>
    previous ? or(combine(or(current, skillTypeID), previous), skillTypeID) : or(current, skillTypeID)
  ).filter((node) =>
    Math.abs(node.valueMap.get(skillTypeID)) >= Math.abs(requiredPoint)
  )
  const armorSets = nodesToArmorSets(nodes)
  return armorSets
}
