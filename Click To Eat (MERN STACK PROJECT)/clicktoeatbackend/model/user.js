import mongoose from "mongoose"


const userSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },

    password:{
        type:String,
        require:true
    },

    location:{
        type:String,
        require:true
    },

    date:{
        type:Date,
        default: Date.now
    },

},{timestamps:true})

export default mongoose.model('user', userSchema)