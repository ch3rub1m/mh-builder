import { normalize, denormalize, schema } from 'normalizr'

const skillSystem = new schema.Entity('skillSystems')
const skill = new schema.Entity('skills', {
  skill_system: skillSystem
})
const armor = new schema.Entity('armors')
const decorator = new schema.Entity('decorators')

const schemas = {
  'skill_systems': skillSystem,
  'skills': skill,
  'armors': armor,
  'decorators': decorator
}

export const normalizeDecorators = (decorators) => normalize(decorators, [schemas['decorators']], decorators.entities)
export const denormalizedDecorators = (decorators) => denormalize(decorators.result, [schemas['decorators']], decorators.entities)

export const normalized = (data, name) => normalize(data, [ schemas[name] ])
export const denormalized = (data, name, entities) => denormalize(data, [ schemas[name] ], entities)
