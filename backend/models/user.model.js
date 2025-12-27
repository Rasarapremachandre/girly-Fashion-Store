import mongoose from 'mongoose';

const userShema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
      
    },
    role: {
    type: String,
    enum: ['admin','user'],
    default: 'user',
    },


},{timestamps:true});

const User=mongoose.model('User',userShema);

export default User;
