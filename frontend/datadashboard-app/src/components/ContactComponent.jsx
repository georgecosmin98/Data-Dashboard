import React, { Component } from 'react';



class ContactComponent extends Component {
    render() {
        return (
            <div className="contact">
                <div className="form">
                    <h1 class="l-heading"><span class="text-primary">Contact </span>US</h1>
                    <p>Your questions, comments and feedbacks are important for us!</p>
                    <form action="process.php">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" name="email" id="email" />
                        </div>
                        <div class="form-group">
                            <label for="Message">Message</label>
                            <textarea name="Message" id="Message"></textarea>
                        </div>
                        <div className="btn-center">
                            <button type="submit" className="btn ">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ContactComponent;