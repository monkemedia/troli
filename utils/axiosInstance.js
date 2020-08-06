import axios from 'axios'
const v = process.env.version
const baseUrl = process.env.baseUrl

const trolifyOAuth = axios.create({
  baseURL: `${baseUrl}/oauth`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const trolifyClient = axios.create({
  baseURL: `${baseUrl}/${v}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export {
  trolifyOAuth,
  trolifyClient
}
