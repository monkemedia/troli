require('dotenv').config()

const chromedriver = require('chromedriver')

module.exports = {
  test_settings: {
    default: {
      globals: {
        url: 'http://localhost:1339',
        email: process.env.E2E_EMAIL,
        password: process.env.E2E_PASSWORD
      },
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
        port: 4444,
        cli_args: ['--port=4444']
      },
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  }
}
