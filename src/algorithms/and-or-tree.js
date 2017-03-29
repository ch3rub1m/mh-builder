export class Node {
  constructor (type, valueMap = new Map(), children = []) {
    this.type = type
    this.valueMap = valueMap
    this.children = children
  }
}

export class DataNode extends Node {
  constructor (data, valueMap = new Map()) {
    super('data', valueMap)
    this.data = data
  }
}

export const and = (a, b) => {
  let valueMap = new Map()
  for (let pairs of a.valueMap) {
    const key = pairs[0]
    const value = pairs[1]
    const oldValue = valueMap.get(key) || 0
    valueMap.set(key, oldValue + value)
  }
  for (let pairs of b.valueMap) {
    const key = pairs[0]
    const value = pairs[1]
    const oldValue = valueMap.get(key) || 0
    valueMap.set(key, oldValue + value)
  }
  return new Node('and', valueMap, [a, b])
}

export const or = (nodes, keypoint) => {
  let orNodes = []
  let orNodeMap = new Map()
  for (let node of nodes) {
    const value = node.valueMap.get(keypoint) || 0
    if (!orNodeMap.has(value)) {
      orNodeMap.set(value, [])
    }
    orNodeMap.get(value).push(node)
  }
  for (let pairs of orNodeMap) {
    const valueMap = new Map([[keypoint, pairs[0]]])
    const orNode = new Node('or', valueMap, pairs[1])
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
          results.push([].concat(b).concat(a))
        }
      }
      return results
    default:
      return [node.data]
  }
}
