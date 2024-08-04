import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDisaptchCart } from './ContextReducer';

const Card = (props) => {
   
    let options = props.options;
    let quantityOption = Object.keys(options);
    //let priceOption =Object.values(options)
    let foodItemAllData = props.item

    const [qty, setQty]= useState(1)
    const [size, setSize]= useState('')
    
    let dispatch= useDisaptchCart()
    let data= useCart()
    let finalPrice= qty* parseInt(options[size])
    const priceRef= useRef()
    const handleAddToCart= async()=>{
        
        let food=[]
        for(let item of data){
            if(item.id===foodItemAllData._id){
                food=item;
                break;
            }
        }

        if(food.length!==0){
            if(food.size===size){
               await dispatch({type:'UPDATE', id:foodItemAllData._id, qty: qty, price:finalPrice} )
               return
            }else if(food.size!==size){
                await dispatch({ type:"ADD" , id:foodItemAllData._id, name:foodItemAllData.name, img:foodItemAllData.img, price:finalPrice, qty:qty,size:size })
                return
            }
            return
        }

        await dispatch({ type:"ADD" , id:foodItemAllData._id, name:foodItemAllData.name, img:foodItemAllData.img, price:finalPrice, qty:qty,size:size })
        //console.log(data)
    }

    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

  return (
    <div>

        <div className="card mt-5 m-5 shadow bg-body-tertiary rounded" style={{width: "19rem", maxHeight:"450px"}}>
            <img src={props.img} className="card-img-top" style={{maxHeight:'180px', objectFit:'fill'}} alt="..."/>
            <div className="card-body">
                <h4 className="card-title">{props.name}</h4>
                <h6 className="card-text">{(props.description).length>60 ?(props.description).slice(0,60) +'...' : props.description}</h6>


                <div className='container w-100'>
                    <select className='bg-success mt-2 mb-2 h-100 text-white rounded fs-5' onChange={(e)=>{setQty(e.target.value)}} >
                    {Array.from(Array(6), (e, i)=>{
                        return(
                            <option key={i+1} value={i+1}>{i+1}</option>
                        )
                    })  
                    }
                    </select>

                    <select className='bg-success m-2 h-100 text-white rounded fs-5' ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
                        {
                            quantityOption.map((data)=>{
                                return(
                                    <option key={data} value={data}>{data}</option>
                                )
                            })
                        }
                        
                    </select>

                    <div className='h-100 d-inline fs-5 fw-bold'>
                       ₹{finalPrice}/-
                    </div>
                </div>

                <hr></hr>
                
                <button className='btn btn-success m-1' onClick={handleAddToCart}>Add to Cart</button>
              

            </div>

          


        </div>

    </div>
  )
}

export default Card