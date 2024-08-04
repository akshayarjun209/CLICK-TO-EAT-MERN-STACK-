import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


const Login = () => {
    const[data, setData]= useState({
       
        email: "",
        password: ""
    })
    let navigate= useNavigate()
    const onChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/api/loginuser', data);
            console.log(response.data);
            if(response.data.success)
                {
                    alert('User login Successfully')
                    localStorage.setItem('userEmail',response.data.email)
                    localStorage.setItem('authToken', response.data.authToken )
                    //console.log(localStorage.getItem('authToken' ))
                    navigate('/')
                }else{
                    alert('User Invalid')
                    navigate('/login')
                }
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
  return (
    <div className='container'>
        
        <form onSubmit={handleSubmit}>


           <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={data.email} onChange={onChange} aria-describedby="emailHelp"/>
           </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={data.password} onChange={onChange}/>
            </div>

            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to='/register' className="m-3 btn btn-danger">Registeration</Link>
            
        </form>
    </div>
  )
}

export default Login