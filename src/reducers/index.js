import { loadResource, loadResourceReducer } from 'reducers/loadResource'
import { selectSkill, selectSkillReducer } from 'reducers/selectSkill'
import { selectGender, selectGenderReducer } from 'reducers/selectGender'
import { selectJob, selectJobReducer } from 'reducers/selectJob'
import { toggleLevel, toggleLevelReducer } from 'reducers/toggleLevel'
import { buildArmorSets, buildArmorSetsReducer } from 'reducers/buildArmorSets'

// actions

export const actions = {
  loadResource,
  selectSkill,
  selectGender,
  selectJob,
  toggleLevel,
  buildArmorSets
}

// reducers

import { combineReducers } from 'redux'

export const reducers = combineReducers({
  loadResourceReducer,
  selectSkillReducer,
  selectGenderReducer,
  selectJobReducer,
  toggleLevelReducer,
  buildArmorSetsReducer
})
