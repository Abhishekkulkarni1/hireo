import React, { useContext, useState } from 'react'
import {Context} from "../../main"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {GiHamburgerMenu} from "react-icons/gi"
 

const Navbar = () => {

  const [show, setShow] = useState(false)
  const {isAuthorized, setIsAuthorized, user} = useContext(Context)
  const navigate = useNavigate()
  
  const handleLogout = async() => {
    try{
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", {withCredentials: true})
      toast.success(response.data.message)
      setIsAuthorized(false)
      navigate("/login")
    }catch(error){
      toast.error(error.response.data.message)
      setIsAuthorized(true)
    }
  }

  return (
    <>
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className='container'>
          <div className='logo'>
            <img src="/hireoo.png" alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}> Home </Link>
            </li>
            <li>
              <Link to={"/job/getalljobs"} onClick={() => setShow(false)}> All Jobs </Link>
            </li>
            <li>
              <Link to={"/applications/me"} onClick={() => setShow(false)}> Applications </Link>
            </li>
            {
              user && user.role === "Job Employer" ? (
              <>
                <li>
                  <Link to={"/job/post"} onClick = {() => setShow(false)}>Post Job</Link>
                </li>
                <li>
                  <Link to={"/job/me"} onClick = {() => setShow(false)}>View Jobs</Link>
                </li>
              </>) : (
              <>

              </>)
            }
            <button onClick={handleLogout}>Logout</button>
          </ul>
          <div className='hamburger'>
            <GiHamburgerMenu onClick={()=> setShow(!show)}/>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar