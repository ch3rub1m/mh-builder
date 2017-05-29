import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import style from './index.css'
import SkillList from 'components/SkillList'
import ConditionField from 'components/ConditionField'
import ResultField from 'components/ResultField'

class App extends Component {

  componentDidMount () {
    const { loadResource } = this.props
    loadResource('skills', 'mhp')
    loadResource('armors', 'mhp')
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    const {
      skills,
      armors
    } = this.props
    const {
      selectedSkills,
      gender,
      job,
      levels,
      armorSets
    } = this.props
    const {
      selectSkill,
      selectGender,
      selectJob,
      toggleLevel,
      buildArmorSets
    } = this.props
    return (
      <div className={style.root}>
        <div className={style.left}>
          <SkillList
            skills={skills}
            selectedSkills={selectedSkills}
            selectSkill={selectSkill} />
        </div>
        <div className={style.right}>
          <ConditionField
            armors={armors}
            selectedSkills={selectedSkills}
            selectSkill={selectSkill}
            gender={gender}
            selectGender={selectGender}
            job={job}
            selectJob={selectJob}
            levels={levels}
            toggleLevel={toggleLevel}
            buildArmorSets={buildArmorSets} />
          <ResultField className={'row'}
            armorSets={armorSets} />
        </div>
      </div>
    )
  }
}

App.propTypes = {

}

const selector = (state) => {
  const { skills, armors } = state.loadResourceReducer
  let { selectedSkills } = state.selectSkillReducer
  const { gender } = state.selectGenderReducer
  const { job } = state.selectJobReducer
  const { levels } = state.toggleLevelReducer
  const { armorSets } = state.buildArmorSetsReducer
  return {
    skills,
    armors,
    selectedSkills,
    gender,
    job,
    levels,
    armorSets
  }
}

import { actions } from 'reducers'

const mapDispatchToProps = (dispatch) => {
  return {
    loadResource: bindActionCreators(actions.loadResource, dispatch),
    selectSkill: bindActionCreators(actions.selectSkill, dispatch),
    selectGender: bindActionCreators(actions.selectGender, dispatch),
    selectJob: bindActionCreators(actions.selectJob, dispatch),
    buildArmorSets: bindActionCreators(actions.buildArmorSets, dispatch),
    toggleLevel: bindActionCreators(actions.toggleLevel, dispatch)
  }
}

export default connect(selector, mapDispatchToProps)(App)
