const { After, AfterAll } = require('cucumber')
const {
  closeBrowser,
  resetBrowser,
  takeScreenshot,
} = require('@nodebug/selenium/driver')
// const { RestObject } = require('@nodebug/restapi')
// const { sleep } = require('@nodebug/selenium/utils')
// const { log } = require('@nodebug/logger')

AfterAll(async () => closeBrowser())

//* **********  this After always needs to be at the bottom of this file           ***********//
// eslint-disable-next-line func-names
After(async function (scenario) {
  if (
    this.screenshots.toLowerCase().includes('onfail') &&
    scenario.result.status.toLowerCase().includes('fail')
  ) {
    await this.attach(await takeScreenshot(), 'image/png')
  }
  await resetBrowser()
})
