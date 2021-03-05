import axios from 'axios'
const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

  authenticateWithGoogle() {
    console.log("I am in authenticateWithGoogle")
    return axios.get("https://localhost:8081/google/login")
    // return axios.put(`http://localhost:8080/contact/emailVerification/${from}`)
    return
  }

  signUpWithLocalAccount(email, name, password) {
    return axios.post("http://localhost:8080/user/signup", { email, name, password })
  }

  logInWithLocalAccount(email,password){
    return axios.post("http://localhost:8080/authenticate", {email,password})
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
}
export default new AuthenticationService()