import makeActionCreator from 'helpers/makeActionCreator'
import buildArmorSetsCalc from 'helpers/buildArmorSetsCalc'

const BUILD_ARMOR_SETS = 'BUILD_ARMOR_SETS'

export const buildArmorSets = makeActionCreator(BUILD_ARMOR_SETS, 'selectedSkills', 'gender', 'job', 'levels', 'armors')

export const buildArmorSetsReducer = (state = {}, action) => {
  switch (action.type) {
    case BUILD_ARMOR_SETS:
      const { selectedSkills, gender, job, levels, armors } = action
      const filteredArmors = filterArmors(gender, job, levels, armors)
      const armorSets = buildArmorSetsCalc(selectedSkills, filteredArmors)
      return {
        ...state,
        armorSets
      }
    default:
      return state
  }
}

const filterArmors = (gender, job, levels, armors) => {
  gender = { '男': 'male', '女': 'female' }[gender]
  job = { '剑士': 'swordman', '枪手': 'gunner' }[job]
  return armors.filter((armor) => armor[gender] && armor[job] && levels.includes(armor.level))
}
