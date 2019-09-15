require('dotenv').config()
const { Router } = require('express')
const Moltin = require('../utils/moltinGateway')
const errorHandler = require('../utils/errorHandler')
const emailTemplate = require('../utils/emailTemplate')
const tokenGen = require('../utils/tokenGenerator')
const router = Router()

function getCustomer (customerId) {
  return Moltin.Customers.Get(customerId)
}

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
    const customerCredentials = await Moltin.Customers.Token(email, password)
    const customerDetails = await getCustomer(customerCredentials.data.customer_id)

    if (!customerDetails.data.account_confirmed) {
      return errorHandler(res, {
        errors: [
          {
            status: 401,
            detail: 'Account not confirmed.'
          }
        ]
      })
    }
    return res.status(200).send(customerCredentials.data)
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
    const token = tokenGen.generateToken()
    const expiryToken = tokenGen.generateExpiryToken()
    const response = await Moltin.Customers.Create({
      name: firstName + ' ' + lastName,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      confirm_account_token: token,
      confirm_account_expiry: expiryToken
    })

    await emailTemplate.confirmAccount({
      email,
      token
    })
    return res.status(200).send(response.data)
  } catch (err) {
    return errorHandler(res, err)
  }
})

router.post('/get-customer', async (req, res) => {
  try {
    const response = await getCustomer(req.body.customer_id)
    return res.status(200).send(response.data)
  } catch (err) {
    return errorHandler(res, err)
  }
})

module.exports = router
