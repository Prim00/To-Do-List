import React from 'react'
import './NavBarStyle.css'

import {Link} from 'react-router-dom'

export default function NavBar() {
  return (
    <>
        <ul className='nav'>
            <li> <Link to="/">Home</Link></li>
            <li><Link to="/Login" >Login</Link></li>
            <li><Link to="/SignUp" >Sign Up</Link></li>
            <li><Link to="/contact" >Contact Me</Link></li>
        </ul>
    </>
  )
}
