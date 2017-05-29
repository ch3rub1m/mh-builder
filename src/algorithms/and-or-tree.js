import { mapToString, stringToMap } from 'helpers/hashcode'

export class Node {
  constructor (type, valueMap = new Map(), part, children = []) {
    this.type = type
    this.valueMap = valueMap
    this.part = part
    this.children = children
  }
}

export class DataNode extends Node {
  constructor (data, valueMap = new Map(), part) {
    super('data', valueMap, part)
    this.data = data
  }
}

export const and = (a, b) => {
  let valueMap = new Map()
  for (let pair of a.valueMap) {
    const key = pair[0]
    const value = pair[1]
    const oldValue = valueMap.get(key) || 0
    valueMap.set(key, oldValue + value)
  }
  if (b.part === 1) {
    for (let pair of b.valueMap) {
      const key = pair[0]
      const value = pair[1]
      if (![60, 61, 62].includes(key)) {
        const oldValue = valueMap.get(key) || 0
        const newValue = oldValue + valueMap.get(60) + valueMap.get(61) * 2 + value * valueMap.get(62) + value
        valueMap.set(key, newValue)
      }
    }
    valueMap.delete(60)
    valueMap.delete(61)
    valueMap.delete(62)
  } else {
    for (let pair of b.valueMap) {
      const key = pair[0]
      const value = pair[1]
      const oldValue = valueMap.get(key) || 0
      valueMap.set(key, oldValue + value)
    }
  }
  return new Node('and', valueMap, 'multiple', [a, b])
}

export const or = (nodes, keypoint) => {
  let orNodeMap = new Map()
  for (let node of nodes) {
    let valueMap = new Map()
    valueMap.set(keypoint, node.valueMap.get(keypoint) || 0)
    valueMap.set(60, node.valueMap.get(60) || 0)
    valueMap.set(61, node.valueMap.get(61) || 0)
    valueMap.set(62, node.valueMap.get(62) || 0)
    const hashcode = mapToString(valueMap)
    if (!orNodeMap.has(hashcode)) {
      orNodeMap.set(hashcode, [])
    }
    orNodeMap.get(hashcode).push(node)
  }
  let orNodes = []
  const part = nodes[0] && nodes[0].part
  for (let pair of orNodeMap) {
    const hashcode = pair[0]
    const valueMap = stringToMap(hashcode)
    const orNode = new Node('or', valueMap, part, pair[1])
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
