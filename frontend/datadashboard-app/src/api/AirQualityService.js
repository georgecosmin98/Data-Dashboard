import axios from 'axios'

class AirQualityService{

    retrieveHomePollutionValues(date,sensor,latitude,longitude){
        return axios.get(`${process.env.REACT_APP_BASE_URL}/brasovdev/2021-03-10/pm25/${latitude}/${longitude}`);
      }
}
export default new AirQualityService()