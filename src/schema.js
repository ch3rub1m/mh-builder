import { normalize, denormalize, schema } from 'normalizr'

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

export const normalizeDecorators = (decorators) => normalize(decorators, [schemas['decorators']], decorators.entities)
export const denormalizedDecorators = (decorators) => denormalize(decorators.result, [schemas['decorators']], decorators.entities)
