import axios from 'axios'
import Moment from 'moment';
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from '../Constants'
class UserLocationService {

  retriveUserLocationAfter(date) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/usersLocations/findAllAfter/${Moment(date).format('YYYY-MM-DD')}/${sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}`);
  }

 
}
export default new UserLocationService()