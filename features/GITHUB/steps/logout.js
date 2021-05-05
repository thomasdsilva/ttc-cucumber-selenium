const { When } = require('cucumber')
const { pages } = require('../pages/pages.js')

When('I logout of GitHub', async () => {
  await pages.profile.click('Summary')
  await pages.profile.click('Sign Out')
})
