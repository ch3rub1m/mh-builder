import React, { Component } from 'react'
import { connect } from 'react-redux'

import style from './index.css'
import SkillList from 'components/SkillList'
import ConditionField from 'components/ConditionField'
import ResultField from 'components/ResultField'
import { actions } from 'reducers'
import { denormalized } from 'schema'

class Mhp2 extends Component {
  componentDidMount () {
    const { fetchRequested } = this.props
    fetchRequested({ version: 'mhp2', resource: 'skills' })
    fetchRequested({ version: 'mhp2', resource: 'armors' })
    fetchRequested({ version: 'mhp2', resource: 'decorators' })
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    const {
      skills,
      selectedSkillIDs,
      selectedSkills
    } = this.props
    const {
      gender,
      job,
      armorSets,
      armors,
      decorators,
      decoratorsData
    } = this.props
    const {
      toggleSkill,
      selectGender,
      selectJob,
      buildArmorSetsRequested
    } = this.props
    const build = () => {
      buildArmorSetsRequested({
        selectedSkills,
        armors,
        decorators,
        decoratorsData
      })
    }
    return (
      <div className={style.root}>
        <div className={style.left}>
          <SkillList
            skills={skills}
            selectedSkillIDs={selectedSkillIDs}
            toggleSkill={toggleSkill}
          />
        </div>
        <div className={style.right}>
          <ConditionField
            selectedSkills={selectedSkills}
            toggleSkill={toggleSkill}
            gender={gender}
            selectGender={selectGender}
            job={job}
            selectJob={selectJob}
            onSubmit={build} />
          <ResultField className={'row'}
            armorSets={armorSets} />
        </div>
      </div>
    )
  }
}

const selector = (state) => {
  const { 'skills': skillsData, 'armors': armorsData, 'decorators': decoratorsData } = state.fetchReducer
  const { selectedSkillIDs } = state.toggleSkillReducer
  const skills = skillsData && denormalized(Object.keys(skillsData), 'skills', state.fetchReducer)
  const decorators = decoratorsData && denormalized(Object.keys(decoratorsData), 'decorators', state.fetchReducer)
  const selectedSkills = skills && denormalized(selectedSkillIDs, 'skills', state.fetchReducer)
  const { gender } = state.selectGenderReducer
  const { job } = state.selectJobReducer
  const armors = armorsData && denormalized(Object.keys(armorsData), 'armors', state.fetchReducer).filter((armor) => {
    return armor[gender] && armor[job]
  })
  const { armorSets } = state.buildArmorSetsReducer
  return {
    skills,
    selectedSkillIDs,
    selectedSkills,
    armors,
    decorators,
    gender,
    job,
    armorSets,
    decoratorsData
  }
}

const mapDispatchToProps = {
  fetchRequested: actions.fetchRequested,
  toggleSkill: actions.toggleSkill,
  selectGender: actions.selectGender,
  selectJob: actions.selectJob,
  buildArmorSetsRequested: actions.buildArmorSetsRequested
}

export default connect(selector, mapDispatchToProps)(Mhp2)
