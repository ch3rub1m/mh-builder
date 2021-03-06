import { planting, harvest } from 'and-or-tree'
import { assigner } from 'algorithms/assigner'
import { add, toMap, mapToString } from 'algorithms/map'
import ArmorSet from 'algorithms/armor-set'

const getPoints = (decoratorsData) => {
  const cache = new Map()
  return (assignment) => {
    const hashcode = mapToString(assignment)
    if (cache.get(hashcode) !== undefined) {
      return cache.get(hashcode)
    } else {
      let skillSystems = new Map()
      for (const [key, value] of assignment) {
        const deco = decoratorsData[key]
        skillSystems = add(skillSystems, toMap(deco.skill_systems), value)
      }
      cache.set(mapToString(assignment), skillSystems)
    }
  }
}

const verify = (skills, assign, getPoints) => {
  return (armorSet) => {
    let flag = true
    for (const skill of skills) {
      const point = armorSet.values.get(skill.skill_system.id) || 0
      if (skill.required_point > point) {
        flag = false
      }
    }
    if (flag) return true
    const assignments = assign(armorSet.slots.get(1), armorSet.slots.get(2), armorSet.slots.get(3))
    for (const assignment of assignments) {
      const skillSystems = add(getPoints(assignment), armorSet.values)
      let flag = true
      for (const skill of skills) {
        const point = skillSystems.get(skill.skill_system.id) || 0
        if (skill.required_point > point) {
          flag = false
          break
        }
      }
      if (flag) return true
    }
    return false
  }
}

const contributionHandlerCreator = (skills) => {
  return (seed) => {
    let contribution = 0
    for (const skill of skills) {
      contribution += seed.skill_systems[skill.skill_system.id] || 0
    }
    const vals = { 1: 1, 2: 3, 3: 5 }
    contribution += vals[seed.slot_number] || 0
    return contribution
  }
}

export default ({ selectedSkills = [], armors = [], decorators = [], decoratorsData = {} }) => {
  const targetContribution = selectedSkills.reduce((point, skill) => point + skill.required_point, 0)
  const roots = planting(armors, contributionHandlerCreator(selectedSkills))
  const fruits = harvest(roots, targetContribution)
  let armorSets = fruits.map(armors => new ArmorSet(armors))
  const assign = assigner(decorators, selectedSkills)
  console.log('过滤前方案数量', armorSets.length)
  const start = Date.now()
  armorSets = armorSets.filter(verify(selectedSkills, assign, getPoints(decoratorsData)))
  const end = Date.now()
  const minus = `${(end - start) / 1000}s`
  console.log('动态规划花费时间：' + minus)
  console.log('过滤后方案数量', armorSets.length)
  armorSets.sort((a, b) => b.defence - a.defence)
  return armorSets.slice(0, 100)
}
