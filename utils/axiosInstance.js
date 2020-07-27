import axios from 'axios'
const v = process.env.version
const baseUrl = process.env.baseUrl

const trolifyClient = axios.create({
  baseURL: `${baseUrl}/${v}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export {
  trolifyClient
}
