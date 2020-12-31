import axios from 'axios'
import { Base64 } from 'js-base64';

class ContactService{

    sendMail(from,subject,text){
        console.log(from);
        console.log(subject);
        console.log(Base64.encode(text))
        return axios.put(`http://localhost:8080/contact/sendMail/${from}/${subject}/${Base64.encode(text)}`)
    }
}

export default new ContactService()