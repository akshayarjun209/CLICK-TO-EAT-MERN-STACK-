import React from 'react'
import { useCart, useDisaptchCart } from '../Components/ContextReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Cart = () => {
  let data= useCart()
  let dispatch= useDisaptchCart()

  if(data.length===0)
  {
    return (
        <div >
          <div className='m-5 w-100 text-white text-center fs-3'>The Cart is Empty !</div>
        </div>
    )
  }

  let totalPrice = data.reduce((total, food)=> total + food.price, 0)

  const handleCheckout= async()=>{
      const userEmail= localStorage.getItem('userEmail')
      
      const orderHistoryData={
        email:userEmail,
        order_data:data,
        order_date:new Date().toDateString()
      }
      try{
      const response= await axios.post('http://localhost:8001/api/orderdata', orderHistoryData);
      console.log(response.data)
        if(response.status===200){
            dispatch({type:'DROP'})
        }
      }catch(error){
        console.log('Error', error.message)
      }
  }

  return (
    <div className='p-4'>
     <table className="table ">
        <thead className='text-success fs-4'>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody className='text-white fs-5'>
            {data.map(( foodData, index)=>(
             
            <tr >
                <th scope="row">{index+1}</th>
                <td>{foodData.name}</td>
                <td>{foodData.qty}</td>
                <td>{foodData.size}</td>
                <td>{foodData.price}</td>
                <td><button type='button' className='btn p-0 text-danger' ><FontAwesomeIcon icon={faTrashCan} onClick={()=>{dispatch({type:"REMOVE", index:index})}}/> </button></td>
            </tr>


            ))}
           
            
        </tbody>

      </table>
      <div>
        <h1 className='text-white fs-2'> Total Price: {totalPrice}/-</h1>
      </div>
      <div>
        <button className='btn bg-success mt-5' onClick={handleCheckout}>Check Out</button>
      </div>
    </div>
  )
}

export default Cart