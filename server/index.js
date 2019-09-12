// require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const port = process.env.PORT || 3000
const config = require('../nuxt.config.js')
const services = require('./services')

app.set('port', port)

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

if (process.env.NODE_ENV === 'staging') {
  // app.use(wwwhisper())
}

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// Import API Routes
app.use('/api/v1/', services)

// Give nuxt middleware to express
app.use(nuxt.render)

// app.listen(port, host)

// Listen the server
app.get('/', (req, res) => {
  const result = 'App is running'
  res.send(result)
})
  .listen(app.get('port'), () => {
    console.log('App is running, server is listening on port ', app.get('port'))
  })
