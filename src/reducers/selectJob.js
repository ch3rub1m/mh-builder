import makeActionCreator from 'helpers/makeActionCreator'

const SELECT_JOB = 'SELECT_JOB'

export const selectJob = makeActionCreator(SELECT_JOB, 'job')

export const selectJobReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_JOB:
      const job = action.job || '剑士'
      return {
        ...state,
        job
      }
    default:
      return state
  }
}
