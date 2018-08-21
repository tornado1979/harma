export function generateArray(dataArray) {
  const res = Object.entries(dataArray).map(month => ({ val: month[1], label: month[0] }))
  return res
}
