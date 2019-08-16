// const { client } = require('nightwatch-api')
// const { Given, Then } = require('cucumber')
// // const nightwatchConfig = require('../../nightwatch.conf.js')

// // const port = nightwatchConfig.test_settings.default.webdriver.port
// // const url = `localhost:${port}`

// // function pageUrl (pageName) {
// //   return `${url + pageName}`
// // }

// Given(/^I open Google`s search page$/, async () => {
//   await client.url('http://google.com')
// })

// Then(/^the title is "(.*?)"$/, async () => {
//   await client.assert.title('hello')
// })

// Then(/^the Google search form exists$/, async () => {
//   await client.assert.visible('input[name="q"]')
// })

// // When(/^I visit the "(.*?)$/, async (pageName) => {
// //   await client.url(pageUrl(pageName))
// // })

// // And(/^I enter "info@monkemedia.co.uk" in the "username" field$/, async (text, elem) => {
// //   await client.assert.visible('[date-name="username"]').setValue('[date-name="username"]', text)
// // })

// // And(/^I enter "1111qqqq" in the "password" field$/, async (text, elem) => {
// //   await client.assert.visible('[date-name="password"]').setValue('[date-name="password"]', text)
// // })

// // And(/^I press the "login" button$/, async (elem) => {
// //   await client.click('[date-name="login-button"]')
// // })

// // Then(/^I press the "login" button$/, async (elem) => {
// //   await client.assert.visible('input[name="q"]')
// // })

const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

Given(/^I open Google's search page$/, () => {
  return client.url('http://google.com').waitForElementVisible('body', 1000)
})

Then(/^the title is "([^"]*)"$/, (title) => {
  return client.assert.title(title)
})

Then(/^the Google search form exists$/, () => {
  return client.assert.visible('input[name="q"]')
})
