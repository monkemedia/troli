require('dotenv').config()
const MoltinGateway = require('@moltin/sdk').gateway
const { Router } = require('express')

const router = Router()

const Moltin = MoltinGateway({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
})

const errorHandler = (res, err) => {
  const error = err.errors[0]

  return res.status(error.status).send(error)
}

/* Sign user in. */
router.post('/sign-in', async (req, res) => {
  try {
    const response = await Moltin.Customers.Token(req.body.email, req.body.password)
    return res.status(200).send(response.data)
  } catch (err) {
    return errorHandler(res, err)
  }
})

router.post('/get-customer', async (req, res) => {
  console.log('cutomerId', req.body.customer_id)
  try {
    const response = await Moltin.Customers.Get(req.body.customer_id)
    return res.status(200).send(response.data)
  } catch (err) {
    return errorHandler(res, err)
  }
})

module.exports = router
