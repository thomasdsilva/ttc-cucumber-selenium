const { After, AfterStep, Status } = require('@cucumber/cucumber')
const { compressBase64 } = require('@nodebug/selenium/')
const { log } = require('@nodebug/logger')

AfterStep(async function ({ result }) {
  if (
    (this.screenshots !== undefined &&
      this.screenshots.toLowerCase().includes('always')) ||
    (this.screenshots !== undefined &&
      this.screenshots.toLowerCase().includes('onfail') &&
      result.status === Status.FAILED)
  ) {
    try {
      await this.attach(await this.browser.screenshot(), 'image/png')
    } catch (ex) {
      log.error(`Unrecognized error occured while taking screenshot of browser. ${err}`)
    }
  }
})

After({name: 'Close Browser'}, async function () {
  try {
    return this.browser.close()
  } catch (err) {
    log.error(`Unrecognized error occured while closing browser. ${err}`)
  }
})

After({name: 'Attach Screenshot'}, async function (scenario) {
  try {
    if (
      this.screenshots.toLowerCase().includes('onfail') &&
      scenario.result.status.toLowerCase().includes('fail')
    ) {
      await this.browser.screenshot()
      await this.attach(
        await compressBase64(await this.browser.screenshot()),
        'image/png',
      )
    }
  } catch (err) {
    log.error(`Unrecognized error occured while taking screenshot of browser. ${err}`)
  }
})
