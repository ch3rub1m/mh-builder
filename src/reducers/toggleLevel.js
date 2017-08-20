import { createActions, handleActions } from 'redux-actions'

export const { toggleLevel } = createActions({
  TOGGLE_LEVEL: (level) => ({
    level
  })
})

export default handleActions({
  [toggleLevel]: (state, { payload: { level } }) => {
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
  }
}, {
  levels: ['下位', '上位', 'G级']
})
