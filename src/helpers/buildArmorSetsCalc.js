import { Node, DataNode, or, combine, split, expand } from 'algorithms/and-or-tree'

class ArmorSet {
  constructor (armors) {
    this.armors = armors
    const { defence, fire, water, thunder, dragon } = armors.reduce((previous, current) => {
      return {
        defence: previous.defence + current.defence,
        fire: previous.fire + current.fire,
        water: previous.water + current.water,
        thunder: previous.thunder + current.thunder,
        dragon: previous.dragon + current.dragon
      }
    }, { defence: 0, fire: 0, water: 0, thunder: 0, dragon: 0 })
    this.defence = defence
    this.fire = fire
    this.water = water
    this.thunder = thunder
    this.dragon = dragon
  }
}

const armorToDataNode = (armor) => {
  let values = new Map()
  for (let key of Object.keys(armor.skill_systems)) {
    values.set(parseInt(key), armor.skill_systems[key])
  }
  return new DataNode({
    part: armor.part,
    values: values,
    data: armor
  })
}

const splitArmors = (filteredArmors) => {
  let armorsList = [[], [], [], [], []]
  const parts = [0, 2, 3, 4, 1]
  for (let armor of filteredArmors) {
    const index = parts.indexOf(armor.part)
    armorsList[index].push(armor)
  }
  return armorsList
}

const verify = (skill) => {
  return (node) => Math.abs(node.values.get(skill.skill_system)) >= Math.abs(skill.required_point)
}

const nodesToArmorSets = (nodes) => {
  return nodes.reduce((prev, current) =>
    prev.concat(expand(current)), [])
  .map((armors) => new ArmorSet([armors[0], armors[4], armors[1], armors[2], armors[3]]))
}

export default (selectedSkills, filteredArmors, specialValues) => {
  selectedSkills = Object.keys(selectedSkills).map((key) => selectedSkills[key])
  Node.specialValues = specialValues
  const skill = selectedSkills[0]
  if (!skill) return []
  const skillSystemID = skill.skill_system
  const armorsList = splitArmors(filteredArmors)
  const orNodesList = armorsList.map((armors) => or(armors.map(armorToDataNode), skillSystemID))
  let nodes = orNodesList.reduce((previous, current) =>
    previous ? combine(previous, current, skillSystemID) : current
  ).filter(verify(skill))
  for (let i = 1; i < selectedSkills.length; i++) {
    const skill = selectedSkills[i]
    const skillSystemID = skill.skill_system
    nodes = nodes.reduce((previous, current) =>
      previous.concat(split(current, skillSystemID)), []
    ).filter(verify(skill))
  }
  const armorSets = nodesToArmorSets(nodes)
  armorSets.sort((a, b) => b.defence - a.defence)
  return armorSets.slice(0, 100)
}
