import build from 'algorithms'

onmessage = ({ data }) => {
  const armorSets = build(data)
  postMessage(armorSets)
}
