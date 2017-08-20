import { createActions, handleActions } from 'redux-actions'

export const { selectGender } = createActions({
  SELECT_GENDER: (gender) => ({
    gender
  })
})

export default handleActions({
  [selectGender]: (state, { payload: { gender } }) => {
    return {
      ...state,
      gender
    }
  }
}, {
  gender: 'male'
})
