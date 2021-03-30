import axios from 'axios'

class UserService {

    //Retrieve user informations
    retrieveUserGeneralInfo() {
        return axios.get(`${process.env.REACT_APP_BASE_URL}/users/retrieveUserDetails`);
    }

    //Change user informations
    changeUserGeneralInfo(name, address) {
        return axios.post(`${process.env.REACT_APP_BASE_URL}/users/changeUserDetails`, { name, address })
    }
}
export default new UserService()