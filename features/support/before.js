const { Before, BeforeStep } = require('@cucumber/cucumber')
const Driver = require('@nodebug/selenium')
const { log } = require('@nodebug/logger')

Before(async function () {
  this.browser = new Driver()
  await this.browser.start()
})

BeforeStep(async function (event) {
  log.debug(event.pickleStep.text)
})
