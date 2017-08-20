import { createActions, handleActions } from 'redux-actions'

export const { selectJob } = createActions({
  SELECT_JOB: (job) => ({
    job
  })
})

export default handleActions({
  [selectJob]: (state, { payload: { job } }) => {
    return {
      ...state,
      job
    }
  }
}, {
  job: 'swordman'
})
