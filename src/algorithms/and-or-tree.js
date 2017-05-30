import { mapToString, stringToMap } from 'helpers/hashcode'

export class Node {
  static specialValues: {}
  constructor ({ type, part, values = new Map(), children = [] }) {
    this.type = type
    this.part = part
    this.values = values
    this.children = children
  }
}

export class DataNode extends Node {
  constructor ({ part, values = new Map(), data }) {
    super({
      type: 'data',
      part,
      values
    })
    this.data = data
  }
}

export const and = (a, b) => {
  const specialValues = Node.specialValues
  const values = new Map(a.values)
  for (let [key, value] of b.values) {
    const oldValue = values.get(key) || 0
    let newValue = oldValue + value
    if (b.part === 1) {
      newValue = [
        newValue,
        values.get(specialValues['胴系統+1'] && specialValues['胴系統+1'].id) || 0,
        values.get(specialValues['胴系統+2'] && specialValues['胴系統+2'].id) * 2 || 0,
        value * values.get(specialValues['胴系統倍加'].id)
      ].reduce((a, b) => a + b)
    }
    values.set(key, newValue)
  }
  if (b.part === 1) {
    for (let key of Object.keys(specialValues)) {
      const specialValue = specialValues[key]
      values.delete(specialValue.id)
    }
  }
  return new Node({
    type: 'and',
    part: 'multiple',
    values,
    children: [a, b]
  })
}

export const or = (nodes, keypoint) => {
  const specialValues = Node.specialValues
  let orNodeMap = new Map()
  for (let node of nodes) {
    let values = new Map()
    values.set(keypoint, node.values.get(keypoint) || 0)
    for (let key of Object.keys(specialValues)) {
      const specialValue = specialValues[key]
      values.set(specialValue.id, node.values.get(specialValue.id) || 0)
    }
    const hashcode = mapToString(values)
    if (!orNodeMap.has(hashcode)) {
      orNodeMap.set(hashcode, [])
    }
    orNodeMap.get(hashcode).push(node)
  }
  let orNodes = []
  const part = nodes[0] && nodes[0].part
  for (let [key, value] of orNodeMap) {
    const hashcode = key
    const values = stringToMap(hashcode)
    const orNode = new Node({
      type: 'or',
      part,
      values,
      children: value
    })
    orNodes.push(orNode)
  }
  return orNodes
}

export const combine = (nodeAs, nodeBs, keypoint) => {
  let andNodes = []
  for (let nodeA of nodeAs) {
    for (let nodeB of nodeBs) {
      andNodes.push(and(nodeA, nodeB))
    }
  }
  return or(andNodes, keypoint)
}

export const split = (node, keypoint) => {
  switch (node.type) {
    case 'or':
      return or(node.children.reduce((previous, current) => previous.concat(split(current, keypoint)), []), keypoint)
    case 'and':
      return combine(split(node.children[0], keypoint), split(node.children[1], keypoint), keypoint)
    default:
      return node
  }
}

export const expand = (node) => {
  switch (node.type) {
    case 'or':
      return node.children.map((child) => expand(child)).reduce((previous, current) => previous.concat(current), [])
    case 'and':
      const results = []
      for (let a of expand(node.children[0])) {
        for (let b of expand(node.children[1])) {
          results.push([].concat(a).concat(b))
        }
      }
      return results
    default:
      return [node.data]
  }
}
