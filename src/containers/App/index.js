import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import style from './index.css'
import SkillList from 'components/SkillList'
import ConditionField from 'components/ConditionField'
import ResultField from 'components/ResultField'

class App extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { loadResource } = this.props
    loadResource('skill_types')
    loadResource('skills')
    loadResource('armors')
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    const { skillTypes, skills, armors, selectSkill, selectedSkills, gender, selectGender, job, selectJob, buildArmorSets } = this.props
    return (
      <div className={`${style.root} container`}>
        <div className={'row'}>
          <div className={`three columns`}>
            <SkillList skills={skills} skillTypes={skillTypes} selectedSkills={selectedSkills} selectSkill={selectSkill} />
          </div>
          <div className={`nine columns`}>
            <ConditionField className={'row'}
              armors={armors}
              selectedSkills={selectedSkills}
              selectSkill={selectSkill}
              gender={gender}
              selectGender={selectGender}
              job={job}
              selectJob={selectJob}
              buildArmorSets={buildArmorSets} />
            <ResultField className={'row'} />
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {

}

const selector = (state) => {
  const { skillTypes, skills, armors } = state.loadResourceReducer
  let { selectedSkillIDs } = state.selectSkillReducer
  const { gender } = state.selectGenderReducer
  const { job } = state.selectJobReducer
  selectedSkillIDs = selectedSkillIDs || new Set()
  selectedSkillIDs = Array.from(selectedSkillIDs)
  const selectedSkills = selectedSkillIDs.map(skillID => skills[skillID - 1])
  return {
    skillTypes,
    skills,
    selectedSkills,
    gender,
    job,
    armors
  }
}

import { actions } from 'reducers'

const mapDispatchToProps = (dispatch) => {
  return {
    loadResource: bindActionCreators(actions.loadResource, dispatch),
    selectSkill: bindActionCreators(actions.selectSkill, dispatch),
    selectGender: bindActionCreators(actions.selectGender, dispatch),
    selectJob: bindActionCreators(actions.selectJob, dispatch),
    buildArmorSets: bindActionCreators(actions.buildArmorSets, dispatch)
  }
}

export default connect(selector, mapDispatchToProps)(App)
