import fetchReducer, { fetchRequested } from 'reducers/fetch'
import { selectSkill, selectSkillReducer } from 'reducers/selectSkill'
import { selectGender, selectGenderReducer } from 'reducers/selectGender'
import { selectJob, selectJobReducer } from 'reducers/selectJob'
import { toggleLevel, toggleLevelReducer } from 'reducers/toggleLevel'
import { buildArmorSets, buildArmorSetsReducer } from 'reducers/buildArmorSets'

// actions

export const actions = {
  fetchRequested,
  selectSkill,
  selectGender,
  selectJob,
  toggleLevel,
  buildArmorSets
}

// reducers

import { combineReducers } from 'redux'

export const reducers = combineReducers({
  fetchReducer,
  selectSkillReducer,
  selectGenderReducer,
  selectJobReducer,
  toggleLevelReducer,
  buildArmorSetsReducer
})
