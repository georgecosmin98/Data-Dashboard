import axios from 'axios'

class ContactService{

    sendMail(from,subject,text){
        console.log(from);
        console.log(subject);
        console.log(atob(text))
        return axios.put(`http://localhost:8080/contact/sendMail/${from}/${subject}/${btoa(text)}`)
    }
}

export default new ContactService()