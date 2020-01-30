const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const enquirySchema = new Schema({

    borrowerID:
    {
        type: Schema.Types.ObjectId,
        ref: 'Borrower',
        required: true,
    },
    bookID: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: 'open'
    },

    enqiry_title:{
        type: String,
        required: true,
    },

    enqiry_body:{
        type: String,
        required: true,
    },


    submitted_date: {
        type: Date,
        default: Date.now,
        required: true

    },

    response_date: { //leave it as (updated on " " in the displaying component)
        type: Date,
        default: Date.now,
        required: true
    }

    //need to add request id as something the user can reference (concat with a time stamp)

})

const Enquiry = mongoose.model('Enquiry', enquirySchema)

module.exports = Enquiry