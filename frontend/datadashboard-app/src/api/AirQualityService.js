import axios from 'axios'
import Moment from 'moment';
class AirQualityService{

    retrieveHomePollutionValues(date,sensor,latitude,longitude){
        return axios.get(`${process.env.REACT_APP_BASE_URL}/brasovdev/${Moment(date).format('YYYY-MM-DD')}/${sensor}/${latitude}/${longitude}`);
      }

    retrievePollutionValuesForAirqualityDashboard(date,latitude,longitude){
      return axios.get(`${process.env.REACT_APP_BASE_URL}/brasovdev/findAllAfter/${date}/${latitude}/${longitude}`)
    }
}
export default new AirQualityService()