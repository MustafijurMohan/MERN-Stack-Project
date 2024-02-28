import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/Auth'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'


const AdminServiceUpdate = () => {

  const [serviceData, setServiceData] = useState({service: '', provider: '', price: '', description: ''})
  const { authorizationToken } = useAuth()
  const params = useParams()
  const navigate = useNavigate()



// Get Single Service
const getSingleServiceData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/getServiceByID/${params.id}`, {
      method: 'GET',
      headers: {
        Authorization: authorizationToken
      }
    })
    const data = await response.json()
    setServiceData(data)
  } catch (error) {
    console.log(error)
  }
}
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
  
  const response = await fetch(`http://localhost:3000/api/v1/serviceUpdateByID/${params.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorizationToken
    },
    body: JSON.stringify(serviceData)
  })

  if(response.ok) {
    toast.success('Service Update Successfull', {theme: 'colored'})
    navigate('/admin/servicesList')
  } else {
    toast.success('Service Not Update', {theme: 'colored'})
  }
}


useEffect(() => {
  getSingleServiceData()
}, [])


  return (
    <>
      <section className="section-contact">
        <div className="container contact-content">
          <h1 className='main-heading'>Service Update Data</h1>
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
                <button type="submit">Update</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  )
}

export default AdminServiceUpdate