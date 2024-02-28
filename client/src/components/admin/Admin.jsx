import React from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { FaUser, FaRegListAlt, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from '../../store/Auth';

const Admin = () => {

const { user, isLoading } = useAuth()

// console.log('admin===>', user)

if (isLoading) {
  return <h1>Loading.....</h1>
}

if (!user.isAdmin) {
  return <Navigate to='/' />
}


  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li><NavLink to='/admin/users'><FaUser /> Users</NavLink>  </li>
              <li><NavLink to='/admin/contacts'><FaMessage /> Contacts</NavLink>  </li>
              <li><NavLink to='/admin/servicesList'><FaRegListAlt /> ServicesList</NavLink>  </li>
              <li><NavLink to='/admin/serviceCreate'>CreateService</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Admin