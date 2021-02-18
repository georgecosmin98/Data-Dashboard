import axios from 'axios'
import { Base64 } from 'js-base64';

class ContactService{

    sendMail(from,subject,text){
        console.log(from);
        console.log(subject);
        console.log(Base64.encode(text))
        return axios.put(`http://185.146.87.75:8080/airquality/contact/sendMail/${from}/${subject}/${Base64.encode(text)}`)
    //    return axios.put(`http://localhost:8080/contact/sendMail/${from}/${subject}/${Base64.encode(text)}`)
    }

    verifyEmail(from){
        //return axios.put(`http://localhost:8080/contact/emailVerification/${from}`)
        //return axios.put(`http://localhost:8080/contact/emailVerification/${from}`)

        return axios.get(`https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_4KJ4xghXBwC23KZZZvMDZnYnLIUhD&emailAddress=${from}`)
    }
}

export default new ContactService()