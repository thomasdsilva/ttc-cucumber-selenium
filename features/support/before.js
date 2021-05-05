const { Before } = require('cucumber')
const options = require('@nodebug/config')('selenium')
const { open, getDriver } = require('@nodebug/selenium/driver')
const Driver = require('@nodebug/selenium')

Before(async function () {
  await open()
  const driver = await getDriver()
  this.browser = new Driver(driver, options)
})
