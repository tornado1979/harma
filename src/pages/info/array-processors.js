export function generateArray(dataArray) {
  const res = Object.entries(dataArray).map(month => ({ label: month[0], val: month[1] }))
  return res
}
