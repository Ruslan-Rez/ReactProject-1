import React, {useRef, useState} from "react";
import emailjs from '@emailjs/browser';
function ContactPage(){
    const [formData, setFormData] = useState({
        _name: '',
        user_email: '',
        message: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const form = useRef();
    const sendEmail =(e) =>{
        e.preventDefault();
        emailjs.sendForm('service_iy6pi09','template_wisf4tl',form.current,'Mb90JTpnNdqw680Ea')
            .then((result) => {
                setFormData({
                    _name: '',
                    user_email: '',
                    message: '',
                });
                window.alert("Message sent")

            }, (error) => {
                console.log(error.text);
            });
    }
    return(
        <main className="container content-section">
            <h2 className="page-head">Contact us</h2>
            <section className="text-image-block">
            <form ref={form} className="form" onSubmit={sendEmail}>
                <section>
                    <label htmlFor="_name">Your name:</label>
                    <input
                        type="text"
                        id="_name"
                        required
                        value={formData._name}
                        name="_name"
                        onChange={handleChange}
                    />
                </section>
                <section>
                    <label htmlFor="user_email" >Your email:</label>
                    <input
                        type="email"
                        id="user_email"
                        value={formData.user_email}
                        required
                        name="user_email"
                        onChange={handleChange}
                    />
                </section>
                <section>
                    <label htmlFor="message">Your message</label>
                    <textarea
                        name="message"
                        rows="4"
                        required
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </section>
                <section className="form-btns">
                <button type="submit" className="btn btn-primary">Send</button>
                </section>
            </form>
            <section className="location">

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188820
                    .5492695243!2d-70.97028399999999!3d42.31434995!2m3!1f0!2f0!3f0!3m2
                    !1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3652d0d3d311b%3A0x787cbf240162
                    e8a0!2z0JHQvtGB0YLQvtC9LCDQnNCw0YHRgdCw0YfRg9GB0LXRgtGBLCDQodC_0L7
                    Qu9GD0YfQtdC90ZYg0KjRgtCw0YLQuCDQkNC80LXRgNC40LrQuA!5e0!3m2!1suk!2
                    spl!4v1695914073374!5m2!1suk!2spl"
                   >
                </iframe>
                <section>
                    <span>Our location: BOSTON, MA 177 Huntington Ave Ste 1703</span>
                </section>
            </section>
        </section>
        </main>
    );
}
export default ContactPage