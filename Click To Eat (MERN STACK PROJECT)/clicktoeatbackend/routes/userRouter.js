import express from "express"
import user from '../model/user.js'
import { validationResult } from "express-validator";
import {userValidationData, loginValidationData} from "../middlewear/validation.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const router= express.Router();
dotenv.config();

//to post user data to database 
router.post('/createuser', userValidationData ,async(req, res)=>{
    
    // validtion of user data
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({error:errors.array()})
    }

    const {name, email, password, location} = req.body;
    try{
        const oldUser=await user.findOne({email})  
        if(oldUser){
          res.status(400).json({msg:"email already registered", success:false},)
        }else{
            
            const salt = await bcrypt.genSalt(10);
            const secPassword= await bcrypt.hash(password,salt)

          await user.create({name ,email, password:secPassword ,location })
          res.status(200).json({msg:"user created successfully", success:true})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({msg:err,success:false})

    }
})

//to get user data from database for login
router.post('/loginuser', loginValidationData ,async(req, res)=>{
    
    // validtion of user data
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({error:errors.array()})
    }

    const { email, password} = req.body;
    try{
        const User = await user.findOne({email})  
        if(!User){
          res.status(400).json({msg:"invalid email and password", success:false},)
        }else{
            
            const compPassword = await bcrypt.compare(password, User.password)
            if(!compPassword) {
                 res.status(400).json({msg:"invalid email and password", success:false},)
        }else{

        const jwtsecret= process.env.JWTSECRET
        const authToken= await jwt.sign({id:User._id}, jwtsecret, { expiresIn: '1h' })
          res.status(200).json({msg:"user login successfully", success:true ,email:email ,token:authToken})
        }
        }
    }catch(err){
        console.log(err)
        res.status(500).json({msg:err,success:false})

    }
})


export default router;