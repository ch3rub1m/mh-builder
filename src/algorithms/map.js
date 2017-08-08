export const mapToString = (map) => {
  let array = []
  for (const [key, value] of map) {
    array.push([key, value])
  }
  return array
    .sort((a, b) => a[0] - b[0])
    .reduce((previous, current) => {
      previous.push(`${current[0]}:${current[1]}`)
      return previous
    }, [])
    .join(';')
}

export const stringToMap = (string) => {
  const pairStrings = string.split(';')
  let map = new Map()
  for (const pairString of pairStrings) {
    let pair = pairString.split(':')
    if (pair.length === 2) {
      map.set(parseInt(pair[0]), parseInt(pair[1]))
    }
  }
  return map
}

export const add = (a = new Map(), b = new Map(), times = 1) => {
  const result = new Map(a)
  for (const [key, value] of b) {
    const raw = result.get(key) || 0
    result.set(key, raw + value * times)
  }
  return result
}

export const times = (as = [], bs = []) => {
  const map = new Map()
  for (const a of as) {
    for (const b of bs) {
      const sum = add(a, b)
      map.set(mapToString(sum), sum)
    }
  }
  const result = []
  for (const [, value] of map) {
    result.push(value)
  }
  return result
}

export const toMap = (object) => {
  let map = new Map()
  for (const key of Object.keys(object)) {
    map.set(parseInt(key), object[key])
  }
  return map
}
