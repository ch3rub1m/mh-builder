export const mapToString = (mapObject) => {
  let string = ''
  for (let pairs of mapObject) {
    string += `${pairs[0]}:${pairs[1]};`
  }
  return string.slice(0, string.length - 1)
}

export const stringToMap = (string) => {
  const pairStrings = string.split(';')
  let valueMap = new Map()
  for (let pairString of pairStrings) {
    let pair = pairString.split(':')
    valueMap.set(parseInt(pair[0]), parseInt(pair[1]))
  }
  return valueMap
}
