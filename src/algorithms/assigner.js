import { times } from 'algorithms/map'

export const assigner = (decorators, skills) => {
  decorators = filterBySkills(decorators, skills)
  const decoratorList = new Map()
  decoratorList.set(1, filterBySlot(decorators, 1))
  decoratorList.set(2, filterBySlot(decorators, 2))
  decoratorList.set(3, filterBySlot(decorators, 3))
  const resultMap = new Map()
  const assign = (i = 0, j = 0, k = 0) => {
    const hashcode = `${i}|${j}|${k}`
    if (resultMap.has(hashcode)) {
      return resultMap.get(hashcode)
    } else {
      let result = []
      if (i === 0 && j === 0 && k === 0) {
        result = [new Map()]
      } else if (j === 0 && k === 0) {
        result = times(assign(i - 1, 0, 0), decoratorList.get(1))
      } else if (k === 0) {
        result = assign(i + 2, j - 1, 0).concat(times(assign(i, j - 1, 0), decoratorList.get(2)))
      } else {
        result = assign(i + 1, j + 1, k - 1).concat(times(assign(i, j, k - 1), decoratorList.get(3)))
      }
      resultMap.set(hashcode, result)
      return result
    }
  }
  return assign
}

const filterBySkills = (decorators, skills) => {
  return decorators.filter(decorator => {
    for (const skill of skills) {
      if (decorator.skill_systems[skill.skill_system.id]) {
        return true
      }
    }
    return false
  })
}

const filterBySlot = (decorators, i) => {
  return decorators
    .filter(decorator => decorator.slot === i)
    .map(decorator => new Map([[decorator.id, 1]]))
}
