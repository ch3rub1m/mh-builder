import { DataNode, or, combine, expand } from 'algorithms/and-or-tree'

const armorToDataNode = (armor) => {
  let valueMap = new Map()
  for (let pairs of armor.armors_skill_types) {
    valueMap.set(pairs['skill_type_id'], pairs['point'])
  }
  return new DataNode(armor, valueMap)
}

const armorsToDataNodes = (armors) => {
  let dataNodes = []
  for (let armor of armors) {
    dataNodes.push(armorToDataNode(armor))
  }
  return dataNodes
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
  const nests = nodes.reduce((prev, current) => prev.concat(expand(current)), [])
  return nests.reduce((prev, current) => prev.concat(current.map((nest) => undo(nest))), []).map((nest) => nest[0])
}

const undo = (nest) => {
  if (nest instanceof Array) {
    const results = []
    for (let a of undo(nest[0])) {
      for (let b of undo(nest[1])) {
        results.push([].concat(a).concat(b))
      }
    }
    return results
  } else {
    return [nest.data]
  }
}

export default (selectedSkills, filteredArmors) => {
  const skillTypeID = selectedSkills[0].skill_type_id
  const requiredPoint = selectedSkills[0].required_point
  const armorsList = splitArmors(filteredArmors)
  const dataNodesList = armorsList.map((armors) => armorsToDataNodes(armors))
  const nodes = dataNodesList.reduce((previous, current) =>
    previous ? or(combine(or(current, skillTypeID), previous), skillTypeID) : or(current, skillTypeID)
  ).filter((node) =>
    Math.abs(node.valueMap.get(skillTypeID)) >= Math.abs(requiredPoint)
  )
  const armorSets = nodesToArmorSets(nodes)
  console.log(armorSets)
  return armorSets
}
