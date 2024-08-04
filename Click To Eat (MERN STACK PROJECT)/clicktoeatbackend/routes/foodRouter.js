import express from 'express'

const router= express.Router()

router.get('/fooddata', (req,res)=>{
    try{
        //when database connected to backend that time we fetch data from database of fooditem and foodcategory and stored that data into global variable. so we can access that data from anywhere.
    res.send( [global.food_items, global.foodCategory])
    
    }catch(err){

    res.send('Something Went Wrong')
    }
})

export default router