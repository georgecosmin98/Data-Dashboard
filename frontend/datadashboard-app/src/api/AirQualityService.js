import axios from 'axios'
import { USER_NAME_SESSION_ATTRIBUTE_NAME, USER_TOKEN_SESSION_ATTRIBUTE_NAME } from '../Constants'

class AirQualityService{

    retrieveHomePollutionValues(date,sensor,latitude,longitude){
        return axios.get(`${process.env.REACT_APP_BASE_URL}/brasovdev/2020-08-25/pm25/45.64163117/25.62651885`);
      }
}
export default new AirQualityService()