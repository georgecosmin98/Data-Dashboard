import axios from 'axios'
import Moment from 'moment';
class AirQualityService {

  retrieveHomePollutionValues(date, sensor, latitude, longitude) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/brasovdev/${Moment(date).format('YYYY-MM-DD')}/${sensor}/${latitude}/${longitude}`);
  }

  retrieveHomePollutionMaxDailyValues(date, sensor, latitude, longitude) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/brasovdev/maxDaily/${Moment(date).format('YYYY-MM-DD')}/${sensor}/${latitude}/${longitude}`);
  }

  retrieveHomePollutionAvgDailyValues(date, sensor, latitude, longitude) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/brasovdev/averageDaily/${Moment(date).format('YYYY-MM-DD')}/${sensor}/${latitude}/${longitude}`);
  }

  retrieveHomePollutionMinDailyValues(date, sensor, latitude, longitude) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/brasovdev/minDaily/${Moment(date).format('YYYY-MM-DD')}/${sensor}/${latitude}/${longitude}`);
  }

  retrievePollutionValuesForAirqualityDashboard(date, latitude, longitude) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/brasovdev/findAllAfter/${Moment(date).format('YYYY-MM-DD')}/${latitude}/${longitude}`)
  }

  retrievePollutionForUserLocations(sensor,date,latitude,longitude) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/brasovdev/test/${Moment(date).format('YYYY-MM-DD')}/${sensor}/${latitude}/${longitude}`);
  }
}
export default new AirQualityService()