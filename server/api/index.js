const { Router } = require('express')
const moltin = require('./moltin.js')
const router = Router()

router.use(moltin)

module.exports = router
