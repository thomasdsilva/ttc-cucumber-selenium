const { readdirSync } = require('fs')
const path = require('path')
const { readFileSync } = require('jsonfile')
const { setWorldConstructor } = require('@cucumber/cucumber')
const config = require('@nodebug/config')('cucumber')
const { setDefaultTimeout } = require('@cucumber/cucumber')

setDefaultTimeout(config.timeout * 1000)

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
  const folder = `${process.cwd()}/features/shared/users/${env}`
  readdirSync(folder).forEach((file) => {
    const filepath = `${folder}/${file}`
    that[`${path.parse(filepath).name}`] = readFileSync(filepath)
  })
  return that
}

const urls = () => {
  const that = {}
  const folder = `${process.cwd()}/features/shared/urls`
  readdirSync(folder).forEach((file) => {
    const filepath = `${folder}/${file}`
    that[`${path.parse(filepath).name}`] = readFileSync(filepath)
  })
  return that
}

function ThisWorld({ attach }) {
  this.environment = env
  this.stack = stack
  this.url = null
  this.urls = urls()
  this.users = users()
  this.data = new Map()
  this.screenshots = config.screenshots
  this.attach = attach
  this.screenshot = null
  setDefaultTimeout(config.timeout * 1000)
}

setWorldConstructor(ThisWorld)
