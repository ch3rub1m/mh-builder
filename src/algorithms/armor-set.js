import { add, toMap } from 'algorithms/map'

export default class ArmorSet {
  constructor (armors) {
    this.armors = armors
    const { values, defence, fire, water, thunder, dragon } = armors.reduce((previous, current) => {
      return {
        values: add(previous.values, toMap(current.skill_systems)),
        defence: previous.defence + current.defence,
        fire: previous.fire + current.fire,
        water: previous.water + current.water,
        thunder: previous.thunder + current.thunder,
        dragon: previous.dragon + current.dragon
      }
    }, { values: new Map(), defence: 0, fire: 0, water: 0, thunder: 0, dragon: 0 })
    this.values = values
    this.defence = defence
    this.fire = fire
    this.water = water
    this.thunder = thunder
    this.dragon = dragon
    let slots = new Map()
    for (const armor of armors) {
      const newMap = new Map()
      if (armor.slot_number === 0) continue
      newMap.set(armor.slot_number, 1)
      slots = add(slots, newMap)
    }
    this.slots = slots
  }
}
