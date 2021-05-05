const stepsPath = `${process.cwd()}/features/GITHUB/pages/`
const PageObject = require('@nodebug/selenium/PageObject')

const pages = {
  profile: new PageObject('profile.json', stepsPath),
}

module.exports = {
  pages,
}
