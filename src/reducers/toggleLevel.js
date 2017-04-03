import makeActionCreator from 'helpers/makeActionCreator'

const ToggleLevel = 'ToggleLevel'

export const toggleLevel = makeActionCreator(ToggleLevel, 'level')

export const toggleLevelReducer = (state = { levels: ['下位', '上位', 'G级'] }, action) => {
  switch (action.type) {
    case ToggleLevel:
      const level = action.level
      const levelSet = new Set(state.levels)
      if (levelSet.has(level)) {
        levelSet.delete(level)
      } else {
        levelSet.add(level)
      }
      const levels = Array.from(levelSet)
      return {
        ...state,
        levels
      }
    default:
      return state
  }
}
