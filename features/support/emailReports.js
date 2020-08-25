const { sendEmail } = require('@nodebug/emailer')
const config = require('@nodebug/config')('cucumber')

const stack = (() => {
  if (
    typeof config.stack !== 'boolean' &&
    config.stack !== '' &&
    config.stack !== null &&
    config.stack !== 'null'
  ) {
    return config.stack
  }
  return config.env
})()

sendEmail(stack)
