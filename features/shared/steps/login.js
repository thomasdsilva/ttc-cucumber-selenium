const { Given, When } = require('cucumber')
const { resetBrowser, visitURL } = require('@nodebug/selenium/driver')
const _ = require('lodash')

const { pages } = require('../pages/.page.js')

// eslint-disable-next-line func-names
Given(/^I login to GitHub as "(.*)"/, async function (userType) {
  this.url = await _.get(this.urls, ['GitHub', this.stack])
  this.apiserver = await _.get(this.endpoints, ['GitHub', this.stack])
  const user = this.users[userType]

  await visitURL(this.url)
  await pages.login.click('Sign In')
  await pages.login.populate('Username', user.username)
  await pages.login.populate('Password', user.password)
  await pages.login.click('Submit')
})

When('I logout of GitHub', async () => {
  await pages.profile.click('Summary')
  await pages.profile.click('Sign Out')
  await resetBrowser()
})
