import axios from 'axios'
import { BASE_BACKEND_URL } from '../Constants.js'

class UtilityService {
  verifyEmail(from) {
    return axios.put(`${BASE_BACKEND_URL}/contact/emailVerification/${from}`)
  }
}
export default new UtilityService()