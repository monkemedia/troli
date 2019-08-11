import { gateway as MoltinGateway } from '@moltin/sdk'

const Moltin = MoltinGateway({
  client_id: 'hpSDCOhjEVdWv4PsatUlN55RDMwdL17O9NfRu8AYNA',
  client_secret: '2rPVg6LrpeyihsAJZq8N7W3Q9qIHiJBSHjvEKfoVmg'
})

const errorHandler = (err) => {
  console.log(err.errors[0])
  return err.errors[0]
}

const $moltin = {
  async createCustomer (customer) {
    try {
      const response = await Moltin.Customers.Create(customer)
      return response
    } catch (err) {
      errorHandler(err)
    }
  },

  async customerToken (credentials) {
    try {
      const response = await Moltin.Customers.Token(credentials.email, credentials.password)
      return response
    } catch (err) {
      errorHandler(err)
    }
  },

  async getCustomer (customerId) {
    try {
      const response = await Moltin.Customers.Get(customerId)
      return response
    } catch (err) {
      errorHandler(err)
    }
  }
}

export default function (context, inject) {
  inject('moltin', $moltin)
}
