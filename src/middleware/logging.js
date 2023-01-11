const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')

const LoggingRequestInfo = async (ctx, next) => {
  await next()
  const logContent = `-----------
  请求时间: ${dayjs().format('YYYY-MM-DD hh:mm:ss')}
  请求的 IP 地址: ${ctx.request.ip}
  请求的 IPs count: ${ctx.request.ips}
  请求的 URL: ${ctx.request.url}
  `
  const logPath = path.join(process.cwd(), 'log.txt')
  fs.writeFileSync(logPath, logContent, { flag: 'a' })
}

module.exports = LoggingRequestInfo