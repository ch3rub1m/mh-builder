import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import style from './index.css'
import SkillList from 'components/Base/SkillList'
import ConditionField from 'components/Mhp2/ConditionField'
import ResultField from 'components/Base/ResultField'

class Mhp2 extends Component {

  componentDidMount () {
    const { fetchRequested } = this.props
    fetchRequested({ version: 'mhp2', resource: 'skill_systems' })
    fetchRequested({ version: 'mhp2', resource: 'skills' })
    fetchRequested({ version: 'mhp2', resource: 'armors' })
    fetchRequested({ version: 'mhp2', resource: 'decorators' })
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    const {
      skillSystems,
      skills,
      armors,
      decorators
    } = this.props
    const {
      selectedSkills,
      gender,
      job,
      armorSets
    } = this.props
    const {
      selectSkill,
      selectGender,
      selectJob,
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
            skills={skills}
            armors={armors}
            decorators={decorators}
            selectedSkills={selectedSkills}
            gender={gender}
            job={job}
            selectSkill={selectSkill}
            selectGender={selectGender}
            selectJob={selectJob}
            buildArmorSets={buildArmorSets} />
          <ResultField className={'row'}
            armorSets={armorSets} />
        </div>
      </div>
    )
  }
}

const selector = (state) => {
  const { 'skill_systems': skillSystems, skills, armors, decorators } = state.fetchReducer
  let { selectedSkills } = state.selectSkillReducer
  const { gender } = state.selectGenderReducer
  const { job } = state.selectJobReducer
  const { armorSets } = state.buildArmorSetsReducer
  return {
    skillSystems,
    skills,
    armors,
    decorators,
    selectedSkills,
    gender,
    job,
    armorSets
  }
}

import { actions } from 'reducers'

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRequested: bindActionCreators(actions.fetchRequested, dispatch),
    selectSkill: bindActionCreators(actions.selectSkill, dispatch),
    selectGender: bindActionCreators(actions.selectGender, dispatch),
    selectJob: bindActionCreators(actions.selectJob, dispatch),
    buildArmorSets: bindActionCreators(actions.buildArmorSets, dispatch)
  }
}

export default connect(selector, mapDispatchToProps)(Mhp2)
