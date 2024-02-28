import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../store/Auth'
import { toast } from 'react-toastify'
const URL = `http://localhost:3000/api/v1/getUserByID`

const AdminUpdate = () => {

  const [userData, setUserData] = useState({username: '', email: '', phone: ''})
  const navigate = useNavigate()
  const params = useParams()
  const { authorizationToken } = useAuth()
  //  console.log(params)

  // Single User Data Calling
  const getSingleUserData = async () => {
    try {
      const response = await fetch(URL + `/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken
        }
      })

      const data = await response.json()
      setUserData(data)
    } catch (error) {
      console.log(error)
    }
  }

  // Input Handler
  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUserData((prev) => ({
      ...prev,
      [name]:value

    }))
  }

  // Submit Form Value
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/api/v1/userUpdateByID/${params.id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken
        },
        body: JSON.stringify(userData)
      })

      if (response.ok) {
        toast.success('User Data Updated Successfull', {theme: 'colored'})
        navigate('/admin/users')
      } else {
        toast.error('User Data Not Updated', {theme: 'colored'})
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getSingleUserData()
  }, [])
  

  return (
    <>
        <section className="section-contact">
          <div className="container contact-content">
            <h1 className='main-heading'>Update User Data</h1>
          </div>
          <div className="container grid grid-two-cols">
            <section className="section-form">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Username</label>
                  <input onChange={handleInput} value={userData.username} type="text" name='username' autoComplete='off' required />
                </div>
                <div>
                  <label>Email</label>
                  <input onChange={handleInput} value={userData.email} type="email" name='email' autoComplete='off' required />
                </div>
                <div>
                  <label>Phone</label>
                  <input onChange={handleInput} value={userData.phone} type="number" name='phone' autoComplete='off' required />
                </div>
                <div>
                  <button type="submit">Update</button>
                </div>
              </form>
            </section>
          </div>
        </section>
    </>
  )
}

export default AdminUpdate