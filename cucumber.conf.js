const { setDefaultTimeout, AfterAll, BeforeAll } = require('cucumber')
const { createSession, closeSession, startWebDriver, stopWebDriver } = require('nightwatch-api')
const isReachable = require('is-reachable')
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 1339
const maxWaitTime = 90

setDefaultTimeout(60000)

BeforeAll(async () => {
  const testServer = `${host}:${port}`

  console.log(`Waiting for test server ${testServer}...`)

  let i = 0
  while (!(await isReachable(testServer)) && (i <= maxWaitTime)) {
    i++
    await sleep(1000)
  }
  if (!(await isReachable(testServer))) {
    throw new Error(`Unable to reach the test server within ${maxWaitTime} seconds!`)
  }

  await startWebDriver({ configFile: 'nightwatch.conf.js' })
  await createSession()
})

AfterAll(async () => {
  await closeSession()
  await stopWebDriver()
})
