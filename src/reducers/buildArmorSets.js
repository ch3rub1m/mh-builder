import makeActionCreator from 'helpers/makeActionCreator'
import buildArmorSetsCalc from 'helpers/buildArmorSetsCalc'

const BUILD_ARMOR_SETS = 'BUILD_ARMOR_SETS'

export const buildArmorSets = makeActionCreator(BUILD_ARMOR_SETS, 'selectedSkills', 'gender', 'job', 'armors')

export const buildArmorSetsReducer = (state = {}, action) => {
  switch (action.type) {
    case BUILD_ARMOR_SETS:
      const { selectedSkills, gender, job, armors } = action
      const filteredArmors = filterArmors(gender, job, armors)
      const armorSets = buildArmorSetsCalc(selectedSkills, filteredArmors)
      return {
        ...state,
        armorSets
      }
    default:
      return state
  }
}

const filterArmors = (gender, job, armors) => {
  gender = { '男': 'male', '女': 'female' }[gender]
  job = { '剑士': 'swordman', '枪手': 'gunner' }[job]
  return armors.filter((armor) => {
    return armor[gender] && armor[job]
  })
}
