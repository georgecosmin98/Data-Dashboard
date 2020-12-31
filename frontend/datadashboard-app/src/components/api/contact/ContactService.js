import axios from 'axios'

class ContactService{

    sendMail(from,subject,text){
        return axios.put(`http://localhost:8080/contact/sendMail/${from}/${subject}/${text}`)
    }
}

export default new ContactService()