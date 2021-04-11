import axios from 'axios'

class AirQualityService{

    retrieveHomePollutionValues(date,sensor,latitude,longitude){
        return axios.get(`${process.env.REACT_APP_BASE_URL}/brasovdev/${date}/${sensor}/${latitude}/${longitude}`);
      }
}
export default new AirQualityService()