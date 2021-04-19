import axios from 'axios'
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from '../Constants'
class UserLocationService {

  retriveUserLocationAfter(date) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/usersLocations/findAllAfter/${date}/${sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}`);
  }
}
export default new UserLocationService()