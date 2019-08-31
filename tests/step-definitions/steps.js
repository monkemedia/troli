const { client } = require('nightwatch-api')
const { Given, Then } = require('cucumber')
const { url, email, password } = require('../../nightwatch.conf.js').test_settings.default.globals

const pages = {
  'homepage': `${url}/`,
  'login page': `${url}/login`,
  'forgotten password page': `${url}/forgotten-password`,
  'reset password page': `${url}/forgotten-password/12345`
}

function dataQa (qa) {
  return `[data-qa="${qa}"]`
}

function pageUrl (pageName) {
  return pages[pageName.toLowerCase()]
}

Given('I visit/the/see the/a {string}', async (pageName) => {
  await client.url(pageUrl(pageName)).waitForElementVisible('body', 1000)
})

Then('I visit/see the/a {string} page', async (pageName) => {
  await client.url(pageUrl(pageName)).waitForElementVisible('body', 1000)
})

Then('I see {string} in the {string}', async (qa, qa2) => {
  await client
    .waitForElementVisible(dataQa(qa))
    .waitForElementVisible(dataQa(qa2))
    .click(dataQa(qa2))
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

Then('I click the/on {string}', async (qa) => {
  await client
    .waitForElementVisible(dataQa(qa))
    .click(dataQa(qa))
})

Then('I hover the/on {string}', async (qa) => {
  await client
    .waitForElementVisible(dataQa(qa))
    .moveToElement(dataQa(qa), 0, 0)
})

Then('I wait {int} second(s)', async (seconds) => {
  await client.pause(seconds * 1000)
})

// Then I see an "alert notification" with the text "Unable to verify customer."
Then('I see an {string} with the text {string}', async (qa, text) => {
  await client
    .waitForElementVisible(dataQa(qa))
    .assert.containsText(dataQa(qa), text)
})

Then('the lang meta should be {string}', async (text) => {
  await client
    .waitForElementVisible(dataQa('html'))
    .assert.attributeContains(dataQa('html'), 'lang', text)
})
