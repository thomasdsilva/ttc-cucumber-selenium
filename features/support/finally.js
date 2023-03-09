// const { resolve } = require('path')
// const { readFileSync, writeFileSync } = require('jsonfile')
// const { capabilities } = require('@nodebug/selenium/driver')
// const { fdate, ftime } = require('@nodebug/selenium/utils')
// const config = require('@nodebug/config')('cucumber')
// const { log } = require('@nodebug/logger')

// const { env } = config
// const stack = (() => {
//   if (
//     typeof config.stack !== 'boolean' &&
//     config.stack !== '' &&
//     config.stack !== null &&
//     config.stack !== 'null'
//   ) {
//     return config.stack
//   }
//   return config.env
// })()

// const reportPath = (() => {
//   if (config.f !== undefined) {
//     return resolve(config.f.split(':')[1])
//   }
//   return undefined
// })()

// async function updateMetadata() {
//   const caps = await capabilities
//   if (reportPath !== undefined) {
//     try {
//       const metadata = {
//         Browser: caps.browserName.toUpperCase(),
//         'Browser Version': caps.browserVersion.toUpperCase(),
//         Platform: caps.platformName.toUpperCase(),
//         Environment: env.toUpperCase(),
//         Stack: stack.toUpperCase(),
//         // Grid: grid.toUpperCase(),
//         'Date Time': `${fdate()} ${ftime()}`,
//       }
//       const contents = readFileSync(reportPath)
//       contents[0].metadata = metadata
//       writeFileSync(reportPath, contents)
//     } catch (error) {
//       log.error('Unable to set selenium capabilities as meta data')
//     }
//   }
// }

// process.once('beforeExit', async () => {
//   if (config.f !== undefined) {
//     const run = `${fdate()} ${stack}`
//     await updateMetadata(env, stack)
//     // generateHtmlReport()
//   }
// })

const reporter = require('cucumber-html-reporter')
const config = require('@nodebug/config')('cucumber')

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: `reports/cucumber_report_${Date.now().toString().slice(-4)}.html`,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': config.version,
    'Test Environment': 'Shaun',
    Browser: 'Chrome  54.0.2840.98',
    Platform: 'iOS',
    Parallel: 'Scenarios',
    Executed: 'Remote',
  },
}

process.on('exit', function () {
  reporter.generate(options)
})
