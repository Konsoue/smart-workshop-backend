
const Object2Enum = (obj) => {
  const res = {}
  for (const [key, val] of Object.entries(obj)) {
    res[key] = val
    res[val] = key
  }
  return res
}

module.exports = {
  Object2Enum
}