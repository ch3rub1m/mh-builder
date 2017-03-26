import makeActionCreator from 'helpers/makeActionCreator'

const SELECT_SKILL = 'SELECT_SKILL'

export const selectSkill = makeActionCreator(SELECT_SKILL, 'skillID')

export const selectSkillReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_SKILL:
      const skillID = action.skillID
      const selectedSkillIDSet = new Set(state.selectedSkillIDs)
      if (selectedSkillIDSet.has(skillID)) {
        selectedSkillIDSet.delete(skillID)
      } else {
        selectedSkillIDSet.add(skillID)
      }
      const selectedSkillIDs = Array.from(selectedSkillIDSet)
      return {
        ...state,
        selectedSkillIDs
      }
    default:
      return state
  }
}
