const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const enquirySchema = new Schema({

    bookID: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: false,
    },
    enquiryID:{
        type:String
    },
    status: {
        type: String,
        required: true,
        default: 'open'
    },

    enquiry_title: {
        type: String,
        required: true,
    },

    enquiry_body: {
        type: String,
        required: true,
    },

    additional_info:{
        type:String,
        required: false
    },


    submitted_date: {
        type: Date,
        default: Date.now,
        required: true

    },

    response_date: { //leave it as (updated on " " in the displaying component)
        type: Date,
        default: Date.now,
        required: false
    },
    response:{
        type:String
    },
    
    userID: {type:String, required: true}

    //need to add request id as something the user can reference (concat with a time stamp)

})

const Enquiry = mongoose.model('Enquiry', enquirySchema)


module.exports = Enquiry