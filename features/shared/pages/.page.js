const stepsPath = `${process.cwd()}/features/shared/pages/`
const PageObject = require('@nodebug/selenium/pageobject')

let pages = {
  login: new PageObject('login.json', stepsPath),
  profile: new PageObject('profile.json', stepsPath),
}

module.exports = {
  pages,
}
