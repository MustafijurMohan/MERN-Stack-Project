import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/Auth'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const AdminUsers = () => {

    const [users, setUsers] = useState([])
    const { authorizationToken } = useAuth()

    // Get All Users
    const getAllUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/getAllUsers`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            })
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

// User Delete Methods
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/userDeleteByID/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                }
            })
            const data = await response.json()
            toast.success(data.message, {theme: 'colored'})
            if(response.ok) {
                getAllUserData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUserData()
    }, [])
    

  return (
    <>
        <section className="admin-users-section">
            <div className="container">
                <h1>Admin Users Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, i) => {
                            
                            return (
                                <tr key={i}>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td><Link to={`/admin/users/${item._id}/UserUpdate`} >Edit</Link></td>
                                    <td><button onClick={() => deleteUser(item._id)} >Delete</button></td>
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

export default AdminUsers