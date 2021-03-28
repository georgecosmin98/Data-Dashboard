import axios from 'axios'
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from '../Constants'
class UserLocationService {

  retriveUserLocationAfter(data) {
    return axios.get(`http://localhost:8080/usersLocations/findAllAfter/${data}/${sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}`);
  }
}
export default new UserLocationService()