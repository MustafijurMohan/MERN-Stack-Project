import React, { useState } from 'react'
import contacts from '../assets/images/support.png'
import { useAuth } from '../store/Auth'
const URL = `http://localhost:3000/api/v1/contact`
import { toast } from 'react-toastify'



const defaultContactFormData = {username: '', email: '', message: ''}



const Contact = () => {

const [contact, setContact] = useState(defaultContactFormData)
const [userData, setUserData] = useState(true)

const { user } = useAuth()
if (userData && user) {
    setContact({
        username: user.username,
        email: user.email,
        message: ''
    })
    setUserData(false)
}


// Input Handler
const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setContact((prev) => ({
        ...prev,
        [name]: value
    }))
}

// Submit the form
const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact)
        })
        if(response.ok) {
            setContact(defaultContactFormData)
            const data = await response.json()
            // console.log(data)
            toast.success('Message Send Successfully.', {theme: 'colored'})
        }
        
    } catch (error) {
        console.error(error)
        toast.error('Message Not Send.', {theme: 'colored'})
    }
    
    
}


return (
    <>
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className='main-heading'>Contact Us</h1>
            </div>
            <div className="container grid grid-two-cols">
                <div className="contact-img">
                    <img src={contacts} alt="contact" />
                </div>

                {/* contact form */}
                <section className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>username</label>
                            <input onChange={handleInput} value={contact.username} type="text" name='username'  autoComplete='off' required />
                        </div>
                        <div>
                            <label>email</label>
                            <input onChange={handleInput} value={contact.email} type="email" name='email' autoComplete='off' required />
                        </div>
                        <div>
                            <label>message</label>
                            <textarea onChange={handleInput} value={contact.message} name="message"  cols="30" rows="10" autoComplete='off' required></textarea>
                        </div>
                        <div>
                            <button type='submit'>submit</button>
                        </div>
                    </form>
                </section>
            </div>

            <section>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14618.814366919214!2d88.581068482686!3d23.650783909811175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f93bd1f14b1aa1%3A0xd24ee42cce1dbd04!2sMujibnagar!5e0!3m2!1sen!2sbd!4v1708416072087!5m2!1sen!2sbd" width="100%" height="350"  loading="lazy"></iframe>
            </section>
        </section>
    </>
  )
}

export default Contact


// allowfullscreen=""
// referrerpolicy="no-referrer-when-downgrade"