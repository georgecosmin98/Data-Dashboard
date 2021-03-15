import axios from 'axios'
import { BASE_BACKEND_URL } from '../Constants.js'

const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
class AuthenticationService {

  signUpWithLocalAccount(username, name, password) {
    return axios.post(`${BASE_BACKEND_URL}/users/signup`, { username, name, password });
  }

  logInWithLocalAccount(username, password) {
    return axios.post(`${BASE_BACKEND_URL}/authenticate`, { username, password })
  }

  authenticateWithSocialAccount(username, name) {
    return axios.post(`${BASE_BACKEND_URL}/users/socialsignup`, { username, name})
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  registerSuccesfulLoginWithJwt(name, token) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, name)
    this.axiosInterceptors(this.createJWTToken(token))
    console.log(name)
  }

  createJWTToken(token) {
    return 'Bearer ' + token
  }

  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

  }

  axiosInterceptors(token) {
    axios.interceptors.request.use(
      (config) => {
        if (this.isUserLoggedIn()) {
          config.headers.authorization = token
        }
        return config
      }
    )
  }

  // Recover Password
  forgotPassword(email) {
    return axios.post(`${BASE_BACKEND_URL}/users/forgotpassword`, email, { headers: { "Content-Type": "text/plain" } })
  }

  resetPassword(token, password) {
    return axios.post(`${BASE_BACKEND_URL}/users/resetpassword`, { token, password });
  }

}
export default new AuthenticationService()