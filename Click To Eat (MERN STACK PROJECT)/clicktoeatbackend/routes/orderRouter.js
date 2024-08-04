import express from 'express'
import order from '../model/orders.js';

const route= express.Router()

route.post('/getmyorderdata',async(req,res)=>{
    try {
       const email= req.body.email;
       
       const orderData =await order.findOne({email});

       if(orderData){
        const simplifiedData= orderData.order_data.map((orderArray)=>{
            const orderDate = orderArray[0].order_date;
            const orderItem= orderArray.slice(1);
            return{orderDate, orderItem};
        })
        res.json({success:true, previousOrderData:simplifiedData })
       }else{
        res.json({success:false, message:'No previous orders found'})
       }

       
    }catch(err){
        res.status(500).json({message:err,success:false})
    }

})

route.post('/orderdata',async(req,res)=>{
    //console.log('Received order data:', req.body);
    let data=req.body.order_data;
    await data.splice(0,0,{order_date:req.body.order_date})

    let eid= await order.findOne({'email':req.body.email})
    if(eid===null){
        try{
            await order.create({email:req.body.email, order_data:[data]})
            .then(()=>{
                res.json({success:true})
            })
        }catch(err){
            res.status(500).json({msg:err,success:false})
        }
    }else{
        try{
            await order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}})
            .then(()=>{
                res.json({success:true})

            })
        }catch(err){
            res.status(500).json({msg:err,success:false})
        }
    }
})

export default route