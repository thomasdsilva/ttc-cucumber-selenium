const { After, Then } = require('cucumber')
const { assert } = require('chai')

// eslint-disable-next-line func-names
After('@Visual', async function () {
  if (![undefined, null, ''].includes(this.screenshot)) {
    await this.attach(this.screenshot, 'image/png')
  }
  return true
})

Then('Expected page {string} should match actual', async function (test) {
  // await this.browser.element('sl-list-label').hide()

  const path = './features/GITHUB/visual'
  await this.browser.sleep(5000)
  const visual = await this.browser.visual(`${path}/${test}`)
  if (visual.status === 'failed') {
    this.attach(visual.gif, 'image/gif')
    this.screenshot = visual.actual
    assert.fail(
      `Actual page did not match the expected page by ${visual.misMatchPercentage}%`,
    )
  }

  // await this.browser.element('sl-list-label').unhide()
})

Then('Expected {string} should match actual', async function (test) {
  const path = './features/GITHUB/visual'
  await this.browser.sleep(5000)
  const visual = await this.browser.element(test).visual(`${path}/${test}`)
  if (visual.status === 'failed') {
    this.attach(visual.gif, 'image/gif')
    this.screenshot = visual.actual
    assert.fail(
      `Actual ${test} did not match the expected ${test} by ${visual.misMatchPercentage}%`,
    )
  }
})
