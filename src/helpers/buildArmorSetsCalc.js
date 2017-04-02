import { DataNode, or, combine, split, expand } from 'algorithms/and-or-tree'

const armorToDataNode = (armor) => {
  let valueMap = new Map()
  for (let pairs of armor.armors_skill_types) {
    valueMap.set(pairs['skill_type_id'], pairs['point'])
  }
  return new DataNode(armor, valueMap, armor.part)
}

const splitArmors = (filteredArmors) => {
  let armorsList = [[], [], [], [], []]
  const parts = ['头部', '腕部', '腰部', '脚部', '胴部']
  for (let armor of filteredArmors) {
    const index = parts.indexOf(armor.part)
    armorsList[index].push(armor)
  }
  return armorsList
}

const verify = (skill) => {
  return (node) => Math.abs(node.valueMap.get(skill.skill_type_id)) >= Math.abs(skill.required_point)
}

const nodesToArmorSets = (nodes) => {
  return nodes.reduce((prev, current) =>
    prev.concat(expand(current)), [])
  .map((armorSet) =>
    [armorSet[0], armorSet[4], armorSet[1], armorSet[2], armorSet[3]])
}

export default (selectedSkills, filteredArmors) => {
  const skill = selectedSkills[0]
  const skillTypeID = skill.skill_type_id
  const armorsList = splitArmors(filteredArmors)
  const orNodesList = armorsList.map((armors) => or(armors.map(armorToDataNode), skillTypeID))
  let nodes = orNodesList.reduce((previous, current) =>
    previous ? combine(previous, current, skillTypeID) : current
  ).filter(verify(skill))
  for (var i = 1; i < selectedSkills.length; i++) {
    const skill = selectedSkills[i]
    const skillTypeID = skill.skill_type_id
    nodes = nodes.reduce((previous, current) =>
      previous.concat(split(current, skillTypeID)), []
    ).filter(verify(skill))
  }
  const armorSets = nodesToArmorSets(nodes)
  return armorSets.slice(0, 100)
}
