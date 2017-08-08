class Node {
  constructor ({ part, contribution, children = [] }) {
    this.part = part
    this.contribution = contribution
    this.children = children
  }
}

export class DataNode extends Node {
  constructor ({ part, contribution, data }) {
    super({
      part,
      contribution
    })
    this.data = data
  }
}

export class AndNode extends Node {
  constructor (a, b) {
    const part = 'multiple'
    const contribution = a.contribution + b.contribution
    const children = [a, b]
    super({
      part,
      contribution,
      children
    })
  }
}

export class OrNode extends Node {
  constructor (nodes = []) {
    const part = nodes[0].part
    const contribution = nodes[0].contribution
    const children = nodes
    super({
      part,
      contribution,
      children
    })
  }
}
