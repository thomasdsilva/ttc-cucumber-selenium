const { When } = require('@cucumber/cucumber')

When('I logout of GitHub', async function () {
  await this.browser.exact().element('Summary').click()
  await this.browser.exact().element('Sign Out').click()
})
