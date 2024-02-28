import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../../store/Auth'

const AdminContacts = () => {

  const [contact, setContact] = useState([])
  const {authorizationToken} = useAuth()

 // Get All Users
 const getAllContactData = async () => {
  try {
      const response = await fetch(`http://localhost:3000/api/v1/getAllContact`, {
          method: "GET",
          headers: {
              Authorization: authorizationToken
          }
      })
      const data = await response.json()
      setContact(data)
  } catch (error) {
      console.log(error)
  }
}


// Contact Delete Methods
const deleteContact = async (id) => {
  try {
      const response = await fetch(`http://localhost:3000/api/v1/contactDeleteByID/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: authorizationToken
          }
      })
      const data = await response.json()
      toast.success(data.message, {theme: 'colored'})
      if(response.ok) {
        getAllContactData()
      }
  } catch (error) {
      console.log(error)
  }
}


useEffect(() => {
  getAllContactData()
}, [])


  return (
    <>
      <section className="admin-users-section">
            <div className="container">
                <h1>Admin Contact Data</h1>
            </div>
            <div className="container admin-users">
                
            <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contact.map((item, i) => {
                          const {username, email, message, _id} = item
                            
                            return (
                                <tr key={i}>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>{message}</td>
                                    <td>Edit</td>
                                    <td><button onClick={() => deleteContact(_id)} className='btn' >Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    </>
  )
}

export default AdminContacts