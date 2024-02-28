import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/Auth'

const Navbar = () => {

  const { isLoggedIn } = useAuth()

  return (
    <>
        <div className="container">
            <div className="logo-brand">
                <NavLink to='/' >MERN Admin</NavLink>
            </div>
            <ul>
                <li> <NavLink to='/' >Home</NavLink> </li>
                <li> <NavLink to='/about' >About</NavLink> </li>
                <li> <NavLink to='/services' >Services</NavLink> </li>
                <li> <NavLink to='/contact' >Contact</NavLink> </li>
                { isLoggedIn ? 
                    <li> <NavLink to='/logout' >Logout</NavLink> </li> :
                  <>
                    <li> <NavLink to='/sign-up' >Sign-Up</NavLink> </li>
                    <li> <NavLink to='/login' >Login</NavLink> </li>
                  </>
                }
            </ul>
        </div>
    </>
  )
}

export default Navbar