const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        unique: true
    },
    register_date: {
        type:Date,
        default: Date.now
    }

})

const Item=mongoose.model('User',userSchema)

module.exports=Item