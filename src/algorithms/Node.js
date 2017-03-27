export class Node {
  constructor (valueMap = new Map(), children = []) {
    this.valueMap = valueMap
    this.children = children
  }
}

export class DataNode extends Node {
  constructor (data, valueMap = new Map(), children = []) {
    super(valueMap, children)
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
  return new Node(valueMap, [a, b])
}

export const or = (nodes, keypoint) => {
  let orNodes = []
  let orNodeMap = new Map()
  for (let node of nodes) {
    const value = node.valueMap.get(keypoint)
    if (!orNodeMap.has(value)) {
      orNodeMap.set(value, [])
    }
    orNodeMap.get(value).push(node)
  }
  for (let pairs of orNodeMap) {
    const valueMap = new Map([[keypoint, pairs[0]]])
    const orNode = new Node(valueMap, pairs[1])
    orNodes.push(orNode)
  }
  return orNodes
}

export const combine = (nodeAs, nodeBs) => {
  let andNodes = []
  for (let nodeA of nodeAs) {
    for (let nodeB of nodeBs) {
      andNodes.push(and(nodeA, nodeB))
    }
  }
  return andNodes
}
