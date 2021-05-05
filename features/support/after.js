const { After } = require('cucumber')
const { RestObject } = require('@nodebug/restapi')
const { compressBase64 } = require('@nodebug/selenium/extras/imagecompress')

const specpath = '../GITHUB/apispecs'

// eslint-disable-next-line func-names
After('@delete-Courses', function () {
  const spec = `${specpath}/clear-cache.json`
  const jwt = this.users.admin_1.jwt_payload

  // eslint-disable-next-line func-names
  Object.values(this.data).forEach(function (course) {
    const api = new RestObject(spec)
    api.setCookie(jwt)
    api.spec.endpoint = api.spec.endpoint.replace('{id}', course.id)
    api.DELETE(this.apiserver)
  })
})

// eslint-disable-next-line func-names
// After('@instructor-copyMasterSection-delete-course', async function () {
//   await this.browser.reset()

//   const course = this.data.get('section')
//   await pages.createCourse.assertElementExists('courseCard', course)
//   const elements = await pages.createCourse.getWebElements('courseCard', course)
//   for (let i = 0; i < elements.length; i++) {
//     // eslint-disable-next-line no-await-in-loop
//     await deleteCourseFromCourseList(course)
//   }
//   return true
// })

//* **********  this After always needs to be at the bottom of this file           ***********//
// eslint-disable-next-line func-names
After(async function (scenario) {
  if (
    this.screenshots.toLowerCase().includes('onfail') &&
    scenario.result.status.toLowerCase().includes('fail')
  ) {
    await this.browser.screenshot()
    await this.attach(
      await compressBase64(await this.browser.screenshot()),
      'image/png',
    )
  }
  return this.browser.close()
})
