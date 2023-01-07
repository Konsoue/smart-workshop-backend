class HttpException extends Error {
  // message为异常信息，errorCode为错误码(开发人员内部约定)，code为HTTP状态码
  constructor(message = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode || 10000
    this.code = code || 400
    this.message = message || '服务器异常'
  }
}

module.exports = HttpException