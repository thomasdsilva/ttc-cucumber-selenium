const { readdirSync } = require('fs')
const path = require('path')
const { readFileSync } = require('jsonfile')
const { log } = require('@nodebug/logger')
const {
  setWorldConstructor,
  setDefaultTimeout,
  setDefinitionFunctionWrapper,
} = require('cucumber')
const { takeScreenshot } = require('@nodebug/selenium/driver')
const config = require('@nodebug/config')('cucumber')

const options = require('@nodebug/config')('selenium')
const driver = require('@nodebug/selenium/driver').getDriver()
const Selenium = require('@nodebug/selenium')

const { env } = config
const stack = (() => {
  if (
    typeof config.stack !== 'boolean' &&
    config.stack !== '' &&
    config.stack !== null &&
    config.stack !== 'null'
  ) {
    return config.stack
  }
  return config.env
})()

const users = () => {
  const that = {}
  const folder = `${process.cwd()}/features/shared/data/users/${env}`
  readdirSync(folder).forEach((file) => {
    const filepath = `${folder}/${file}`
    that[`${path.parse(filepath).name}`] = readFileSync(filepath)
  })
  return that
}

function ThisWorld({ attach }) {
  this.environment = env
  this.stack = stack
  this.urls = readFileSync(`${process.cwd()}/features/.urls/web.json`)
  this.endpoints = readFileSync(`${process.cwd()}/features/.urls/api.json`)
  this.users = users()
  this.url = null
  this.apiserver = null
  this.data = new Map()
  setDefaultTimeout(10 * config.timeout * 1000)
  this.screenshots = config.screenshots
  this.attach = attach
  this.browser = new Selenium(driver, options)
}

setWorldConstructor(ThisWorld)

setDefinitionFunctionWrapper(
  (fn) =>
    // eslint-disable-next-line func-names
    async function () {
      // eslint-disable-next-line prefer-rest-params
      await fn.apply(this, arguments)
      if (
        this.screenshots !== undefined &&
        this.screenshots.toLowerCase().includes('always')
      ) {
        try {
          await this.attach(await takeScreenshot(), 'image/png')
        } catch (ex) {
          log.error(ex)
        }
      }
    },
)
