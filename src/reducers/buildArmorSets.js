import makeActionCreator from 'helpers/makeActionCreator'
import buildArmorSetsCalc from 'helpers/buildArmorSetsCalc'

const BUILD_ARMOR_SETS = 'BUILD_ARMOR_SETS'

export const buildArmorSets = makeActionCreator(BUILD_ARMOR_SETS, 'skillSystems', 'armors', 'conditions')
export const buildArmorSetsReducer = (state = {}, action) => {
  switch (action.type) {
    case BUILD_ARMOR_SETS:
      const { selectedSkills } = action.conditions
      const filteredArmors = filterArmors(action.armors, action.conditions)
      const armorSets = buildArmorSetsCalc(selectedSkills, filteredArmors, specialValues(action.skillSystems))
      return {
        ...state,
        armorSets
      }
    default:
      return state
  }
}

const specialValues = (skillSystems) => (
  skillSystems.result.filter(
    (skillSystemID) => {
      const skillSystem = skillSystems.entities.skillSystems[skillSystemID]
      return ['胴系統+1', '胴系統+2', '胴系統倍加'].includes(skillSystem.name)
    }
  ).reduce(
    (previous, current) => {
      const skillSystem = skillSystems.entities.skillSystems[current]
      return {
        ...previous,
        [skillSystem.name]: skillSystem
      }
    },
    {}
  )
)

const filterArmors = (armors, conditions) => {
  let { gender, job, rares, levels } = conditions
  gender = { '男': 'male', '女': 'female' }[gender]
  job = { '剑士': 'swordman', '枪手': 'gunner' }[job]
  levels = levels && levels.map((level) => ({'下位': 0, '上位': 1, 'G级': 2}[level]))
  return armors.result.filter((id) => {
    const armor = armors.entities.armors[id]
    const inRares = rares ? rares.includes(armor.rare) : true
    const inLevels = levels ? levels.includes(armor.level) : true
    return armor[gender] && armor[job] && inRares && inLevels
  }).map((id) => armors.entities.armors[id])
}
