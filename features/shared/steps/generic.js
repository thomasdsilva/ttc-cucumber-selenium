const { When } = require('@cucumber/cucumber')

When('I click on element having text {string}', async function (description) {
  await this.browser.element(description).click()
})

When('I click on {string}', async function (description) {
  await this.browser.exact().element(description).click()
})

When('I click on {string} below {string}', async function (element1, element2) {
  await this.browser
    .exact()
    .element(element1)
    .below()
    .exact()
    .element(element2)
    .click()
})

When('I switch to {string} tab', async function (tab) {
  await this.browser.switchTab(tab)
})

When('I mouse hover on {string}', async function (description) {
  await this.browser.exact().element(description).hover()
})

When('I scroll {string} into view', async function (description) {
  await this.browser.exact().element(description).scroll()
})

When('I close {string} tab', async function (tab) {
  await this.browser.closeTab(tab)
})
