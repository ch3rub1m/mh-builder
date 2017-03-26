import makeActionCreator from 'helpers/makeActionCreator'

const SELECT_GENDER = 'SELECT_GENDER'

export const selectGender = makeActionCreator(SELECT_GENDER, 'gender')

export const selectGenderReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_GENDER:
      const gender = action.gender || '男'
      return {
        ...state,
        gender
      }
    default:
      return state
  }
}
