import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {

    let navigate= useNavigate()
    const[data, setData]=useState({
        name:"",
        email: "",
        password: "",
        location:""

    })

    const onChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/api/createuser', data);
            console.log(response.data); 
            if(response.data.success)
                {
                    alert('User Register Successfully')
                    navigate('/login')
                }else{
                    alert('Registeration Failed')
                    navigate('/register')
                }
        } catch (error) {
            console.error('Error:', error);
            alert('Registeration Failed')
            navigate('/register')
        }
    }
  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>

           <div className="mb-3">
                <label htmlFor="name" className="form-label">User Name</label>
                <input type="text" className="form-control" id="name" name='name' value={data.name} onChange={onChange}/>
           </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={data.email} onChange={onChange} aria-describedby="emailHelp"/>
           </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={data.password} onChange={onChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input type="text" className="form-control" id="location" name='location' value={data.location} onChange={onChange} />
           </div>

            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to='/login' className="m-3 btn btn-danger">Login</Link>
            
        </form>
    </div>
  )
}

export default Register