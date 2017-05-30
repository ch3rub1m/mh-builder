import { schema } from 'normalizr'

const skillSystem = new schema.Entity('skillSystems')
const skill = new schema.Entity('skills', {
  skill_system: skillSystem
})
const armor = new schema.Entity('armors')
const decorator = new schema.Entity('decorators')

export const schemas = {
  'skill_systems': skillSystem,
  'skills': skill,
  'armors': armor,
  'decorators': decorator
}
