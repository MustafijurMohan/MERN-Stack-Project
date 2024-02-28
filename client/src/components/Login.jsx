import React, { useState } from 'react'
import login from '../assets/images/login.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/Auth'
const URL = `http://localhost:3000/api/v1/login`
import { toast } from 'react-toastify'

const Login = () => {

    const [user, setUser] = useState({ email: '', password: ''})
    const navigate = useNavigate()
    const { storeTokenLS } = useAuth()

    // Onchange input
        const handleInput = (e) => {
            const name = e.target.name
            const value = e.target.value
    
            setUser({
                ...user,
                [name] : value
            })
        }
    
        // Submit form value
        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user)
                })

                const res_data = await response.json()
                if(response.ok) {
                    storeTokenLS(res_data.token)
                    toast.success('Login Successfull.', {theme: "colored"})
                    setUser({ email: '',  password: ''})
                    navigate('/')
                } else {
                    toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message, {theme: "colored"})
                }
                 // console.log(user)
            } catch (error) {
                console.log(error)
            }
        }

  return (
    <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="ragistration-image">
                            <img src={login} width='500' height='500' alt="" />
                        </div>
                        {/* let tackle registration form */}

                        <div className="ragistration-form">
                            <h1 className='main-heading mb-3'>Login Form</h1>
                            <br />

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>email</label>
                                    <input type="email" name='email' autoComplete='off' value={user.email} onChange={handleInput} required />
                                </div>
                                
                                <div>
                                    <label>password</label>
                                    <input type="password" name='password' autoComplete='off' value={user.password} onChange={handleInput} required />
                                </div>
                                <br />
                                <button type='submit' className='btn btn-submit' >Login</button>
                            </form>
                        </div>


                    </div>
                </div>
            </main>
        </section>
    </>
  )
}

export default Login