import axios from 'axios'
import { USER_NAME_SESSION_ATTRIBUTE_NAME, USER_TOKEN_SESSION_ATTRIBUTE_NAME } from '../Constants'

class AuthenticationService {

  signUpWithLocalAccount(username, name, password) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/users/signup`, { username, name, password });
  }

  logInWithLocalAccount(username, password) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/authenticate`, { username, password })
  }

  authenticateWithSocialAccount(username, name) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/users/socialsignup`, { username, name })
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  registerSuccesfulLoginWithJwt(name, token) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, name)
    sessionStorage.setItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME, token)
    this.axiosInterceptors(token)
  }

  createJWTToken(token) {
    return 'Bearer ' + token
  }

  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME)
  }

  axiosInterceptors() {
    console.log("I am at axios interceptors")
    axios.interceptors.request.use(
      (config) => {
        if (this.isUserLoggedIn()) {
          config.headers.authorization = this.createJWTToken(sessionStorage.getItem(USER_TOKEN_SESSION_ATTRIBUTE_NAME));
        }
        console.log(config)
        return config
      }
    )
  }

  // Recover Password
  forgotPassword(email) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/users/forgotpassword`, email, { headers: { "Content-Type": "text/plain" } })
  }

  resetPassword(token, password) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/users/resetpassword`, { token, password });
  }

  isTokenExpired(token) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/users/isTokenExpired`, token);
  }

  // Change Password
  changePassword(password) {
    var username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    return axios.post(`${process.env.REACT_APP_BASE_URL}/users/changepassword`, { username, password });
  }
}
export default new AuthenticationService()