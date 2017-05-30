import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import style from './index.css'
import SkillList from 'components/Base/SkillList'
import ConditionField from 'components/Mhp/ConditionField'
import ResultField from 'components/Base/ResultField'

class Mhp extends Component {

  componentDidMount () {
    const { loadResource } = this.props
    loadResource('skill_systems', 'mhp')
    loadResource('skills', 'mhp')
    loadResource('armors', 'mhp')
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    const {
      skillSystems,
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
            skillSystems={skillSystems}
            armors={armors}
            selectedSkills={selectedSkills}
            gender={gender}
            job={job}
            levels={levels}
            selectSkill={selectSkill}
            selectGender={selectGender}
            selectJob={selectJob}
            toggleLevel={toggleLevel}
            buildArmorSets={buildArmorSets} />
          <ResultField className={'row'}
            armorSets={armorSets} />
        </div>
      </div>
    )
  }
}

const selector = (state) => {
  const { 'skill_systems': skillSystems, skills, armors } = state.loadResourceReducer
  let { selectedSkills } = state.selectSkillReducer
  const { gender } = state.selectGenderReducer
  const { job } = state.selectJobReducer
  const { levels } = state.toggleLevelReducer
  const { armorSets } = state.buildArmorSetsReducer
  return {
    skillSystems,
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
    toggleLevel: bindActionCreators(actions.toggleLevel, dispatch),
    buildArmorSets: bindActionCreators(actions.buildArmorSets, dispatch)
  }
}

export default connect(selector, mapDispatchToProps)(Mhp)
