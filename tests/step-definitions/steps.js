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
const { Given, Then } = require('cucumber')
const { url, email, password } = require('../../nightwatch.conf.js').test_settings.default.globals

const pages = {
  'homepage': `${url}/`,
  'login page': `${url}/login`
}

function dataQa (qa) {
  return `[data-qa="${qa}"]`
}

function pageUrl (pageName) {
  return pages[pageName.toLowerCase()]
}

Given('I visit the {string}', async (pageName) => {
  await client.url(pageUrl(pageName)).waitForElementVisible('body', 1000)
})

Then('I visit the {string} page', async (pageName) => {
  await client.url(pageUrl(pageName)).waitForElementVisible('body', 1000)
})

Then('I see a/the {string}', async (qa) => {
  await client.waitForElementVisible(dataQa(qa))
})

Then('I enter {string} in the {string}', async (text, qa) => {
  await client
    .waitForElementVisible(dataQa(qa))
    .setValue(dataQa(qa), text)
})

Then('I enter email in the email box', async () => {
  await client
    .waitForElementVisible(dataQa('email box'))
    .setValue(dataQa('email box'), email)
})

Then('I enter password in the password box', async () => {
  await client
    .waitForElementVisible(dataQa('password box'))
    .setValue(dataQa('password box'), password)
})

Then('I click the {string}', async (qa) => {
  await client
    .waitForElementVisible(dataQa(qa))
    .click(dataQa(qa))
})

Then('I wait {int} seconds', async (seconds) => {
  await client.pause(seconds * 1000)
})

// Then I see an "alert notification" with the text "Unable to verify customer."
Then('I see an {string} with the text {string}', async (qa, text) => {
  await client
    .waitForElementVisible(dataQa(qa))
    .assert.containsText(dataQa(qa), text)
})
