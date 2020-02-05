const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    enquiries: [{
        type: Schema.Types.ObjectId,
        ref: 'Enquiry'
    }],

    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request'
    }],

    borrowedBooksCount: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5
    },

    borrowedBooksList: [{
        type: String,
        required: false,
    }],


    register_date: {
        type: Date,
        default: Date.now,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    
    hasActiveRequests:{type:Boolean, 
        required:false},

    hasAddress:{type:Boolean,
        required:false},

    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address'

    }
    
})


const User = mongoose.model('User', userSchema)


module.exports = User