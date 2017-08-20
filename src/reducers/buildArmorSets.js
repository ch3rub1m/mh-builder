import { createActions, handleActions } from 'redux-actions'
import { put, call, takeEvery } from 'redux-saga/effects'
import build from 'algorithms'

export const { buildArmorSetsRequested, buildArmorSetsSucceeded, buildArmorSetsFailed } = createActions({
  BUILD_ARMOR_SETS_REQUESTED: ({ selectedSkills, armors, decorators, decoratorsData }) => ({
    selectedSkills,
    armors,
    decorators,
    decoratorsData
  }),
  BUILD_ARMOR_SETS_SUCCEEDED: (armorSets) => ({ armorSets }),
  BUILD_ARMOR_SETS_FAILED: (error) => ({ error })
})

export default handleActions({
  [buildArmorSetsSucceeded]: (state, { payload: { armorSets = [] } }) => {
    return {
      ...state,
      armorSets
    }
  },
  [buildArmorSetsFailed]: (state, { payload: { error } }) => {
    return state
  }
}, {
  armorSets: []
})

export function * buildArmorSetsRequestedSaga ({ payload: { selectedSkills, armors, decorators, decoratorsData } }) {
  const armorSets = yield call(build, selectedSkills, armors, decorators, decoratorsData)
  yield put(buildArmorSetsSucceeded(armorSets))
}

export function * watchbuildArmorSetsRequestedSaga () {
  yield takeEvery(buildArmorSetsRequested, buildArmorSetsRequestedSaga)
}

// const specialValues = (skillSystems) => (
//   skillSystems.filter(
//     (skillSystemID) => {
//       const skillSystem = skillSystems.entities.skillSystems[skillSystemID]
//       return ['胴系統+1', '胴系統+2', '胴系統倍加'].includes(skillSystem.name)
//     }
//   ).reduce(
//     (previous, current) => {
//       const skillSystem = skillSystems.entities.skillSystems[current]
//       return {
//         ...previous,
//         [skillSystem.name]: skillSystem
//       }
//     },
//     {}
//   )
// )
