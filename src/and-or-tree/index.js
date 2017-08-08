import { DataNode, AndNode, OrNode } from './node'

const group = (nodes) => {
  let orNodeMap = new Map()
  for (const node of nodes) {
    const contribution = node.contribution
    if (!orNodeMap.has(contribution)) {
      orNodeMap.set(contribution, [])
    }
    orNodeMap.get(contribution).push(node)
  }
  let orNodes = []
  for (const value of orNodeMap.values()) {
    const orNode = new OrNode(value)
    orNodes.push(orNode)
  }
  return orNodes
}

const combine = (nodeAs, nodeBs) => {
  let andNodes = []
  for (const nodeA of nodeAs) {
    for (const nodeB of nodeBs) {
      andNodes.push(new AndNode(nodeA, nodeB))
    }
  }
  return andNodes
}

export const expand = (node) => {
  switch (node.constructor.name) {
    case 'OrNode':
      return node.children.map((child) => expand(child)).reduce((previous, current) => previous.concat(current), [])
    case 'AndNode':
      const results = []
      for (const a of expand(node.children[0])) {
        for (const b of expand(node.children[1])) {
          results.push([].concat(a).concat(b))
        }
      }
      return results
    case 'DataNode':
      return [node.data]
    default:
  }
}

export const planting = (seeds, contributionHandler) => {
  return Object.values(seeds
    .reduce((previous, current) => {
      if (previous[current.part] === undefined) previous[current.part] = []
      previous[current.part].push(current)
      return previous
    }, {}))
    .map(seeds =>
      seeds.map(seed =>
        new DataNode({
          part: seed.part,
          contribution: contributionHandler(seed),
          data: seed
        })))
    .map(group)
    .reduce((previous, current) =>
      previous ? group(combine(previous, current)) : current)
}

export const harvest = (roots, targetContribution) => {
  return roots
    .filter(root => root.contribution > targetContribution)
    .reduce((prev, current) => prev.concat(expand(current)), [])
}
