import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import fetchReducer, { watchFetchRequestedSaga, fetchRequested } from 'reducers/fetch'
import toggleSkillReducer, { toggleSkill } from 'reducers/toggleSkill'
import selectGenderReducer, { selectGender } from 'reducers/selectGender'
import selectJobReducer, { selectJob } from 'reducers/selectJob'
import toggleLevelReducer, { toggleLevel } from 'reducers/toggleLevel'
import buildArmorSetsReducer, { watchbuildArmorSetsRequestedSaga, buildArmorSetsRequested } from 'reducers/buildArmorSets'

export const actions = {
  fetchRequested,
  toggleSkill,
  selectGender,
  selectJob,
  toggleLevel,
  buildArmorSetsRequested
}

export const reducers = combineReducers({
  fetchReducer,
  toggleSkillReducer,
  selectGenderReducer,
  selectJobReducer,
  toggleLevelReducer,
  buildArmorSetsReducer
})

export const sagas = function * rootSaga () {
  yield all([
    watchFetchRequestedSaga(),
    watchbuildArmorSetsRequestedSaga()
  ])
}
