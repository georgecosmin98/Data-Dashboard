import axios from 'axios'
import { Base64 } from 'js-base64';
import { BASE_BACKEND_URL } from '../../Constants'
class ContactService {

    sendMail(from, subject, text) {
        return axios.put(`${BASE_BACKEND_URL}/${from}/${subject}/${Base64.encode(text)}`)
    }
}

export default new ContactService()