import React, { useState } from 'react'
import { useAuth } from '../../store/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const URL = `http://localhost:3000/api/v1/createService`

const AdminServiceCreate = () => {

const [serviceData, setServiceData] = useState({service: '', provider: '', price: '', description: ''})
const { authorizationToken } = useAuth()
const navigate = useNavigate()

// Input Handler
const handleInput = (e) => {
  const name = e.target.name
  const value = e.target.value

  setServiceData((prev) => ({
      ...prev,
      [name]: value
  }))
}



// Submit Handler
const handleSubmit = async (e) => {
  e.preventDefault()
  
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorizationToken
    },
    body: JSON.stringify(serviceData)
  })

  const data = await response.json()
  if(response.ok) {
    setServiceData(data)
    toast.success('Service Create Successfull', {theme: 'colored'})
    navigate('/admin/servicesList')
  } else {
    toast.success('Service Create Not Successfull', {theme: 'colored'})
  }
}

  return (
    <>
      <section className="section-contact">
        <div className="container contact-content">
          <h1 className='main-heading'>Service Create Data</h1>
        </div>
        <div className="container grid grid-two-cols">
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Service</label>
                <input onChange={handleInput} value={serviceData.service} type="text" name='service' autoComplete='off' required />
              </div>
              <div>
                <label>Provider</label>
                <input onChange={handleInput} value={serviceData.provider} type="text" name='provider' autoComplete='off' required />
              </div>
              <div>
                <label>Price</label>
                <input onChange={handleInput} value={serviceData.price} type="text" name='price' autoComplete='off' required />
              </div>
              <div>
                <label>Description</label>
                <textarea onChange={handleInput} value={serviceData.description} name="description" id="" cols="30" rows="10"></textarea>
              </div>
              <div>
                <button type="submit">Save</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  )
}

export default AdminServiceCreate