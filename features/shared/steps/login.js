const { Given } = require('cucumber')
const _ = require('lodash')

// eslint-disable-next-line func-names
Given('I login to GitHub as {string}', async function (userType) {
  this.url = await _.get(this.urls, ['GitHub', this.stack])
  this.apiserver = await _.get(this.endpoints, ['GitHub', this.stack])
  const user = this.users[userType]

  await this.browser.goto(this.url)
  await this.browser.element('Sign in').click()
  await this.browser.element('Username').write(user.username)
  await this.browser.element('Password').write(user.password)
  await this.browser.element('Sign in').below().element('Password').click()
})
