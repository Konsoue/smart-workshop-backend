const fs = require('fs')
const path = require('path')

const LoggingRequestInfo = async (ctx, next) => {
  await next()
  const logContent = `-----------
  请求的 IP 地址: ${ctx.request.ip}
  请求的 URL: ${ctx.request.url}
  `
  const logPath = path.join(process.cwd(), 'log.txt')
  fs.writeFileSync(logPath, logContent)
}

module.exports = LoggingRequestInfo