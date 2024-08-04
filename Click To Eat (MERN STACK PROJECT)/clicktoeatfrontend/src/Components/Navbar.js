import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import Cart from '../Screens/Cart'
import { useCart } from './ContextReducer'

const Navbar = () => {


    const navigate= useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('authToken')
        localStorage.removeItem('userEmail')
        navigate('/login')
    }

    const[ cartView, setCartView]=useState(false)
    let data = useCart()
    
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/"  style={{fontFamily:"Lobster" , fontWeight:400, fontSize:"35px"}}>Click To Eat</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav" style={{ fontWeight:600}}>
                
                <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
                </li>

                {
                 localStorage.getItem('authToken')?
                    <li className="nav-item">
                       <Link className="nav-link active fs-5" to="/myorder">My Order</Link>
                    </li>:''   
                    // <li className="nav-item">
                    //     <h4 className="nav-link text-white ">Hello Name</h4>
                    // </li> 
              
                }
            
                </ul>
            
            <div className='d-flex'>
                {
                 localStorage.getItem('authToken')?
                 <div>
                     {/* <li className="nav-item">
                         <h4 className="nav-link text-white ">Hello Name</h4>
                     </li>  */}
                    <div className="btn bg-white text-success fw-bold mx-1" onClick={()=>{setCartView(true)}}>Cart <span className="badge bg-secondary ">{data.length}</span></div>
                   {cartView? <Modal onClose={()=>{setCartView(false)}} ><Cart></Cart></Modal>:""}
                    <div className="btn bg-white text-danger fw-bold mx-1"  onClick={handleLogout}>Logout</div>
                    </div>:
                 <div>
                    <Link className="btn bg-white  fw-bold mx-1" to="/login">Login</Link>
              
                    <Link className="btn bg-white fw-bold mx-1" to="/register">Register</Link>
                </div>
        
                }
                    
            </div>

            </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar