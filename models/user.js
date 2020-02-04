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

    register_date: {
        type: Date,
        default: Date.now,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User