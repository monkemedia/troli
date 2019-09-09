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
          detail: 'Email address is required.'
        },
        {
          status: 401,
          detail: 'Password is required.'
        }
      ]
    })
  }

  if (!email) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Email address is required.'
        }
      ]
    })
  }

  if (!password) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Password is required.'
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

/* Register user. */
router.post('/register', async (req, res) => {
  const firstName = req.body.first_name
  const lastName = req.body.last_name
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirm_password

  if (!firstName) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'First name is required.'
        }
      ]
    })
  }

  if (!lastName) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Last name is required.'
        }
      ]
    })
  }

  if (!email) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Email address is required.'
        }
      ]
    })
  }

  if (!password) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Password is required.'
        }
      ]
    })
  }

  if (password && !confirmPassword) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Confirm password is required.'
        }
      ]
    })
  }

  if (password !== confirmPassword) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Passwords do not match'
        }
      ]
    })
  }

  if (password.length < 8) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Password must be at least 8 characters long.'
        }
      ]
    })
  }

  try {
    const response = await Moltin.Customers.Create({
      name: firstName + ' ' + lastName,
      first_name: firstName,
      last_name: lastName,
      email,
      password
    })
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
