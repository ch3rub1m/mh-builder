import makeActionCreator from 'helpers/makeActionCreator'

const SELECT_GENDER = 'SELECT_GENDER'

export const selectGender = makeActionCreator(SELECT_GENDER, 'gender')

export const selectGenderReducer = (state = { gender: '男' }, action) => {
  switch (action.type) {
    case SELECT_GENDER:
      const gender = action.gender
      return {
        ...state,
        gender
      }
    default:
      return state
  }
}
