const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const addressSchema = new Schema({

    full_name: {
        type: String,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },

    country: {
        type: String,
        default: 'Saudi Arabia',
        required: true,
    },

    city: {
        type: String,
        default:'Jeddah',
        required: true,
    },

    district: {
        type: String,
        required: true,
    },

    street: {
        type: String,
        required: true,
    },

    additional_info:{
        type:String,
        required:false
    }
    
})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address