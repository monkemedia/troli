require('dotenv').config()
const MoltinGateway = require('@moltin/sdk').gateway
const { Router } = require('express')
const errorHandler = require('../utils/errorHandler')
// const postmark = require('postmark')
// const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_ID)

const router = Router()

const Moltin = MoltinGateway({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
})

/* Sign user in. */
router.post('/sign-in', async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email && !password) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          message: 'Email address is required.'
        },
        {
          status: 401,
          message: 'Password is required.'
        }
      ]
    })
  }

  if (!email) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          message: 'Email address is required.'
        }
      ]
    })
  }

  if (!password) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          message: 'Password is required.'
        }
      ]
    })
  }

  try {
    const response = await Moltin.Customers.Token(email, password)
    return res.status(200).send(response.data)
  } catch (err) {
    return errorHandler(res, err)
  }
})

router.post('/get-customer', async (req, res) => {
  try {
    const response = await Moltin.Customers.Get(req.body.customer_id)
    return res.status(200).send(response.data)
  } catch (err) {
    return errorHandler(res, err)
  }
})

module.exports = router
