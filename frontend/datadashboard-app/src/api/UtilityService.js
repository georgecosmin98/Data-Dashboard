import axios from 'axios'

class UtilityService{
    verifyEmail(from){
       // return axios.put(`http://185.146.87.75:8080/airquality/contact/emailVerification/${from}`)
        return axios.put(`http://localhost:8080/contact/emailVerification/${from}`)
    }
}
export default new UtilityService()