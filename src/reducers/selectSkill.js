import makeActionCreator from 'helpers/makeActionCreator'

const SELECT_SKILL = 'SELECT_SKILL'

export const selectSkill = makeActionCreator(SELECT_SKILL, 'skill')

export const selectSkillReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_SKILL:
      const skill = action.skill
      const selectedSkills = {
        ...state.selectedSkills
      }
      if (selectedSkills.hasOwnProperty(skill.id)) {
        delete selectedSkills[skill.id]
      } else {
        selectedSkills[skill.id] = skill
      }
      return {
        ...state,
        selectedSkills
      }
    default:
      return state
  }
}
