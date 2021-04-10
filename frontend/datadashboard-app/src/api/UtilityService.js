import axios from 'axios'
import { BASE_BACKEND_URL } from '../Constants.js'

class UtilityService {
  verifyEmail(from) {
    return axios.put(`${BASE_BACKEND_URL}/contact/emailVerification/${from}`)
  }

  addressToCoordinates(address){
    return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?bbox=25.51,45.55,25.68,45.70?types=address?&access_token=${process.env.REACT_APP_MAPBOX_API}`)
  }
}
export default new UtilityService()