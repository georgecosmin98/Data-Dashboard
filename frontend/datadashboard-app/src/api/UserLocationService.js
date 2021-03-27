import axios from 'axios'

class UserLocationService {

        retriveUserLocationAfter(data){
        return axios.get(`http://localhost:8080/usersLocations/findAllAfter/${data}`);
      }
    }
export default new UserLocationService()