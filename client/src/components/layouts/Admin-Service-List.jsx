import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../../store/Auth'
import { Link } from 'react-router-dom'
const URL = `http://localhost:3000/api/v1/getServiceList`

const AdminServiceList = () => {

    const [serviceData, setServiceData] = useState([])
    const { authorizationToken } = useAuth()

    // Get All Service Data
    const getAllServiceData = async () => {
        try {
            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken
                }
            })
            const data = await response.json()
            // console.log(data)
            setServiceData(data)
        } catch (error) {
            
        }
    }

    // Delete Single Data
    const deleteService = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/serviceDeleteByID/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authorizationToken
                }
            })
            const data = response.json()
            toast.success('Delete Successfull', {theme: 'colored'})
            if (response.ok) {
                getAllServiceData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllServiceData()
    }, [])
    

  return (
    <>
        <section className="admin-users-section">
            <div className="container">
                <h1>Admin Service Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Provider</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceData.map((item, i) => {
                            
                            return (
                                <tr key={i}>
                                    <td>{item.service}</td>
                                    <td>{item.provider}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td><Link to={`/admin/servicesList/${item._id}/serviceUpdate`} >Edit</Link></td>
                                    <td><button onClick={() => deleteService(item._id)} >Delete</button></td>
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

export default AdminServiceList