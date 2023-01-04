const fs = require('fs')
const path = require('path')

const getEnvConfig = () => {
  const config = {}
  const configEnvPath = path.join(__dirname, 'config.env')
  const env = fs.readFileSync(configEnvPath, 'utf-8') || ''
  const source = env.split('\n')
  for (let i = 0; i < source.length; i++) {
    if (source[i] !== '') {
      const [key, val] = source[i].split('=')
      config[key] = val
    }
  }
  return config
}



module.exports = getEnvConfig()