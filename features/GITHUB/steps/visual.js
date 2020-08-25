const { Then } = require('cucumber')
const driver = require('@nodebug/selenium/driver').getDriver()
const VisualObject = require('@nodebug/visual')
const { assert } = require('chai')

// eslint-disable-next-line func-names
Then('Expected page {string} should match actual', async function (test) {
  const path = './features/GITHUB/visual'
  const v = await VisualObject(driver, path, test)
  if ((await v.comparison()) === 'failed') {
    this.attach(v.buffer, 'image/png')
    assert.fail(
      `Actual page didnt not match the expected page by ${v.misMatchPercentage}%`,
    )
  }
})
