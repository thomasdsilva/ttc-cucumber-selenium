const stepsPath = `${process.cwd()}/features/ASSESSMENT/pages/`
const PageObject = require('@nodebug/selenium/PageObject')

let pages = {
  ActivityEditor: new PageObject('ActivityEditor.json', stepsPath)
}

module.exports = {
  pages,
}
