import { createActions, handleActions } from 'redux-actions'

export const { toggleSkill } = createActions({
  TOGGLE_SKILL: (skill) => ({
    skill
  })
})

export default handleActions({
  [toggleSkill]: (state, { payload: { skill } }) => {
    const selectedSkillIDSet = new Set(state.selectedSkillIDs)
    if (selectedSkillIDSet.has(skill.id)) {
      selectedSkillIDSet.delete(skill.id)
    } else {
      selectedSkillIDSet.add(skill.id)
    }
    const selectedSkillIDs = Array.from(selectedSkillIDSet)
    return {
      ...state,
      selectedSkillIDs
    }
  }
}, {
  selectedSkillIDs: []
})
